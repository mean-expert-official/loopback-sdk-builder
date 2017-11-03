/* tslint:disable */

import { map, finalize } from 'rxjs/operators'
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';
import { createIO } from '../io';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter, toArray, filterById } from '../filter';

import * as models from '../../models';
import { User, UserInterface, LoopBackFilter } from '../../models';
import { UserActions } from '../../actions';

export class OrmUser extends OrmBase<User | UserInterface> {
  constructor(protected store: Store<User>, protected realTime?: RealTime) {
    super(store, User, UserActions, realTime);
  }

	public findByIdAccessTokens(id: any, fk: any, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.accessTokens.model + 's')
        .pipe(
          map((state: any) => state.entities[fk]),
          finalize(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        );
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.findByIdAccessTokens(id, fk, meta));
      }

      return this.store.select<any>(this.model.getModelDefinition().relations.accessTokens.model + 's')
        .pipe(map((state: any) => state.entities[fk]));
    }
    
  }
  
	public destroyByIdAccessTokens(id: any, fk: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdAccessTokens(id, fk, meta));
  }
  
	public updateByIdAccessTokens(id: any, fk: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdAccessTokens(id, fk, data, meta));
  }
  
	public getAccessTokens(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, meta?: any): Observable<any[]> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO(filter, this.store, destroyStream$, models[this.model.getModelDefinition().relations.accessTokens.model], this.realTime, meta);

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.accessTokens.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'accessTokens', User)),
            finalize(() => {
              destroyStream$.next(1);
              destroyStream$.complete();
            })
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.accessTokens.model]);
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.getAccessTokens(id, filter, meta));
      }

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.accessTokens.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'accessTokens', User))
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.accessTokens.model]);
    }
    
  }
	
	public createAccessTokens(id: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createAccessTokens(id, data, meta));
  }
  
	public deleteAccessTokens(id: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.deleteAccessTokens(id, meta));
  }
  
	public login(credentials: any, include: any = 'user', rememberMe: boolean = true, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.login(credentials, include, meta));
  }
  
	public logout(meta?: any): void {
    this.store.dispatch(new this.actions.logout(meta));
  }
  
	public verify(id: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.verify(id, meta));
  }
  
	public confirm(uid: any, token: any, redirect: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.confirm(uid, token, redirect, meta));
  }
  
	public resetPassword(options: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.resetPassword(options, meta));
  }
  
	public changePassword(oldPassword: any, newPassword: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.changePassword(oldPassword, newPassword, meta));
  }
  
	public setPassword(newPassword: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.setPassword(newPassword, meta));
  }
  
	public createManyAccessTokens(id: any, data: any[] = [], customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createManyAccessTokens(id, data, meta));
  }
  
  public signup(credentials: any, meta?: any): void {
    this.store.dispatch(new this.actions.signup(credentials, meta));
  }

}
