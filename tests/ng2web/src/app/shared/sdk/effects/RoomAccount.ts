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
import { RoomAccountActionTypes, RoomAccountActions } from '../actions/RoomAccount';
import { LoopbackErrorActions } from '../actions/error';
import { RoomAccountApi } from '../services/index';

@Injectable()
export class RoomAccountEffects extends BaseLoopbackEffects {
  @Effect()
  public getAccount$ = this.actions$
    .ofType(RoomAccountActionTypes.GET_ACCOUNT).pipe(
      mergeMap((action: LoopbackAction) =>
        this.roomaccount.getAccount(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
            of(new RoomAccountActions.getAccountSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomAccountActions.getAccountFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getRoom$ = this.actions$
    .ofType(RoomAccountActionTypes.GET_ROOM).pipe(
      mergeMap((action: LoopbackAction) =>
        this.roomaccount.getRoom(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new RoomAccountActions.getRoomSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomAccountActions.getRoomFail(error, action.meta)),
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
    @Inject(RoomAccountApi) public roomaccount: RoomAccountApi
  ) {
    super(actions$, roomaccount, 'RoomAccount', RoomAccountActionTypes, RoomAccountActions);
  }
}
