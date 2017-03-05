/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { LoopbackErrorActions } from '../actions/error';

/**
* @module BaseLoopbackEffects
* @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
* @license MIT
* @description
* Abstract class that will be implemented in every custom effects automatically built
* by the sdk builder.
* It provides the core actions for each model to interact with API
**/
export class BaseLoopbackEffects {
  protected create: Observable<Action> = this.actions$
    .ofType(this.actionTypes.CREATE)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.create(payload)
        .map((response) => new this.actionTypes.createSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.createFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected createMany: Observable<Action> = this.actions$
    .ofType(this.actionTypes.CREATE_MANY)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.createMany(payload)
        .map((response) => new this.actionTypes.createManySuccess(response)) // TODO: response?
        .catch((error) => concat(
          of(new this.actionTypes.createManyFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected findById: Observable<Action> = this.actions$
    .ofType(this.actionTypes.FIND_BY_ID)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.findById(payload.id, payload.filter)
        .map((response) => new this.actionTypes.findByIdSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.findByIdFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected find: Observable<Action> = this.actions$
    .ofType(this.actionTypes.FIND)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.find(payload)
        .map((response) => new this.actionTypes.findSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.findFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected findOne: Observable<Action> = this.actions$
    .ofType(this.actionTypes.FIND_ONE)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.findOne(payload)
        .map((response) => new this.actionTypes.findOneSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.findOneFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected updateAll: Observable<Action> = this.actions$
    .ofType(this.actionTypes.UPDATE_ALL)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.updateAll(payload.where, payload.data)
        .map((response) => new this.actionTypes.updateAllSuccess(response)) // TODO: response?
        .catch((error) => concat(
          of(new this.actionTypes.updateAllFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected deleteById: Observable<Action> = this.actions$
    .ofType(this.actionTypes.DELETE_BY_ID)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.deleteById(payload)
        .map(() => new this.actionTypes.deleteByIdSuccess(payload))
        .catch((error) => concat(
          of(new this.actionTypes.deleteByIdFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected updateAttributes: Observable<Action> = this.actions$
    .ofType(this.actionTypes.UPDATE_ATTRIBUTES)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.updateAttributes(payload.id, payload.data)
        .map((response) => new this.actionTypes.updateAttributesSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.updateAttributesFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected upsert: Observable<Action> = this.actions$
    .ofType(this.actionTypes.UPSERT)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.upsert(payload)
        .map((response) => new this.actionTypes.upsertSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.upsertFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected upsertWithWhere: Observable<Action> = this.actions$
    .ofType(this.actionTypes.UPSERT_WITH_WHERE)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.upsertWithWhere(payload.where, payload.data)
        .map((response) => new this.actionTypes.upsertWithWhereSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.upsertWithWhereFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected replaceOrCreate: Observable<Action> = this.actions$
    .ofType(this.actionTypes.REPLACE_OR_CREATE)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.replaceOrCreate(payload)
        .map((response) => new this.actionTypes.replaceOrCreateSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.replaceOrCreateFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected replaceById: Observable<Action> = this.actions$
    .ofType(this.actionTypes.REPLACE_BY_ID)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.replaceById(payload.id, payload.data)
        .map((response) => new this.actionTypes.replaceByIdSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.replaceByIdFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected patchOrCreate: Observable<Action> = this.actions$
    .ofType(this.actionTypes.PATCH_OR_CREATE)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.patchOrCreate(payload)
        .map((response) => new this.actionTypes.patchOrCreateSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.patchOrCreateFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  protected patchAttributes: Observable<Action> = this.actions$
    .ofType(this.actionTypes.PATCH_ATTRIBUTES)
    .map(toPayload)
    .mergeMap((payload) =>
      this.apiService.patchAttributes(payload.id, payload.data)
        .map((response) => new this.actionTypes.patchAttributesSuccess(response))
        .catch((error) => concat(
          of(new this.actionTypes.patchAttributesFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  constructor(
    public actions$: Actions,
    public apiService: any,
    public modelName: string,
    public actionTypes: any
  ) {}
};