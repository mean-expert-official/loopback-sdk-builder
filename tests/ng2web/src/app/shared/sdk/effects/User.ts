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

import { UserActionTypes, UserActions } from '../actions/User';
import { LoopbackErrorActions } from '../actions/error';
import { UserApi } from '../services/index';

@Injectable()
export class UserEffects extends BaseLoopbackEffects {
  @Effect()
  protected findByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.user.findByIdAccessTokens(action.payload.id, action.payload.fk)
        .map((response) => new UserActions.findByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.findByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.user.destroyByIdAccessTokens(action.payload.id, action.payload.fk)
        .map((response) => new UserActions.destroyByIdAccessTokensSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new UserActions.destroyByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.user.updateByIdAccessTokens(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new UserActions.updateByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.updateByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.GET_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.user.getAccessTokens(action.payload.id, action.payload.filter)
        .map((response) => new UserActions.getAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.getAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.CREATE_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.user.createAccessTokens(action.payload.id, action.payload.data)
        .map((response) => new UserActions.createAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.createAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.DELETE_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.user.deleteAccessTokens(action.payload.id)
        .map((response) => new UserActions.deleteAccessTokensSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new UserActions.deleteAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected login: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.LOGIN)
    .mergeMap((action: LoopbackAction) =>
      this.user.login(action.payload.credentials, action.payload.include)
        .map((response) => new UserActions.loginSuccess(response, action.meta))
        .catch((error) => concat(
          of(new UserActions.loginFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected logout: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.LOGOUT)
    .mergeMap((action: LoopbackAction) =>
      this.user.logout()
        .map((response) => new UserActions.logoutSuccess(action.meta))
        .catch((error) => concat(
          of(new UserActions.logoutFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected verify: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.VERIFY)
    .mergeMap((action: LoopbackAction) =>
      this.user.verify(action.payload.id)
        .map((response) => new UserActions.verifySuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new UserActions.verifyFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected confirm: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.CONFIRM)
    .mergeMap((action: LoopbackAction) =>
      this.user.confirm(action.payload.uid, action.payload.token, action.payload.redirect)
        .map((response) => new UserActions.confirmSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new UserActions.confirmFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected resetPassword: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.RESET_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.user.resetPassword(action.payload.options)
        .map((response) => new UserActions.resetPasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new UserActions.resetPasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected changePassword: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.CHANGE_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.user.changePassword(action.payload.oldPassword, action.payload.newPassword)
        .map((response) => new UserActions.changePasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new UserActions.changePasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected setPassword: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.SET_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.user.setPassword(action.payload.newPassword)
        .map((response) => new UserActions.setPasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new UserActions.setPasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.user.createManyAccessTokens(action.payload.id, action.payload.data)
        .map((response) => new UserActions.createManyAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.createManyAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * User specific actions
   */
  @Effect()
  protected signup: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.SIGNUP)
    .mergeMap((action: LoopbackAction) =>
      this.user.create(action.payload)
        .map((response) => new UserActions.signupSuccess(action.payload, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.signupFail(error, action.meta)),
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
    @Inject(UserApi) public user: UserApi
  ) {
    super(actions$, user, 'User', UserActionTypes, UserActions);
  }
}
