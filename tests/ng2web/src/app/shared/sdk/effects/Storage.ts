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

import { StorageActionTypes, StorageActions } from '../actions/Storage';
import { LoopbackErrorActions } from '../actions/error';
import { StorageApi } from '../services/index';

@Injectable()
export class StorageEffects extends BaseLoopbackEffects {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * OAuthClientApplications relation effects
   */
  @Effect()
  protected findByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.FIND_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.findByIdOAuthClientApplications(action.payload.id, action.payload.fk)
        .map((response) => new StorageActions.findByIdOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.findByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.DESTROY_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.destroyByIdOAuthClientApplications(action.payload.id, action.payload.fk)
        .map(() => new StorageActions.destroyByIdOAuthClientApplicationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new StorageActions.destroyByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.UPDATE_BY_ID_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.updateByIdOAuthClientApplications(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new StorageActions.updateByIdOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.updateByIdOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.CREATE_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.createOAuthClientApplications(action.payload.id, action.payload.data)
        .map((response) => new StorageActions.createOAuthClientApplicationsSuccess(action.payload.id,response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.createOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.DELETE_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.deleteOAuthClientApplications(action.payload.id)
        .map(() => new StorageActions.deleteOAuthClientApplicationsSuccess(action.payload.id, action.meta))
        .catch((error) => concat(
          of(new StorageActions.deleteOAuthClientApplicationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyOAuthClientApplications: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.CREATE_MANY_OAUTHCLIENTAPPLICATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.createManyOAuthClientApplications(action.payload.id, action.payload.data)
        .map((response) => new StorageActions.createManyOAuthClientApplicationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.createManyOAuthClientApplicationsFail(error, action.meta)),
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
    .ofType(StorageActionTypes.FIND_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.findByIdOrganizations(action.payload.id, action.payload.fk)
        .map((response) => new StorageActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.findByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.DESTROY_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.destroyByIdOrganizations(action.payload.id, action.payload.fk)
        .map(() => new StorageActions.destroyByIdOrganizationsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new StorageActions.destroyByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.UPDATE_BY_ID_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new StorageActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.updateByIdOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.CREATE_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.createOrganizations(action.payload.id, action.payload.data)
        .map((response) => new StorageActions.createOrganizationsSuccess(action.payload.id,response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.createOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.DELETE_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.deleteOrganizations(action.payload.id)
        .map(() => new StorageActions.deleteOrganizationsSuccess(action.payload.id, action.meta))
        .catch((error) => concat(
          of(new StorageActions.deleteOrganizationsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyOrganizations: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.CREATE_MANY_ORGANIZATIONS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.createManyOrganizations(action.payload.id, action.payload.data)
        .map((response) => new StorageActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.createManyOrganizationsFail(error, action.meta)),
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
    @Inject(StorageApi) public storage: StorageApi
  ) {
    super(actions$, storage, 'Storage', StorageActionTypes, StorageActions);
  }
}
