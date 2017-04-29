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

import { UserIdentityActionTypes, UserIdentityActions } from '../actions/UserIdentity';
import { LoopbackErrorActions } from '../actions/error';
import { UserIdentityApi } from '../services/index';

@Injectable()
export class UserIdentityEffects extends BaseLoopbackEffects {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * OAuthClientApplications relation effects
   */
  @Effect()
  protected findByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.FIND_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.findByIdOAuthClientApplications(action.payload.id, action.payload.fk)
        .map((response) => new UserIdentityActions.findByIdOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.findByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.DESTROY_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.destroyByIdOAuthClientApplications(action.payload.id, action.payload.fk)
        .map(() => new UserIdentityActions.destroyByIdOAuthClientApplicationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.destroyByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.UPDATE_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.updateByIdOAuthClientApplications(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new UserIdentityActions.updateByIdOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.updateByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.CREATE_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.createOAuthClientApplications(action.payload.id, action.payload.data)
        .map((response) => new UserIdentityActions.createOAuthClientApplicationsSuccess(action.payload.id,response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.createOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.DELETE_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.deleteOAuthClientApplications(action.payload.id)
        .map(() => new UserIdentityActions.deleteOAuthClientApplicationsSuccess(action.payload.id, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.deleteOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.CREATE_MANY_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.createManyOAuthClientApplications(action.payload.id, action.payload.data)
        .map((response) => new UserIdentityActions.createManyOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.createManyOAuthClientApplicationsFail(error, action.meta)),
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
    .ofType(UserIdentityActionTypes.FIND_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.findByIdOrganizations(action.payload.id, action.payload.fk)
        .map((response) => new UserIdentityActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.findByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.DESTROY_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.destroyByIdOrganizations(action.payload.id, action.payload.fk)
        .map(() => new UserIdentityActions.destroyByIdOrganizationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.destroyByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.UPDATE_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new UserIdentityActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.updateByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.CREATE_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.createOrganizations(action.payload.id, action.payload.data)
        .map((response) => new UserIdentityActions.createOrganizationsSuccess(action.payload.id,response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.createOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.DELETE_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.deleteOrganizations(action.payload.id)
        .map(() => new UserIdentityActions.deleteOrganizationsSuccess(action.payload.id, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.deleteOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.CREATE_MANY_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.createManyOrganizations(action.payload.id, action.payload.data)
        .map((response) => new UserIdentityActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.createManyOrganizationsFail(error, action.meta)),
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
    @Inject(UserIdentityApi) public useridentity: UserIdentityApi
  ) {
    super(actions$, useridentity, 'UserIdentity', UserIdentityActionTypes, UserIdentityActions);
  }
}
