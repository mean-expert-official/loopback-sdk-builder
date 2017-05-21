import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { Category, LoopBackFilter } from '../../models';
import { CategoryActions } from '../../actions';

export class OrmCategory extends OrmBase<Category> {
  constructor(protected store: Store<Category>) {
    super(store, Category, CategoryActions);
  }

	public findByIdRooms(id: any, fk: any, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.findByIdRooms(id, fk, meta));

    return this.store.select(this.model.getModelDefinition().relations.rooms.model + 's')
      .map((state: any) => state.entities[fk]);
  }
  
	public destroyByIdRooms(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyByIdRooms(id, fk, meta));
  }
  
	public updateByIdRooms(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateByIdRooms(id, fk, data, meta));
  }
  
	public linkRooms(id: any, fk: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.linkRooms(id, fk, data, meta));
  }
  
	public unlinkRooms(id: any, fk: any, meta?: any): void {
    this.store.dispatch(new this.actions.unlinkRooms(id, fk, meta));
  }
  
	public getRooms(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<any[]> {
    this.store.dispatch(new this.actions.getRooms(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelDefinition().relations.rooms.model + 's')
        .map((state: any) => state.entities)
      , filter, this.store, models[this.model.getModelDefinition().relations.rooms.model]);
  }
	
	public createRooms(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createRooms(id, data, meta));
  }
  
	public deleteRooms(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteRooms(id, meta));
  }
  
	public createManyRooms(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyRooms(id, data, meta));
  }
  }
