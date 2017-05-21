/* tslint:disable */

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { Room, LoopBackFilter } from '../../models';
import { RoomActions } from '../../actions';

export class OrmRoom extends OrmBase<Room> {
  constructor(protected store: Store<Room>, protected realTime?: RealTime) {
    super(store, Room, RoomActions, realTime);
  }

	public findByIdMessages(id: any, fk: any, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.findByIdMessages(id, fk, meta));

    return this.store.select(this.model.getModelDefinition().relations.messages.model + 's')
      .map((state: any) => state.entities[fk]);
  }
  
	public destroyByIdMessages(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdMessages(id, fk, meta));
  }
  
	public updateByIdMessages(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdMessages(id, fk, data, meta));
  }
  
	public findByIdLikes(id: any, fk: any, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.findByIdLikes(id, fk, meta));

    return this.store.select(this.model.getModelDefinition().relations.likes.model + 's')
      .map((state: any) => state.entities[fk]);
  }
  
	public destroyByIdLikes(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdLikes(id, fk, meta));
  }
  
	public updateByIdLikes(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdLikes(id, fk, data, meta));
  }
  
	public findByIdCategories(id: any, fk: any, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.findByIdCategories(id, fk, meta));

    return this.store.select(this.model.getModelDefinition().relations.categories.model + 's')
      .map((state: any) => state.entities[fk]);
  }
  
	public destroyByIdCategories(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdCategories(id, fk, meta));
  }
  
	public updateByIdCategories(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdCategories(id, fk, data, meta));
  }
  
	public linkCategories(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.linkCategories(id, fk, data, meta));
  }
  
	public unlinkCategories(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.unlinkCategories(id, fk, meta));
  }
  
	public findByIdAccounts(id: any, fk: any, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.findByIdAccounts(id, fk, meta));

    return this.store.select(this.model.getModelDefinition().relations.accounts.model + 's')
      .map((state: any) => state.entities[fk]);
  }
  
	public destroyByIdAccounts(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdAccounts(id, fk, meta));
  }
  
	public updateByIdAccounts(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdAccounts(id, fk, data, meta));
  }
  
	public linkAccounts(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.linkAccounts(id, fk, data, meta));
  }
  
	public unlinkAccounts(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.unlinkAccounts(id, fk, meta));
  }
  
	public findByIdAdmins(id: any, fk: any, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.findByIdAdmins(id, fk, meta));

    return this.store.select(this.model.getModelDefinition().relations.admins.model + 's')
      .map((state: any) => state.entities[fk]);
  }
  
	public destroyByIdAdmins(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdAdmins(id, fk, meta));
  }
  
	public updateByIdAdmins(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdAdmins(id, fk, data, meta));
  }
  
	public linkAdmins(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.linkAdmins(id, fk, data, meta));
  }
  
	public unlinkAdmins(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.unlinkAdmins(id, fk, meta));
  }
  
	public getMessages(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<any[]> {
    this.store.dispatch(new this.actions.getMessages(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelDefinition().relations.messages.model + 's')
        .map((state: any) => state.entities)
      , filter, this.store, models[this.model.getModelDefinition().relations.messages.model]);
  }
	
	public createMessages(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createMessages(id, data, meta));
  }
  
	public deleteMessages(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteMessages(id, meta));
  }
  
	public getLikes(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<any[]> {
    this.store.dispatch(new this.actions.getLikes(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelDefinition().relations.likes.model + 's')
        .map((state: any) => state.entities)
      , filter, this.store, models[this.model.getModelDefinition().relations.likes.model]);
  }
	
	public createLikes(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createLikes(id, data, meta));
  }
  
	public deleteLikes(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteLikes(id, meta));
  }
  
	public getCategories(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<any[]> {
    this.store.dispatch(new this.actions.getCategories(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelDefinition().relations.categories.model + 's')
        .map((state: any) => state.entities)
      , filter, this.store, models[this.model.getModelDefinition().relations.categories.model]);
  }
	
	public createCategories(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createCategories(id, data, meta));
  }
  
	public deleteCategories(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteCategories(id, meta));
  }
  
	public getAccounts(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<any[]> {
    this.store.dispatch(new this.actions.getAccounts(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelDefinition().relations.accounts.model + 's')
        .map((state: any) => state.entities)
      , filter, this.store, models[this.model.getModelDefinition().relations.accounts.model]);
  }
	
	public createAccounts(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createAccounts(id, data, meta));
  }
  
	public deleteAccounts(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteAccounts(id, meta));
  }
  
	public getAdmins(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<any[]> {
    this.store.dispatch(new this.actions.getAdmins(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelDefinition().relations.admins.model + 's')
        .map((state: any) => state.entities)
      , filter, this.store, models[this.model.getModelDefinition().relations.admins.model]);
  }
	
	public createAdmins(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createAdmins(id, data, meta));
  }
  
	public deleteAdmins(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteAdmins(id, meta));
  }
  
	public greetRoute(a: any = {}, b: any = {}, c: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.greetRoute(a, b, c, meta));
  }
  
	public greetGet(a: any = {}, b: any = {}, c: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.greetGet(a, b, c, meta));
  }
  
	public greetPost(a: any = {}, b: any = {}, c: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.greetPost(a, b, c, meta));
  }
  
	public findByRoom(room: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.findByRoom(room, meta));
  }
  
	public findByRoomContext(room: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.findByRoomContext(room, meta));
  }
  
	public singleParamPost(param: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.singleParamPost(param, meta));
  }
  
	public getPropertyValues(property: any, filter: LoopBackFilter = {}, meta?: any): void {
    this.store.dispatch(new this.actions.getPropertyValues(property, filter, meta));
  }
  
	public createManyMessages(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyMessages(id, data, meta));
  }
  
	public createManyLikes(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyLikes(id, data, meta));
  }
  
	public createManyCategories(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyCategories(id, data, meta));
  }
  
	public createManyAccounts(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyAccounts(id, data, meta));
  }
  
	public createManyAdmins(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyAdmins(id, data, meta));
  }
  }
