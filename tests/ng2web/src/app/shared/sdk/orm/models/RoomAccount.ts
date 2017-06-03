/* tslint:disable */

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';
import { createIO } from '../io';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { RoomAccount, LoopBackFilter } from '../../models';
import { RoomAccountActions } from '../../actions';

export class OrmRoomAccount extends OrmBase<RoomAccount> {
  constructor(protected store: Store<RoomAccount>, protected realTime?: RealTime) {
    super(store, RoomAccount, RoomAccountActions, realTime);
  }

	public getAccount(id: any, refresh: any = {}, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select(this.model.getModelDefinition().relations.account.model + 's')
        .map((state: any) => state.entities[id])
        .finally(() => {
          destroyStream$.next(1);
          destroyStream$.complete();
        });
    } else {
      this.store.dispatch(new this.actions.getAccount(id, refresh, meta));

      return this.store.select(this.model.getModelDefinition().relations.account.model + 's')
        .map((state: any) => state.entities[id]);
    }
    
  }
  
	public getRoom(id: any, refresh: any = {}, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select(this.model.getModelDefinition().relations.room.model + 's')
        .map((state: any) => state.entities[id])
        .finally(() => {
          destroyStream$.next(1);
          destroyStream$.complete();
        });
    } else {
      this.store.dispatch(new this.actions.getRoom(id, refresh, meta));

      return this.store.select(this.model.getModelDefinition().relations.room.model + 's')
        .map((state: any) => state.entities[id]);
    }
    
  }
  }
