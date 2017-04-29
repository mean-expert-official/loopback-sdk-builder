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

import { RoomAccountActionTypes, RoomAccountActions } from '../actions/RoomAccount';
import { LoopbackErrorActions } from '../actions/error';
import { RoomAccountApi } from '../services/index';

@Injectable()
export class RoomAccountEffects extends BaseLoopbackEffects {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * OAuthClientApplications relation effects
   */
  @Effect()
  protected findByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.FIND_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.findByIdOAuthClientApplications(action.payload.id, action.payload.fk)
        .map((response) => new RoomAccountActions.findByIdOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.findByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.DESTROY_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.destroyByIdOAuthClientApplications(action.payload.id, action.payload.fk)
        .map(() => new RoomAccountActions.destroyByIdOAuthClientApplicationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.destroyByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.UPDATE_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.updateByIdOAuthClientApplications(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new RoomAccountActions.updateByIdOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.updateByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.CREATE_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.createOAuthClientApplications(action.payload.id, action.payload.data)
        .map((response) => new RoomAccountActions.createOAuthClientApplicationsSuccess(action.payload.id,response, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.createOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.DELETE_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.deleteOAuthClientApplications(action.payload.id)
        .map(() => new RoomAccountActions.deleteOAuthClientApplicationsSuccess(action.payload.id, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.deleteOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.CREATE_MANY_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.createManyOAuthClientApplications(action.payload.id, action.payload.data)
        .map((response) => new RoomAccountActions.createManyOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.createManyOAuthClientApplicationsFail(error, action.meta)),
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
    .ofType(RoomAccountActionTypes.FIND_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.findByIdOrganizations(action.payload.id, action.payload.fk)
        .map((response) => new RoomAccountActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.findByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.DESTROY_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.destroyByIdOrganizations(action.payload.id, action.payload.fk)
        .map(() => new RoomAccountActions.destroyByIdOrganizationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.destroyByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.UPDATE_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new RoomAccountActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.updateByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.CREATE_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.createOrganizations(action.payload.id, action.payload.data)
        .map((response) => new RoomAccountActions.createOrganizationsSuccess(action.payload.id,response, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.createOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.DELETE_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.deleteOrganizations(action.payload.id)
        .map(() => new RoomAccountActions.deleteOrganizationsSuccess(action.payload.id, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.deleteOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(RoomAccountActionTypes.CREATE_MANY_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.roomaccount.createManyOrganizations(action.payload.id, action.payload.data)
        .map((response) => new RoomAccountActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoomAccountActions.createManyOrganizationsFail(error, action.meta)),
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
    @Inject(RoomAccountApi) public roomaccount: RoomAccountApi
  ) {
    super(actions$, roomaccount, 'RoomAccount', RoomAccountActionTypes, RoomAccountActions);
  }
}
