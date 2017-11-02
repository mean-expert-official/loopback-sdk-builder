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
import { RoomAdmin, RoomAdminInterface, LoopBackFilter } from '../../models';
import { RoomAdminActions } from '../../actions';

export class OrmRoomAdmin extends OrmBase<RoomAdmin | RoomAdminInterface> {
  constructor(protected store: Store<RoomAdmin>, protected realTime?: RealTime) {
    super(store, RoomAdmin, RoomAdminActions, realTime);
  }

	public getAccount(id: any, refresh: any = {}, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.account.model + 's')
        .pipe(
          map((state: any) => state.entities[id]),
          finalize(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        );
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.getAccount(id, refresh, meta));
      }

      return this.store.select<any>(this.model.getModelDefinition().relations.account.model + 's')
        .pipe(map((state: any) => state.entities[id]));
    }
    
  }
  
	public getRoom(id: any, refresh: any = {}, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.room.model + 's')
        .pipe(
          map((state: any) => state.entities[id]),
          finalize(() => {
            destroyStream$.next(1);
            destroyStream$.complete();
          })
        );
    } else {
      if (!meta || !meta.justCache) {
        this.store.dispatch(new this.actions.getRoom(id, refresh, meta));
      }

      return this.store.select<any>(this.model.getModelDefinition().relations.room.model + 's')
        .pipe(map((state: any) => state.entities[id]));
    }
    
  }
  }
