/* tslint:disable */

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../services';
import { resolver } from '../effects/resolver';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { applyFilter } from './filter';

import { LoopBackFilter } from '../models';

export class OrmBase<T> {
  constructor(protected store: Store<T>, protected model: T | any, protected actions, protected realTime?: RealTime) {}

  public find(filter: LoopBackFilter = {}, meta?: any): Observable<T[]> {
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();
      const reference = this.realTime.FireLoop.ref<T>(this.model);
      reference.on('change', filter)
        .map((data: any) => {
          const resolved = resolver({data, meta}, this.model.getModelName(), 'findSuccess');
          for (const item of resolved) {
            this.store.dispatch(item);
          }
          return;
        })
        .finally(() => reference.dispose())
        .takeUntil(destroyStream$)
        .subscribe();

      return applyFilter(
        this.store.select(this.model.getModelName() + 's')
          .map((state: any) => state.entities)
          .finally(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        , filter, this.store, this.model);
    } else {
      this.store.dispatch(new this.actions.find(filter, meta));

      return applyFilter(
        this.store.select(this.model.getModelName() + 's')
          .map((state: any) => state.entities)
        , filter, this.store, this.model);
    }
  }

  public findById(id: any, filter: LoopBackFilter = {}, meta?: any): Observable<T> {
    if (meta && meta.io) {
      const newFilter: LoopBackFilter = Object.assign({}, filter);
      newFilter.where = Object.assign({}, newFilter.where, {id: id});
      newFilter.limit = 1;

      const destroyStream$: AsyncSubject<any> = new AsyncSubject();
      const reference = this.realTime.FireLoop.ref<T>(this.model)
      reference.on('change', newFilter)
        .mergeMap((data: any) => resolver({data, meta}, this.model.getModelName(), 'findByIdSuccess'))
        .finally(() => reference.dispose())
        .takeUntil(destroyStream$)
        .subscribe();

      return applyFilter(
        this.store.select(this.model.getModelName() + 's')
          .map((state: any) => state.entities[id])
          .finally(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        , filter, this.store, this.model);
    } else {
      this.store.dispatch(new this.actions.findById(id, filter, meta));

      return applyFilter(
        this.store.select(this.model.getModelName() + 's')
          .map((state: any) => state.entities[id])
        , filter, this.store, this.model);
    }
  }

  public findOne(filter: LoopBackFilter = {}, meta?: any): Observable<T> {
    const newFilter: LoopBackFilter = Object.assign({}, filter);
    newFilter.limit = 1;

    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();
      const reference = this.realTime.FireLoop.ref<T>(this.model)
      reference.on('change', newFilter)
        .mergeMap((data: any) => resolver({data, meta}, this.model.getModelName(), 'findOneSuccess'))
        .finally(() => reference.dispose())
        .takeUntil(destroyStream$)
        .subscribe();

      return applyFilter(
        this.store.select(this.model.getModelName() + 's')
          .map((state: any) => state.entities)
          .finally(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        , newFilter, this.store, this.model);
    } else {
      this.store.dispatch(new this.actions.findOne(filter, meta));

      return applyFilter(
        this.store.select(this.model.getModelName() + 's')
          .map((state: any) => state.entities)
        , newFilter, this.store, this.model);
    }
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
