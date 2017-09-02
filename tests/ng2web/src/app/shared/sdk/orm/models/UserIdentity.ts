/* tslint:disable */

import 'rxjs/add/operator/finally';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';
import { createIO } from '../io';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter, toArray, filterById } from '../filter';

import * as models from '../../models';
import { UserIdentity, LoopBackFilter } from '../../models';
import { UserIdentityActions } from '../../actions';

export class OrmUserIdentity extends OrmBase<UserIdentity> {
  constructor(protected store: Store<UserIdentity>, protected realTime?: RealTime) {
    super(store, UserIdentity, UserIdentityActions, realTime);
  }

	public getUser(id: any, refresh: any = {}, customHeaders?: Function, meta?: any): Observable<any> {
    
    if (meta && meta.io) {
      const destroyStream$: AsyncSubject<any> = new AsyncSubject();

      createIO({}, this.store, destroyStream$, models[this.model.getModelDefinition().relations.rooms.model], this.realTime, meta);

      return this.store.select<any>(this.model.getModelDefinition().relations.user.model + 's')
        .map((state: any) => state.entities[id])
        .finally(() => {
          destroyStream$.next(1);
          destroyStream$.complete();
        });
    } else {
      this.store.dispatch(new this.actions.getUser(id, refresh, meta));

      return this.store.select<any>(this.model.getModelDefinition().relations.user.model + 's')
        .map((state: any) => state.entities[id]);
    }
    
  }
  }
