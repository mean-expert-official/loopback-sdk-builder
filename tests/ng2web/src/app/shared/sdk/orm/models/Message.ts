import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { Message, LoopBackFilter } from '../../models';
import { MessageActions } from '../../actions';

export class OrmMessage extends OrmBase<Message> {
  constructor(protected store: Store<Message>) {
    super(store, Message, MessageActions);
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
  
	public findByIdReplies(id: any, fk: any, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.findByIdReplies(id, fk, meta));

    return this.store.select(this.model.getModelDefinition().relations.replies.model + 's')
      .map((state: any) => state.entities[fk]);
  }
  
	public destroyByIdReplies(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdReplies(id, fk, meta));
  }
  
	public updateByIdReplies(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdReplies(id, fk, data, meta));
  }
  
	public getParent(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getParent(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.parent.model + 's')
      .map((state: any) => state.entities[id]);
  }
  
	public getRoom(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getRoom(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.room.model + 's')
      .map((state: any) => state.entities[id]);
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
  
	public getReplies(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<any[]> {
    this.store.dispatch(new this.actions.getReplies(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelDefinition().relations.replies.model + 's')
        .map((state: any) => state.entities)
      , filter, this.store, models[this.model.getModelDefinition().relations.replies.model]);
  }
	
	public createReplies(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createReplies(id, data, meta));
  }
  
	public deleteReplies(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteReplies(id, meta));
  }
  
	public createManyLikes(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyLikes(id, data, meta));
  }
  
	public createManyReplies(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyReplies(id, data, meta));
  }
  }
