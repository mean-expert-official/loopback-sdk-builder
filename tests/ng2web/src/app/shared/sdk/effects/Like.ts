/* tslint:disable */
import { map, catchError, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver } from './resolver';

import * as actions from '../actions';
import { LikeActionTypes, LikeActions } from '../actions/Like';
import { LoopbackErrorActions } from '../actions/error';
import { LikeApi } from '../services/index';

@Injectable()
export class LikeEffects extends BaseLoopbackEffects {
  @Effect()
  public getMessage$ = this.actions$
    .ofType(LikeActionTypes.GET_MESSAGE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.like.getMessage(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new LikeActions.getMessageSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new LikeActions.getMessageFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getRoom$ = this.actions$
    .ofType(LikeActionTypes.GET_ROOM).pipe(
      mergeMap((action: LoopbackAction) =>
        this.like.getRoom(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new LikeActions.getRoomSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new LikeActions.getRoomFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() public create$;
  @Effect() public createMany$;
  @Effect() public findById$;
  @Effect() public find$;
  @Effect() public findOne$;
  @Effect() public updateAll$;
  @Effect() public deleteById$;
  @Effect() public updateAttributes$;
  @Effect() public upsert$;
  @Effect() public upsertWithWhere$;
  @Effect() public replaceOrCreate$;
  @Effect() public replaceById$;
  @Effect() public patchOrCreate$;
  @Effect() public patchAttributes$;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(LikeApi) public like: LikeApi
  ) {
    super(actions$, like, 'Like', LikeActionTypes, LikeActions);
  }
}
