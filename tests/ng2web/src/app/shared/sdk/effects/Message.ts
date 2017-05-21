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
import { resolver } from './resolver';

import { MessageActionTypes, MessageActions } from '../actions/Message';
import { LoopbackErrorActions } from '../actions/error';
import { MessageApi } from '../services/index';

@Injectable()
export class MessageEffects extends BaseLoopbackEffects {
  @Effect()
  protected findByIdLikes: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.FIND_BY_ID_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.message.findByIdLikes(action.payload.id, action.payload.fk)
        .mergeMap((response) => {
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Like', 'findByIdSuccess');
          return new MessageActions.findByIdLikesSuccess(action.payload.id, response, action.meta);
        })
        .catch((error) => concat(
          of(new MessageActions.findByIdLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdLikes: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.DESTROY_BY_ID_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.message.destroyByIdLikes(action.payload.id, action.payload.fk)
        .map((response) => new MessageActions.destroyByIdLikesSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new MessageActions.destroyByIdLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdLikes: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.UPDATE_BY_ID_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.message.updateByIdLikes(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new MessageActions.updateByIdLikesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.updateByIdLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByIdReplies: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.FIND_BY_ID_REPLIES)
    .mergeMap((action: LoopbackAction) =>
      this.message.findByIdReplies(action.payload.id, action.payload.fk)
        .mergeMap((response) => {
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess');
          return new MessageActions.findByIdRepliesSuccess(action.payload.id, response, action.meta);
        })
        .catch((error) => concat(
          of(new MessageActions.findByIdRepliesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdReplies: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.DESTROY_BY_ID_REPLIES)
    .mergeMap((action: LoopbackAction) =>
      this.message.destroyByIdReplies(action.payload.id, action.payload.fk)
        .map((response) => new MessageActions.destroyByIdRepliesSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new MessageActions.destroyByIdRepliesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdReplies: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.UPDATE_BY_ID_REPLIES)
    .mergeMap((action: LoopbackAction) =>
      this.message.updateByIdReplies(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new MessageActions.updateByIdRepliesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.updateByIdRepliesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getParent: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.GET_PARENT)
    .mergeMap((action: LoopbackAction) =>
      this.message.getParent(action.payload.id, action.payload.refresh)
        .map((response) => new MessageActions.getParentSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.getParentFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getRoom: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.GET_ROOM)
    .mergeMap((action: LoopbackAction) =>
      this.message.getRoom(action.payload.id, action.payload.refresh)
        .map((response) => new MessageActions.getRoomSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.getRoomFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getLikes: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.GET_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.message.getLikes(action.payload.id, action.payload.filter)
        .map((response) => new MessageActions.getLikesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.getLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createLikes: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.CREATE_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.message.createLikes(action.payload.id, action.payload.data)
        .map((response) => new MessageActions.createLikesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.createLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteLikes: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.DELETE_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.message.deleteLikes(action.payload.id)
        .map((response) => new MessageActions.deleteLikesSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new MessageActions.deleteLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getReplies: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.GET_REPLIES)
    .mergeMap((action: LoopbackAction) =>
      this.message.getReplies(action.payload.id, action.payload.filter)
        .map((response) => new MessageActions.getRepliesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.getRepliesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createReplies: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.CREATE_REPLIES)
    .mergeMap((action: LoopbackAction) =>
      this.message.createReplies(action.payload.id, action.payload.data)
        .map((response) => new MessageActions.createRepliesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.createRepliesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteReplies: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.DELETE_REPLIES)
    .mergeMap((action: LoopbackAction) =>
      this.message.deleteReplies(action.payload.id)
        .map((response) => new MessageActions.deleteRepliesSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new MessageActions.deleteRepliesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyLikes: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.CREATE_MANY_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.message.createManyLikes(action.payload.id, action.payload.data)
        .map((response) => new MessageActions.createManyLikesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.createManyLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyReplies: Observable<LoopbackAction> = this.actions$
    .ofType(MessageActionTypes.CREATE_MANY_REPLIES)
    .mergeMap((action: LoopbackAction) =>
      this.message.createManyReplies(action.payload.id, action.payload.data)
        .map((response) => new MessageActions.createManyRepliesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new MessageActions.createManyRepliesFail(error, action.meta)),
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
    @Inject(MessageApi) public message: MessageApi
  ) {
    super(actions$, message, 'Message', MessageActionTypes, MessageActions);
  }
}
