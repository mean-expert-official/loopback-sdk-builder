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

import { AccountActionTypes, AccountActions } from '../actions/Account';
import { LoopbackErrorActions } from '../actions/error';
import { AccountApi } from '../services/index';

@Injectable()
export class AccountEffects extends BaseLoopbackEffects {
  @Effect()
  protected findByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.findByIdAccessTokens(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.findByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.findByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.destroyByIdAccessTokens(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.destroyByIdAccessTokensSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.destroyByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.updateByIdAccessTokens(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new AccountActions.updateByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.updateByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByIdRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.findByIdRooms(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.findByIdRoomsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.findByIdRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.destroyByIdRooms(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.destroyByIdRoomsSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.destroyByIdRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.updateByIdRooms(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new AccountActions.updateByIdRoomsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.updateByIdRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected linkRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LINK_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.linkRooms(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new AccountActions.linkRoomsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.linkRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected unlinkRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.UNLINK_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.unlinkRooms(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.unlinkRoomsSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.unlinkRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByIdAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.findByIdAdministrations(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.findByIdAdministrationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.findByIdAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.destroyByIdAdministrations(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.destroyByIdAdministrationsSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.destroyByIdAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.updateByIdAdministrations(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new AccountActions.updateByIdAdministrationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.updateByIdAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected linkAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LINK_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.linkAdministrations(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new AccountActions.linkAdministrationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.linkAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected unlinkAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.UNLINK_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.unlinkAdministrations(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.unlinkAdministrationsSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.unlinkAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.GET_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.getAccessTokens(action.payload.id, action.payload.filter)
        .map((response) => new AccountActions.getAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.getAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createAccessTokens(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DELETE_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.deleteAccessTokens(action.payload.id)
        .map((response) => new AccountActions.deleteAccessTokensSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new AccountActions.deleteAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.GET_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.getRooms(action.payload.id, action.payload.filter)
        .map((response) => new AccountActions.getRoomsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.getRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createRooms(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createRoomsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DELETE_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.deleteRooms(action.payload.id)
        .map((response) => new AccountActions.deleteRoomsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new AccountActions.deleteRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.GET_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.getAdministrations(action.payload.id, action.payload.filter)
        .map((response) => new AccountActions.getAdministrationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.getAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createAdministrations(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createAdministrationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DELETE_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.deleteAdministrations(action.payload.id)
        .map((response) => new AccountActions.deleteAdministrationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new AccountActions.deleteAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected login: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LOGIN)
    .mergeMap((action: LoopbackAction) =>
      this.account.login(action.payload.credentials, action.payload.include)
        .map((response) => new AccountActions.loginSuccess(response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.loginFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected logout: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LOGOUT)
    .mergeMap((action: LoopbackAction) =>
      this.account.logout()
        .map((response) => new AccountActions.logoutSuccess(action.meta))
        .catch((error) => concat(
          of(new AccountActions.logoutFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected confirm: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CONFIRM)
    .mergeMap((action: LoopbackAction) =>
      this.account.confirm(action.payload.uid, action.payload.token, action.payload.redirect)
        .map((response) => new AccountActions.confirmSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.confirmFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected resetPassword: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.RESET_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.account.resetPassword(action.payload.options)
        .map((response) => new AccountActions.resetPasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.resetPasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected changePassword: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CHANGE_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.account.changePassword(action.payload.oldPassword, action.payload.newPassword)
        .map((response) => new AccountActions.changePasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.changePasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createManyAccessTokens(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createManyAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createManyAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyRooms: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createManyRooms(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createManyRoomsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createManyRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyAdministrations: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ADMINISTRATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createManyAdministrations(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createManyAdministrationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createManyAdministrationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Account specific actions
   */
  @Effect()
  protected signup: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.SIGNUP)
    .mergeMap((action: LoopbackAction) =>
      this.account.create(action.payload)
        .map((response) => new AccountActions.signupSuccess(action.payload, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.signupFail(error, action.meta)),
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
    @Inject(AccountApi) public account: AccountApi
  ) {
    super(actions$, account, 'Account', AccountActionTypes, AccountActions);
  }
}
