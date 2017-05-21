import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { RoomAccount, LoopBackFilter } from '../../models';
import { RoomAccountActions } from '../../actions';

export class OrmRoomAccount extends OrmBase<RoomAccount> {
  constructor(protected store: Store<RoomAccount>) {
    super(store, RoomAccount, RoomAccountActions);
  }

	public getAccount(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getAccount(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.account.model + 's')
      .map((state: any) => state.entities[id]);
  }
  
	public getRoom(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getRoom(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.room.model + 's')
      .map((state: any) => state.entities[id]);
  }
  }
