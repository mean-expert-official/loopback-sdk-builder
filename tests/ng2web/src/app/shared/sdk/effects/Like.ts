/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';

import { LikeActionTypes, LikeActions } from '../actions/Like';
import { LoopbackErrorActions } from '../actions/error';
import { LikeApi } from '../services/index';

@Injectable()
export class LikeEffects extends BaseLoopbackEffects {
  @Effect()
  protected getMessage: Observable<LoopbackAction> = this.actions$
    .ofType(LikeActionTypes.GET_MESSAGE)
    .mergeMap((action: LoopbackAction) =>
      this.like.getMessage(action.payload.id, action.payload.refresh)
        .map((response) => new LikeActions.getMessageSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new LikeActions.getMessageFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getRoom: Observable<LoopbackAction> = this.actions$
    .ofType(LikeActionTypes.GET_ROOM)
    .mergeMap((action: LoopbackAction) =>
      this.like.getRoom(action.payload.id, action.payload.refresh)
        .map((response) => new LikeActions.getRoomSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new LikeActions.getRoomFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() protected create;
  @Effect() protected createMany;
  @Effect() protected findById;
  @Effect() protected find;
  @Effect() protected findOne;
  @Effect() protected updateAll;
  @Effect() protected deleteById;
  @Effect() protected updateAttributes;
  @Effect() protected upsert;
  @Effect() protected upsertWithWhere;
  @Effect() protected replaceOrCreate;
  @Effect() protected replaceById;
  @Effect() protected patchOrCreate;
  @Effect() protected patchAttributes;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(LikeApi) public like: LikeApi
  ) {
    super(actions$, like, 'Like', LikeActionTypes, LikeActions);
  }
}
