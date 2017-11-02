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
import { RoomActionTypes, RoomActions } from '../actions/Room';
import { LoopbackErrorActions } from '../actions/error';
import { RoomApi } from '../services/index';

@Injectable()
export class RoomEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdMessages$ = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.findByIdMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new RoomActions.findByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.findByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdMessages$ = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.destroyByIdMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'deleteByIdSuccess'),
            of(new RoomActions.destroyByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.destroyByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdMessages$ = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.updateByIdMessages(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new RoomActions.updateByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.updateByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdLikes$ = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.findByIdLikes(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Like', 'findByIdSuccess'),
            of(new RoomActions.findByIdLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.findByIdLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdLikes$ = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.destroyByIdLikes(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Like', 'deleteByIdSuccess'),
            of(new RoomActions.destroyByIdLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.destroyByIdLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdLikes$ = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.updateByIdLikes(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Like', 'findByIdSuccess'),
            of(new RoomActions.updateByIdLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.updateByIdLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdCategories$ = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.findByIdCategories(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Category', 'findByIdSuccess'),
            of(new RoomActions.findByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.findByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdCategories$ = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.destroyByIdCategories(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'deleteByIdSuccess'),
            of(new RoomActions.destroyByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.destroyByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdCategories$ = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.updateByIdCategories(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Category', 'findByIdSuccess'),
            of(new RoomActions.updateByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.updateByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkCategories$ = this.actions$
    .ofType(RoomActionTypes.LINK_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.linkCategories(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomCategoryActions'].createSuccess(response, action.meta)),
          of(new RoomActions.linkCategoriesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new RoomActions.linkCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkCategories$ = this.actions$
    .ofType(RoomActionTypes.UNLINK_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.unlinkCategories(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomCategoryActions'].deleteByIdSuccess(response.id, action.meta)),
          of(new RoomActions.unlinkCategoriesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new RoomActions.unlinkCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdAccounts$ = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.findByIdAccounts(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Account', 'findByIdSuccess'),
            of(new RoomActions.findByIdAccountsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.findByIdAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdAccounts$ = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.destroyByIdAccounts(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'deleteByIdSuccess'),
            of(new RoomActions.destroyByIdAccountsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.destroyByIdAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdAccounts$ = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.updateByIdAccounts(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Account', 'findByIdSuccess'),
            of(new RoomActions.updateByIdAccountsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.updateByIdAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkAccounts$ = this.actions$
    .ofType(RoomActionTypes.LINK_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.linkAccounts(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomAccountActions'].createSuccess(response, action.meta)),
          of(new RoomActions.linkAccountsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new RoomActions.linkAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkAccounts$ = this.actions$
    .ofType(RoomActionTypes.UNLINK_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.unlinkAccounts(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomAccountActions'].deleteByIdSuccess(response.id, action.meta)),
          of(new RoomActions.unlinkAccountsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new RoomActions.unlinkAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdAdmins$ = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ID_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.findByIdAdmins(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Account', 'findByIdSuccess'),
            of(new RoomActions.findByIdAdminsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.findByIdAdminsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdAdmins$ = this.actions$
    .ofType(RoomActionTypes.DESTROY_BY_ID_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.destroyByIdAdmins(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'deleteByIdSuccess'),
            of(new RoomActions.destroyByIdAdminsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.destroyByIdAdminsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdAdmins$ = this.actions$
    .ofType(RoomActionTypes.UPDATE_BY_ID_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.updateByIdAdmins(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Account', 'findByIdSuccess'),
            of(new RoomActions.updateByIdAdminsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.updateByIdAdminsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkAdmins$ = this.actions$
    .ofType(RoomActionTypes.LINK_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.linkAdmins(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomAdminActions'].createSuccess(response, action.meta)),
          of(new RoomActions.linkAdminsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new RoomActions.linkAdminsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkAdmins$ = this.actions$
    .ofType(RoomActionTypes.UNLINK_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.unlinkAdmins(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomAdminActions'].deleteByIdSuccess(response.id, action.meta)),
          of(new RoomActions.unlinkAdminsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new RoomActions.unlinkAdminsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getMessages$ = this.actions$
    .ofType(RoomActionTypes.GET_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.getMessages(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new RoomActions.getMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.getMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createMessages$ = this.actions$
    .ofType(RoomActionTypes.CREATE_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createMessages(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new RoomActions.createMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteMessages$ = this.actions$
    .ofType(RoomActionTypes.DELETE_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.deleteMessages(action.payload.id).pipe(
          map((response: any) => new RoomActions.deleteMessagesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.deleteMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getLikes$ = this.actions$
    .ofType(RoomActionTypes.GET_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.getLikes(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
            of(new RoomActions.getLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.getLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createLikes$ = this.actions$
    .ofType(RoomActionTypes.CREATE_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createLikes(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
            of(new RoomActions.createLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteLikes$ = this.actions$
    .ofType(RoomActionTypes.DELETE_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.deleteLikes(action.payload.id).pipe(
          map((response: any) => new RoomActions.deleteLikesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.deleteLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getCategories$ = this.actions$
    .ofType(RoomActionTypes.GET_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.getCategories(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new RoomActions.getCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.getCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createCategories$ = this.actions$
    .ofType(RoomActionTypes.CREATE_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createCategories(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new RoomActions.createCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteCategories$ = this.actions$
    .ofType(RoomActionTypes.DELETE_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.deleteCategories(action.payload.id).pipe(
          map((response: any) => new RoomActions.deleteCategoriesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.deleteCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getAccounts$ = this.actions$
    .ofType(RoomActionTypes.GET_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.getAccounts(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
            of(new RoomActions.getAccountsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.getAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createAccounts$ = this.actions$
    .ofType(RoomActionTypes.CREATE_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createAccounts(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
            of(new RoomActions.createAccountsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteAccounts$ = this.actions$
    .ofType(RoomActionTypes.DELETE_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.deleteAccounts(action.payload.id).pipe(
          map((response: any) => new RoomActions.deleteAccountsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.deleteAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getAdmins$ = this.actions$
    .ofType(RoomActionTypes.GET_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.getAdmins(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
            of(new RoomActions.getAdminsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.getAdminsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createAdmins$ = this.actions$
    .ofType(RoomActionTypes.CREATE_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createAdmins(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
            of(new RoomActions.createAdminsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createAdminsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteAdmins$ = this.actions$
    .ofType(RoomActionTypes.DELETE_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.deleteAdmins(action.payload.id).pipe(
          map((response: any) => new RoomActions.deleteAdminsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.deleteAdminsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public greetRoute$ = this.actions$
    .ofType(RoomActionTypes.GREET_ROUTE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.greetRoute(action.payload.a, action.payload.b, action.payload.c).pipe(
          map((response: any) => new RoomActions.greetRouteSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.greetRouteFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public greetGet$ = this.actions$
    .ofType(RoomActionTypes.GREET_GET).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.greetGet(action.payload.a, action.payload.b, action.payload.c).pipe(
          map((response: any) => new RoomActions.greetGetSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.greetGetFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public greetPost$ = this.actions$
    .ofType(RoomActionTypes.GREET_POST).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.greetPost(action.payload.a, action.payload.b, action.payload.c).pipe(
          map((response: any) => new RoomActions.greetPostSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.greetPostFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByRoom$ = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ROOM).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.findByRoom(action.payload.room).pipe(
          map((response: any) => new RoomActions.findByRoomSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.findByRoomFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByRoomContext$ = this.actions$
    .ofType(RoomActionTypes.FIND_BY_ROOM_CONTEXT).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.findByRoomContext(action.payload.room).pipe(
          map((response: any) => new RoomActions.findByRoomContextSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.findByRoomContextFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public singleParamPost$ = this.actions$
    .ofType(RoomActionTypes.SINGLE_PARAM_POST).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.singleParamPost(action.payload.param).pipe(
          map((response: any) => new RoomActions.singleParamPostSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.singleParamPostFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getPropertyValues$ = this.actions$
    .ofType(RoomActionTypes.GET_PROPERTY_VALUES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.getPropertyValues(action.payload.property, action.payload.filter).pipe(
          map((response: any) => new RoomActions.getPropertyValuesSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new RoomActions.getPropertyValuesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyMessages$ = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createManyMessages(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new RoomActions.createManyMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createManyMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyLikes$ = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_LIKES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createManyLikes(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Like', 'findSuccess'),
            of(new RoomActions.createManyLikesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createManyLikesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyCategories$ = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createManyCategories(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new RoomActions.createManyCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createManyCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyAccounts$ = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_ACCOUNTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createManyAccounts(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
            of(new RoomActions.createManyAccountsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createManyAccountsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyAdmins$ = this.actions$
    .ofType(RoomActionTypes.CREATE_MANY_ADMINS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.room.createManyAdmins(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Account', 'findSuccess'),
            of(new RoomActions.createManyAdminsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoomActions.createManyAdminsFail(error, action.meta)),
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
    @Inject(RoomApi) public room: RoomApi
  ) {
    super(actions$, room, 'Room', RoomActionTypes, RoomActions);
  }
}
