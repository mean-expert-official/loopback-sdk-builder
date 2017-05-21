import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { User, LoopBackFilter } from '../../models';
import { UserActions } from '../../actions';

export class OrmUser extends OrmBase<User> {
  constructor(protected store: Store<User>) {
    super(store, User, UserActions);
  }

	public findByIdAccessTokens(id: any, fk: any, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.findByIdAccessTokens(id, fk, meta));

    return this.store.select(this.model.getModelDefinition().relations.accessTokens.model + 's')
      .map((state: any) => state.entities[fk]);
  }
  
	public destroyByIdAccessTokens(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdAccessTokens(id, fk, meta));
  }
  
	public updateByIdAccessTokens(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdAccessTokens(id, fk, data, meta));
  }
  
	public getAccessTokens(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<any[]> {
    this.store.dispatch(new this.actions.getAccessTokens(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelDefinition().relations.accessTokens.model + 's')
        .map((state: any) => state.entities)
      , filter, this.store, models[this.model.getModelDefinition().relations.accessTokens.model]);
  }
	
	public createAccessTokens(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createAccessTokens(id, data, meta));
  }
  
	public deleteAccessTokens(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteAccessTokens(id, meta));
  }
  
	public login(credentials: any, include: any = 'user', rememberMe: boolean = true, meta?: any): void {
    this.store.dispatch(new this.actions.login(credentials, include, meta));
  }
  
	public logout(meta?: any): void {
    this.store.dispatch(new this.actions.logout(meta));
  }
  
	public verify(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.verify(id, meta));
  }
  
	public confirm(uid: any, token: any, redirect: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.confirm(uid, token, redirect, meta));
  }
  
	public resetPassword(options: any, meta?: any): void {
    this.store.dispatch(new this.actions.resetPassword(options, meta));
  }
  
	public changePassword(oldPassword: any, newPassword: any, meta?: any): void {
    this.store.dispatch(new this.actions.changePassword(oldPassword, newPassword, meta));
  }
  
	public setPassword(newPassword: any, meta?: any): void {
    this.store.dispatch(new this.actions.setPassword(newPassword, meta));
  }
  
	public createManyAccessTokens(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyAccessTokens(id, data, meta));
  }
    
  public signup(credentials: any, meta?: any): void {
    this.store.dispatch(new this.actions.signup(credentials, meta));
  }
    
}
