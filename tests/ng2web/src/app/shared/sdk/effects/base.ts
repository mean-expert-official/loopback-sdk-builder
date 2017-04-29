/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
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
  protected create: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.CREATE)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.create(action.payload)
        .map((response) => new this.actionTypes.createSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.createFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected createMany: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.CREATE_MANY)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.createMany(action.payload)
        .map((response) => new this.actionTypes.createManySuccess(response, action.meta)) // TODO: response?
        .catch((error) => concat(
          of(new this.actionTypes.createManyFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected findById: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.FIND_BY_ID)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.findById(action.payload.id, action.payload.filter)
        .map((response) => new this.actionTypes.findByIdSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.findByIdFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected find: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.FIND)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.find(action.payload)
        .map((response) => new this.actionTypes.findSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.findFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected findOne: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.FIND_ONE)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.findOne(action.payload)
        .map((response) => new this.actionTypes.findOneSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.findOneFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected updateAll: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.UPDATE_ALL)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.updateAll(action.payload.where, action.payload.data)
        .map((response) => new this.actionTypes.updateAllSuccess(response, action.meta)) // TODO: response?
        .catch((error) => concat(
          of(new this.actionTypes.updateAllFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected deleteById: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.DELETE_BY_ID)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.deleteById(action.payload)
        .map(() => new this.actionTypes.deleteByIdSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.deleteByIdFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected updateAttributes: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.UPDATE_ATTRIBUTES)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.updateAttributes(action.payload.id, action.payload.data)
        .map((response) => new this.actionTypes.updateAttributesSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.updateAttributesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected upsert: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.UPSERT)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.upsert(action.payload)
        .map((response) => new this.actionTypes.upsertSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.upsertFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected upsertWithWhere: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.UPSERT_WITH_WHERE)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.upsertWithWhere(action.payload.where, action.payload.data)
        .map((response) => new this.actionTypes.upsertWithWhereSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.upsertWithWhereFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected replaceOrCreate: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.REPLACE_OR_CREATE)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.replaceOrCreate(action.payload)
        .map((response) => new this.actionTypes.replaceOrCreateSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.replaceOrCreateFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected replaceById: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.REPLACE_BY_ID)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.replaceById(action.payload.id, action.payload.data)
        .map((response) => new this.actionTypes.replaceByIdSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.replaceByIdFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected patchOrCreate: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.PATCH_OR_CREATE)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.patchOrCreate(action.payload)
        .map((response) => new this.actionTypes.patchOrCreateSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.patchOrCreateFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  protected patchAttributes: Observable<LoopbackAction> = this.actions$
    .ofType(this.actionTypes.PATCH_ATTRIBUTES)
    .mergeMap((action: LoopbackAction) =>
      this.apiService.patchAttributes(action.payload.id, action.payload.data)
        .map((response) => new this.actionTypes.patchAttributesSuccess(response, action.meta))
        .catch((error) => concat(
          of(new this.actionTypes.patchAttributesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  constructor(
    public actions$: Actions,
    public apiService: any,
    public modelName: string,
    public actionTypes: any
  ) {}
};
