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
import { Account, AccountInterface, LoopBackFilter } from '../../models';
import { AccountActions } from '../../actions';

export class OrmAccount extends OrmBase<Account | AccountInterface> {
  constructor(protected store: Store<Account>, protected realTime?: RealTime) {
    super(store, Account, AccountActions, realTime);
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
  
	public findByIdRooms(id: any, fk: any, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.rooms.model + 's')
        .pipe(
          map((state: any) => state.entities[fk]),
          finalize(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        );
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.findByIdRooms(id, fk, meta));
      }

      return this.store.select<any>(this.model.getModelDefinition().relations.rooms.model + 's')
        .pipe(map((state: any) => state.entities[fk]));
    }
    
  }
  
	public destroyByIdRooms(id: any, fk: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdRooms(id, fk, meta));
  }
  
	public updateByIdRooms(id: any, fk: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdRooms(id, fk, data, meta));
  }
  
	public linkRooms(id: any, fk: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.linkRooms(id, fk, data, meta));
  }
  
	public unlinkRooms(id: any, fk: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.unlinkRooms(id, fk, meta));
  }
  
	public findByIdAdministrations(id: any, fk: any, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.administrations.model + 's')
        .pipe(
          map((state: any) => state.entities[fk]),
          finalize(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        );
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.findByIdAdministrations(id, fk, meta));
      }

      return this.store.select<any>(this.model.getModelDefinition().relations.administrations.model + 's')
        .pipe(map((state: any) => state.entities[fk]));
    }
    
  }
  
	public destroyByIdAdministrations(id: any, fk: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdAdministrations(id, fk, meta));
  }
  
	public updateByIdAdministrations(id: any, fk: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdAdministrations(id, fk, data, meta));
  }
  
	public linkAdministrations(id: any, fk: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.linkAdministrations(id, fk, data, meta));
  }
  
	public unlinkAdministrations(id: any, fk: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.unlinkAdministrations(id, fk, meta));
  }
  
	public getAccessTokens(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, meta?: any): Observable<any[]> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO(filter, this.store, destroyStream$, models[this.model.getModelDefinition().relations.accessTokens.model], this.realTime, meta);

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.accessTokens.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'accessTokens', Account)),
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
            map((state: any[]) => filterById(state, id, 'accessTokens', Account))
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
  
	public getRooms(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, meta?: any): Observable<any[]> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO(filter, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.rooms.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'rooms', Account)),
            finalize(() => {
              destroyStream$.next(1);
              destroyStream$.complete();
            })
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.rooms.model]);
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.getRooms(id, filter, meta));
      }

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.rooms.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'rooms', Account))
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.rooms.model]);
    }
    
  }
	
	public createRooms(id: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createRooms(id, data, meta));
  }
  
	public deleteRooms(id: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.deleteRooms(id, meta));
  }
  
	public getAdministrations(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, meta?: any): Observable<any[]> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO(filter, this.store, destroyStream$, models[this.model.getModelDefinition().relations.administrations.model], this.realTime, meta);

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.administrations.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'administrations', Account)),
            finalize(() => {
              destroyStream$.next(1);
              destroyStream$.complete();
            })
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.administrations.model]);
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.getAdministrations(id, filter, meta));
      }

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.administrations.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'administrations', Account))
          )
        , filter, this.store, models[this.model.getModelDefinition().relations.administrations.model]);
    }
    
  }
	
	public createAdministrations(id: any, data: any = {}, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createAdministrations(id, data, meta));
  }
  
	public deleteAdministrations(id: any, customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.deleteAdministrations(id, meta));
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
  
	public createManyRooms(id: any, data: any[] = [], customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createManyRooms(id, data, meta));
  }
  
	public createManyAdministrations(id: any, data: any[] = [], customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createManyAdministrations(id, data, meta));
  }
  
  public signup(credentials: any, meta?: any): void {
    this.store.dispatch(new this.actions.signup(credentials, meta));
  }

}
