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

import { CategoryActionTypes, CategoryActions } from '../actions/Category';
import { LoopbackErrorActions } from '../actions/error';
import { CategoryApi } from '../services/index';

@Injectable()
export class CategoryEffects extends BaseLoopbackEffects {
  @Effect()
  protected findByIdRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.FIND_BY_ID_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.findByIdRooms(action.payload.id, action.payload.fk)
              .map((response) => new CategoryActions.findByIdRoomsSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.findByIdRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.DESTROY_BY_ID_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.destroyByIdRooms(action.payload.id, action.payload.fk)
              .map((response) => new CategoryActions.destroyByIdRoomsSuccess(action.payload.id, response, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.destroyByIdRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.UPDATE_BY_ID_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.updateByIdRooms(action.payload.id, action.payload.fk, action.payload.data)
              .map((response) => new CategoryActions.updateByIdRoomsSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.updateByIdRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected linkRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.LINK_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.linkRooms(action.payload.id, action.payload.fk, action.payload.data)
              .map((response) => new CategoryActions.linkRoomsSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.linkRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected unlinkRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.UNLINK_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.unlinkRooms(action.payload.id, action.payload.fk)
              .map((response) => new CategoryActions.unlinkRoomsSuccess(action.payload.id, response, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.unlinkRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.GET_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.getRooms(action.payload.id, action.payload.filter)
              .map((response) => new CategoryActions.getRoomsSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.getRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.CREATE_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.createRooms(action.payload.id, action.payload.data)
              .map((response) => new CategoryActions.createRoomsSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.createRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.DELETE_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.deleteRooms(action.payload.id)
              .map((response) => new CategoryActions.deleteRoomsSuccess(action.payload.id, response, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.deleteRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected countRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.COUNT_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.countRooms(action.payload.id, action.payload.where)
              .map((response) => new CategoryActions.countRoomsSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.countRoomsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected patchOrCreate: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.PATCH_OR_CREATE)
    .mergeMap((action: LoopbackAction) =>
      this.category.patchOrCreate(action.payload.data)
              .map((response) => new CategoryActions.patchOrCreateSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.patchOrCreateFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected patchAttributes: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.PATCH_ATTRIBUTES)
    .mergeMap((action: LoopbackAction) =>
      this.category.patchAttributes(action.payload.id, action.payload.data)
              .map((response) => new CategoryActions.patchAttributesSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.patchAttributesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyRooms: Observable<LoopbackAction> = this.actions$
    .ofType(CategoryActionTypes.CREATE_MANY_ROOMS)
    .mergeMap((action: LoopbackAction) =>
      this.category.createManyRooms(action.payload.id, action.payload.data)
              .map((response) => new CategoryActions.createManyRoomsSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new CategoryActions.createManyRoomsFail(error, action.meta)),
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
    @Inject(CategoryApi) public category: CategoryApi
  ) {
    super(actions$, category, 'Category', CategoryActionTypes, CategoryActions);
  }
}
