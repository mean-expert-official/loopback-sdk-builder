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
import { UserIdentity, LoopBackFilter } from '../../models';
import { UserIdentityActions } from '../../actions';

export class OrmUserIdentity extends OrmBase<UserIdentity> {
  constructor(protected store: Store<UserIdentity>, protected realTime?: RealTime) {
    super(store, UserIdentity, UserIdentityActions, realTime);
  }

	public getUser(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getUser(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.user.model + 's')
      .map((state: any) => state.entities[id]);
  }
  }
