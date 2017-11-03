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
import { MessageActionTypes, MessageActions } from '../actions/Message';
import { LoopbackErrorActions } from '../actions/error';
import { MessageApi } from '../services/index';

@Injectable()
export class MessageEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdLikes$ = this.actions$
    .ofType(MessageActionTypes.FIND_BY_ID_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.findByIdLikes(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Like', 'findByIdSuccess'),
            of(new MessageActions.findByIdLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.findByIdLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdLikes$ = this.actions$
    .ofType(MessageActionTypes.DESTROY_BY_ID_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.destroyByIdLikes(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Like', 'deleteByIdSuccess'),
            of(new MessageActions.destroyByIdLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.destroyByIdLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdLikes$ = this.actions$
    .ofType(MessageActionTypes.UPDATE_BY_ID_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.updateByIdLikes(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Like', 'findByIdSuccess'),
            of(new MessageActions.updateByIdLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.updateByIdLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdReplies$ = this.actions$
    .ofType(MessageActionTypes.FIND_BY_ID_REPLIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.findByIdReplies(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new MessageActions.findByIdRepliesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.findByIdRepliesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdReplies$ = this.actions$
    .ofType(MessageActionTypes.DESTROY_BY_ID_REPLIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.destroyByIdReplies(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'deleteByIdSuccess'),
            of(new MessageActions.destroyByIdRepliesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.destroyByIdRepliesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdReplies$ = this.actions$
    .ofType(MessageActionTypes.UPDATE_BY_ID_REPLIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.updateByIdReplies(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new MessageActions.updateByIdRepliesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.updateByIdRepliesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getParent$ = this.actions$
    .ofType(MessageActionTypes.GET_PARENT).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getParent(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new MessageActions.getParentSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getParentFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getRoom$ = this.actions$
    .ofType(MessageActionTypes.GET_ROOM).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getRoom(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new MessageActions.getRoomSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getRoomFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getLikes$ = this.actions$
    .ofType(MessageActionTypes.GET_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getLikes(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
            of(new MessageActions.getLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createLikes$ = this.actions$
    .ofType(MessageActionTypes.CREATE_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createLikes(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
            of(new MessageActions.createLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.createLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteLikes$ = this.actions$
    .ofType(MessageActionTypes.DELETE_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.deleteLikes(action.payload.id).pipe(
          map((response: any) => new MessageActions.deleteLikesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.deleteLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getReplies$ = this.actions$
    .ofType(MessageActionTypes.GET_REPLIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getReplies(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new MessageActions.getRepliesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getRepliesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createReplies$ = this.actions$
    .ofType(MessageActionTypes.CREATE_REPLIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createReplies(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new MessageActions.createRepliesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.createRepliesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteReplies$ = this.actions$
    .ofType(MessageActionTypes.DELETE_REPLIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.deleteReplies(action.payload.id).pipe(
          map((response: any) => new MessageActions.deleteRepliesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.deleteRepliesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyLikes$ = this.actions$
    .ofType(MessageActionTypes.CREATE_MANY_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createManyLikes(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
            of(new MessageActions.createManyLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.createManyLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyReplies$ = this.actions$
    .ofType(MessageActionTypes.CREATE_MANY_REPLIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createManyReplies(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new MessageActions.createManyRepliesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.createManyRepliesFail(error, action.meta)),
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
    @Inject(MessageApi) public message: MessageApi
  ) {
    super(actions$, message, 'Message', MessageActionTypes, MessageActions);
  }
}
