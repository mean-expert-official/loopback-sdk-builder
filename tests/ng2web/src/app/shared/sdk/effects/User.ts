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
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * OAuthClientApplications relation effects
   */
  @Effect()
  protected findByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.findByIdOAuthClientApplications(action.payload.id, action.payload.fk)
        .map((response) => new UserActions.findByIdOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.findByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.destroyByIdOAuthClientApplications(action.payload.id, action.payload.fk)
        .map(() => new UserActions.destroyByIdOAuthClientApplicationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new UserActions.destroyByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.updateByIdOAuthClientApplications(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new UserActions.updateByIdOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.updateByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.CREATE_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.createOAuthClientApplications(action.payload.id, action.payload.data)
        .map((response) => new UserActions.createOAuthClientApplicationsSuccess(action.payload.id,response, action.meta))
        .catch((error) => concat(
          of(new UserActions.createOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.DELETE_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.deleteOAuthClientApplications(action.payload.id)
        .map(() => new UserActions.deleteOAuthClientApplicationsSuccess(action.payload.id, action.meta))
        .catch((error) => concat(
          of(new UserActions.deleteOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.createManyOAuthClientApplications(action.payload.id, action.payload.data)
        .map((response) => new UserActions.createManyOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.createManyOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Organizations relation effects
   */
  @Effect()
  protected findByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.findByIdOrganizations(action.payload.id, action.payload.fk)
        .map((response) => new UserActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.findByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.destroyByIdOrganizations(action.payload.id, action.payload.fk)
        .map(() => new UserActions.destroyByIdOrganizationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new UserActions.destroyByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new UserActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.updateByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.CREATE_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.createOrganizations(action.payload.id, action.payload.data)
        .map((response) => new UserActions.createOrganizationsSuccess(action.payload.id,response, action.meta))
        .catch((error) => concat(
          of(new UserActions.createOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.DELETE_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.deleteOrganizations(action.payload.id)
        .map(() => new UserActions.deleteOrganizationsSuccess(action.payload.id, action.meta))
        .catch((error) => concat(
          of(new UserActions.deleteOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.user.createManyOrganizations(action.payload.id, action.payload.data)
        .map((response) => new UserActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserActions.createManyOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );
  
    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * User specific actions
   */
  @Effect()
  protected login: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.LOGIN)
    .mergeMap((action: LoopbackAction) =>
      this.user.login(action.payload.credentials, action.payload.include, action.payload.rememberMe)
        .map((response) => new UserActions.loginSuccess(response, action.meta))
        .catch((error) => concat(
          of(new UserActions.loginFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

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

  @Effect()
  protected logout: Observable<LoopbackAction> = this.actions$
    .ofType(UserActionTypes.LOGOUT)
    .mergeMap((action: LoopbackAction) =>
      this.user.logout()
        .map(() => new UserActions.logoutSuccess(action.meta))
        .catch((error) => concat(
          of(new UserActions.logoutFail()),
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
