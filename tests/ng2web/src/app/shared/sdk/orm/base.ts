/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { applyFilter } from './filter';

import { LoopBackFilter } from '../models';

export class OrmBase<T> {
  constructor(protected store: Store<T>, protected model: T | any, protected actions) {}

  public find(filter: LoopBackFilter = {}, meta?: any): Observable<T[]> {
    this.store.dispatch(new this.actions.find(filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelName() + 's')
        .map((state: any) => state.entities)
      , filter, this.store, this.model);
  }

  public findById(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<T> {
    this.store.dispatch(new this.actions.findById(id, filter, meta));

    return applyFilter(
      this.store.select(this.model.getModelName() + 's')
        .map((state: any) => state.entities[id])
      , filter, this.store, this.model);
  }

  public findOne(filter: LoopBackFilter = {}, meta?: any): Observable<T> {
    this.store.dispatch(new this.actions.findOne(filter, meta));

    const newFilter: LoopBackFilter = Object.assign({}, filter);
    newFilter.limit = 1;

    return applyFilter(
      this.store.select(this.model.getModelName() + 's')
        .map((state: any) => state.entities)
      , newFilter, this.store, this.model);
  }

  public create(data: T, meta?: any): void {
    this.store.dispatch(new this.actions.create(data, meta));
  }

  public createMany(data: T[], meta?: any): void {
    this.store.dispatch(new this.actions.createMany(data, meta));
  }

  public updateAll(data, meta?: any): void {
    this.store.dispatch(new this.actions.updateAll(data, meta));
  }

  public deleteById(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.deleteById(id, meta));
  }

  public updateAttributes(id: any, data: T, meta?: any): void {
    this.store.dispatch(new this.actions.updateAttributes(id, data, meta));
  }

  public upsert(data: T, meta?: any): void {
    this.store.dispatch(new this.actions.upsert(data, meta));
  }

  public upsertPatch(data: T, meta?: any): void {
    this.store.dispatch(new this.actions.upsertPatch(data, meta));
  }

  public upsertWithWhere(where: any = {}, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.upsertWithWhere(where, data, meta));
  }

  public replaceOrCreate(data: T, meta?: any): void {
    this.store.dispatch(new this.actions.replaceOrCreate(data, meta));
  }

  public replaceById(id: any, data: T, meta?: any): void {
    this.store.dispatch(new this.actions.replaceById(id, data, meta));
  }

  public patchOrCreate(data: T, meta?: any): void {
    this.store.dispatch(new this.actions.patchOrCreate(data, meta));
  }

  public patchAttributes(id: any, data: T, meta?: any): void {
    this.store.dispatch(new this.actions.patchAttributes(id, data, meta));
  }

}
