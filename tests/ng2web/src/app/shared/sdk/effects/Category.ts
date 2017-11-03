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
import { CategoryActionTypes, CategoryActions } from '../actions/Category';
import { LoopbackErrorActions } from '../actions/error';
import { CategoryApi } from '../services/index';

@Injectable()
export class CategoryEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdRooms$ = this.actions$
    .ofType(CategoryActionTypes.FIND_BY_ID_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.findByIdRooms(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Room', 'findByIdSuccess'),
            of(new CategoryActions.findByIdRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.findByIdRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdRooms$ = this.actions$
    .ofType(CategoryActionTypes.DESTROY_BY_ID_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.destroyByIdRooms(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'deleteByIdSuccess'),
            of(new CategoryActions.destroyByIdRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.destroyByIdRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdRooms$ = this.actions$
    .ofType(CategoryActionTypes.UPDATE_BY_ID_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.updateByIdRooms(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Room', 'findByIdSuccess'),
            of(new CategoryActions.updateByIdRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.updateByIdRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkRooms$ = this.actions$
    .ofType(CategoryActionTypes.LINK_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.linkRooms(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomCategoryActions'].createSuccess(response, action.meta)),
          of(new CategoryActions.linkRoomsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new CategoryActions.linkRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkRooms$ = this.actions$
    .ofType(CategoryActionTypes.UNLINK_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.unlinkRooms(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomCategoryActions'].deleteByIdSuccess(response.id, action.meta)),
          of(new CategoryActions.unlinkRoomsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new CategoryActions.unlinkRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getRooms$ = this.actions$
    .ofType(CategoryActionTypes.GET_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.getRooms(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new CategoryActions.getRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.getRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createRooms$ = this.actions$
    .ofType(CategoryActionTypes.CREATE_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.createRooms(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new CategoryActions.createRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.createRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteRooms$ = this.actions$
    .ofType(CategoryActionTypes.DELETE_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.deleteRooms(action.payload.id).pipe(
          map((response: any) => new CategoryActions.deleteRoomsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new CategoryActions.deleteRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyRooms$ = this.actions$
    .ofType(CategoryActionTypes.CREATE_MANY_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.createManyRooms(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new CategoryActions.createManyRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.createManyRoomsFail(error, action.meta)),
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
    @Inject(CategoryApi) public category: CategoryApi
  ) {
    super(actions$, category, 'Category', CategoryActionTypes, CategoryActions);
  }
}
