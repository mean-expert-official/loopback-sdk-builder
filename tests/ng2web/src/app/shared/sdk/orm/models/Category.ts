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
import { Category, CategoryInterface, LoopBackFilter } from '../../models';
import { CategoryActions } from '../../actions';

export class OrmCategory extends OrmBase<Category | CategoryInterface> {
  constructor(protected store: Store<Category>, protected realTime?: RealTime) {
    super(store, Category, CategoryActions, realTime);
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
  
	public getRooms(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, meta?: any): Observable<any[]> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO(filter, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return applyFilter(
        this.store.select<any>(this.model.getModelDefinition().relations.rooms.model + 's')
          .pipe(
            map(toArray),
            map((state: any[]) => filterById(state, id, 'rooms', Category)),
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
            map((state: any[]) => filterById(state, id, 'rooms', Category))
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
  
	public createManyRooms(id: any, data: any[] = [], customHeaders?: Function, meta?: any): void {
    this.store.dispatch(new this.actions.createManyRooms(id, data, meta));
  }
  }
