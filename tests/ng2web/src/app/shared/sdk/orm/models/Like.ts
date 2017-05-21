import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { Like, LoopBackFilter } from '../../models';
import { LikeActions } from '../../actions';

export class OrmLike extends OrmBase<Like> {
  constructor(protected store: Store<Like>) {
    super(store, Like, LikeActions);
  }

	public getMessage(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getMessage(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.message.model + 's')
      .map((state: any) => state.entities[id]);
  }
  
	public getRoom(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getRoom(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.room.model + 's')
      .map((state: any) => state.entities[id]);
  }
  }
