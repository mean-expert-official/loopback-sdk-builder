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

import { RoomActionTypes, RoomActions } from '../actions/Room';
import { LoopbackErrorActions } from '../actions/error';
import { RoomApi } from '../services/index';

@Injectable()
export class RoomEffects extends BaseLoopbackEffects {
  @Effect()
  protected findByIdMessages: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_MESSAGES)
    .mergeMap((action: LoopbackAction) =>
      this.room.findByIdMessages(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
          of(new RoomActions.findByIdMessagesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.findByIdMessagesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdMessages: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_MESSAGES)
    .mergeMap((action: LoopbackAction) =>
      this.room.destroyByIdMessages(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Message', 'deleteByIdSuccess'),
          of(new RoomActions.destroyByIdMessagesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.destroyByIdMessagesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdMessages: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_MESSAGES)
    .mergeMap((action: LoopbackAction) =>
      this.room.updateByIdMessages(action.payload.id, action.payload.fk, action.payload.data)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
          of(new RoomActions.updateByIdMessagesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.updateByIdMessagesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByIdLikes: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.room.findByIdLikes(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Like', 'findByIdSuccess'),
          of(new RoomActions.findByIdLikesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.findByIdLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdLikes: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.room.destroyByIdLikes(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Like', 'deleteByIdSuccess'),
          of(new RoomActions.destroyByIdLikesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.destroyByIdLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdLikes: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.room.updateByIdLikes(action.payload.id, action.payload.fk, action.payload.data)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Like', 'findByIdSuccess'),
          of(new RoomActions.updateByIdLikesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.updateByIdLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByIdCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.findByIdCategories(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Category', 'findByIdSuccess'),
          of(new RoomActions.findByIdCategoriesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.findByIdCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.destroyByIdCategories(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Category', 'deleteByIdSuccess'),
          of(new RoomActions.destroyByIdCategoriesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.destroyByIdCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.updateByIdCategories(action.payload.id, action.payload.fk, action.payload.data)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Category', 'findByIdSuccess'),
          of(new RoomActions.updateByIdCategoriesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.updateByIdCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected linkCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.LINK_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.linkCategories(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new RoomActions.linkCategoriesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.linkCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected unlinkCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.UNLINK_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.unlinkCategories(action.payload.id, action.payload.fk)
        .map((response) => new RoomActions.unlinkCategoriesSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new RoomActions.unlinkCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByIdAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.findByIdAccounts(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Account', 'findByIdSuccess'),
          of(new RoomActions.findByIdAccountsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.findByIdAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.destroyByIdAccounts(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Account', 'deleteByIdSuccess'),
          of(new RoomActions.destroyByIdAccountsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.destroyByIdAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.updateByIdAccounts(action.payload.id, action.payload.fk, action.payload.data)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Account', 'findByIdSuccess'),
          of(new RoomActions.updateByIdAccountsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.updateByIdAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected linkAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.LINK_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.linkAccounts(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new RoomActions.linkAccountsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.linkAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected unlinkAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.UNLINK_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.unlinkAccounts(action.payload.id, action.payload.fk)
        .map((response) => new RoomActions.unlinkAccountsSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new RoomActions.unlinkAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByIdAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.findByIdAdmins(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Account', 'findByIdSuccess'),
          of(new RoomActions.findByIdAdminsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.findByIdAdminsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.destroyByIdAdmins(action.payload.id, action.payload.fk)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Account', 'deleteByIdSuccess'),
          of(new RoomActions.destroyByIdAdminsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.destroyByIdAdminsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.updateByIdAdmins(action.payload.id, action.payload.fk, action.payload.data)
        .mergeMap((response) => concat(
          resolver({id: action.payload.id, data: response, meta: action.meta}, 'Account', 'findByIdSuccess'),
          of(new RoomActions.updateByIdAdminsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.updateByIdAdminsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected linkAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.LINK_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.linkAdmins(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new RoomActions.linkAdminsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.linkAdminsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected unlinkAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.UNLINK_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.unlinkAdmins(action.payload.id, action.payload.fk)
        .map((response) => new RoomActions.unlinkAdminsSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new RoomActions.unlinkAdminsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getMessages: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GET_MESSAGES)
    .mergeMap((action: LoopbackAction) =>
      this.room.getMessages(action.payload.id, action.payload.filter)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
          of(new RoomActions.getMessagesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.getMessagesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createMessages: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_MESSAGES)
    .mergeMap((action: LoopbackAction) =>
      this.room.createMessages(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
          of(new RoomActions.createMessagesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createMessagesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteMessages: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DELETE_MESSAGES)
    .mergeMap((action: LoopbackAction) =>
      this.room.deleteMessages(action.payload.id)
        .map((response) => new RoomActions.deleteMessagesSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new RoomActions.deleteMessagesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getLikes: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GET_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.room.getLikes(action.payload.id, action.payload.filter)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
          of(new RoomActions.getLikesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.getLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createLikes: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.room.createLikes(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
          of(new RoomActions.createLikesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteLikes: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DELETE_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.room.deleteLikes(action.payload.id)
        .map((response) => new RoomActions.deleteLikesSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new RoomActions.deleteLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GET_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.getCategories(action.payload.id, action.payload.filter)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
          of(new RoomActions.getCategoriesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.getCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.createCategories(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
          of(new RoomActions.createCategoriesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DELETE_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.deleteCategories(action.payload.id)
        .map((response) => new RoomActions.deleteCategoriesSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new RoomActions.deleteCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GET_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.getAccounts(action.payload.id, action.payload.filter)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
          of(new RoomActions.getAccountsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.getAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.createAccounts(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
          of(new RoomActions.createAccountsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DELETE_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.deleteAccounts(action.payload.id)
        .map((response) => new RoomActions.deleteAccountsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new RoomActions.deleteAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GET_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.getAdmins(action.payload.id, action.payload.filter)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
          of(new RoomActions.getAdminsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.getAdminsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.createAdmins(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
          of(new RoomActions.createAdminsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createAdminsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.DELETE_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.deleteAdmins(action.payload.id)
        .map((response) => new RoomActions.deleteAdminsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new RoomActions.deleteAdminsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected greetRoute: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GREET_ROUTE)
    .mergeMap((action: LoopbackAction) =>
      this.room.greetRoute(action.payload.a, action.payload.b, action.payload.c)
        .map((response) => new RoomActions.greetRouteSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.greetRouteFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected greetGet: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GREET_GET)
    .mergeMap((action: LoopbackAction) =>
      this.room.greetGet(action.payload.a, action.payload.b, action.payload.c)
        .map((response) => new RoomActions.greetGetSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.greetGetFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected greetPost: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GREET_POST)
    .mergeMap((action: LoopbackAction) =>
      this.room.greetPost(action.payload.a, action.payload.b, action.payload.c)
        .map((response) => new RoomActions.greetPostSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.greetPostFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByRoom: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ROOM)
    .mergeMap((action: LoopbackAction) =>
      this.room.findByRoom(action.payload.room)
        .map((response) => new RoomActions.findByRoomSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.findByRoomFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByRoomContext: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ROOM_CONTEXT)
    .mergeMap((action: LoopbackAction) =>
      this.room.findByRoomContext(action.payload.room)
        .map((response) => new RoomActions.findByRoomContextSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.findByRoomContextFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected singleParamPost: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.SINGLE_PARAM_POST)
    .mergeMap((action: LoopbackAction) =>
      this.room.singleParamPost(action.payload.param)
        .map((response) => new RoomActions.singleParamPostSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.singleParamPostFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getPropertyValues: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.GET_PROPERTY_VALUES)
    .mergeMap((action: LoopbackAction) =>
      this.room.getPropertyValues(action.payload.property, action.payload.filter)
        .map((response) => new RoomActions.getPropertyValuesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomActions.getPropertyValuesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyMessages: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_MESSAGES)
    .mergeMap((action: LoopbackAction) =>
      this.room.createManyMessages(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
          of(new RoomActions.createManyMessagesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createManyMessagesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyLikes: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_LIKES)
    .mergeMap((action: LoopbackAction) =>
      this.room.createManyLikes(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
          of(new RoomActions.createManyLikesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createManyLikesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyCategories: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_CATEGORIES)
    .mergeMap((action: LoopbackAction) =>
      this.room.createManyCategories(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
          of(new RoomActions.createManyCategoriesSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createManyCategoriesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyAccounts: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_ACCOUNTS)
    .mergeMap((action: LoopbackAction) =>
      this.room.createManyAccounts(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
          of(new RoomActions.createManyAccountsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createManyAccountsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyAdmins: Observable<LoopbackAction> = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_ADMINS)
    .mergeMap((action: LoopbackAction) =>
      this.room.createManyAdmins(action.payload.id, action.payload.data)
        .mergeMap((response) => concat(
          resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
          of(new RoomActions.createManyAdminsSuccess(action.payload.id, response, action.meta))
        ))
        .catch((error) => concat(
          of(new RoomActions.createManyAdminsFail(error, action.meta)),
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
    @Inject(RoomApi) public room: RoomApi
  ) {
    super(actions$, room, 'Room', RoomActionTypes, RoomActions);
  }
}
