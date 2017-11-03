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
import { AccountActionTypes, AccountActions } from '../actions/Account';
import { LoopbackErrorActions } from '../actions/error';
import { AccountApi } from '../services/index';

@Injectable()
export class AccountEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.findByIdAccessTokens(action.payload.id, action.payload.fk).pipe(
          map((response: any) => new AccountActions.findByIdAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.findByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.destroyByIdAccessTokens(action.payload.id, action.payload.fk).pipe(
          map((response: any) => new AccountActions.destroyByIdAccessTokensSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.destroyByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.updateByIdAccessTokens(action.payload.id, action.payload.fk, action.payload.data).pipe(
          map((response: any) => new AccountActions.updateByIdAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.updateByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdRooms$ = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.findByIdRooms(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Room', 'findByIdSuccess'),
            of(new AccountActions.findByIdRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.findByIdRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdRooms$ = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.destroyByIdRooms(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'deleteByIdSuccess'),
            of(new AccountActions.destroyByIdRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.destroyByIdRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdRooms$ = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.updateByIdRooms(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Room', 'findByIdSuccess'),
            of(new AccountActions.updateByIdRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.updateByIdRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkRooms$ = this.actions$
    .ofType(AccountActionTypes.LINK_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.linkRooms(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomAccountActions'].createSuccess(response, action.meta)),
          of(new AccountActions.linkRoomsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new AccountActions.linkRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkRooms$ = this.actions$
    .ofType(AccountActionTypes.UNLINK_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.unlinkRooms(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomAccountActions'].deleteByIdSuccess(response.id, action.meta)),
          of(new AccountActions.unlinkRoomsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new AccountActions.unlinkRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdAdministrations$ = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.findByIdAdministrations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Room', 'findByIdSuccess'),
            of(new AccountActions.findByIdAdministrationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.findByIdAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdAdministrations$ = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.destroyByIdAdministrations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'deleteByIdSuccess'),
            of(new AccountActions.destroyByIdAdministrationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.destroyByIdAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdAdministrations$ = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.updateByIdAdministrations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Room', 'findByIdSuccess'),
            of(new AccountActions.updateByIdAdministrationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.updateByIdAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkAdministrations$ = this.actions$
    .ofType(AccountActionTypes.LINK_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.linkAdministrations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomAdminActions'].createSuccess(response, action.meta)),
          of(new AccountActions.linkAdministrationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new AccountActions.linkAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkAdministrations$ = this.actions$
    .ofType(AccountActionTypes.UNLINK_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.unlinkAdministrations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
          of(new actions['RoomAdminActions'].deleteByIdSuccess(response.id, action.meta)),
          of(new AccountActions.unlinkAdministrationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new AccountActions.unlinkAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.GET_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.getAccessTokens(action.payload.id, action.payload.filter).pipe(
          map((response: any) => new AccountActions.getAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.getAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.CREATE_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.createAccessTokens(action.payload.id, action.payload.data).pipe(
          map((response: any) => new AccountActions.createAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.createAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.DELETE_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.deleteAccessTokens(action.payload.id).pipe(
          map((response: any) => new AccountActions.deleteAccessTokensSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.deleteAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getRooms$ = this.actions$
    .ofType(AccountActionTypes.GET_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.getRooms(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new AccountActions.getRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.getRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createRooms$ = this.actions$
    .ofType(AccountActionTypes.CREATE_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.createRooms(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new AccountActions.createRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.createRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteRooms$ = this.actions$
    .ofType(AccountActionTypes.DELETE_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.deleteRooms(action.payload.id).pipe(
          map((response: any) => new AccountActions.deleteRoomsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.deleteRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getAdministrations$ = this.actions$
    .ofType(AccountActionTypes.GET_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.getAdministrations(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new AccountActions.getAdministrationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.getAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createAdministrations$ = this.actions$
    .ofType(AccountActionTypes.CREATE_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.createAdministrations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new AccountActions.createAdministrationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.createAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteAdministrations$ = this.actions$
    .ofType(AccountActionTypes.DELETE_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.deleteAdministrations(action.payload.id).pipe(
          map((response: any) => new AccountActions.deleteAdministrationsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.deleteAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public login$ = this.actions$
    .ofType(AccountActionTypes.LOGIN).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.login(action.payload.credentials, action.payload.include).pipe(
          map((response: any) => new AccountActions.loginSuccess(response, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.loginFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public logout$ = this.actions$
    .ofType(AccountActionTypes.LOGOUT).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.logout().pipe(
          map((response: any) => new AccountActions.logoutSuccess(action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.logoutFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public verify$ = this.actions$
    .ofType(AccountActionTypes.VERIFY).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.verify(action.payload.id).pipe(
          map((response: any) => new AccountActions.verifySuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.verifyFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public confirm$ = this.actions$
    .ofType(AccountActionTypes.CONFIRM).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.confirm(action.payload.uid, action.payload.token, action.payload.redirect).pipe(
          map((response: any) => new AccountActions.confirmSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.confirmFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public resetPassword$ = this.actions$
    .ofType(AccountActionTypes.RESET_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.resetPassword(action.payload.options).pipe(
          map((response: any) => new AccountActions.resetPasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.resetPasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public changePassword$ = this.actions$
    .ofType(AccountActionTypes.CHANGE_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.changePassword(action.payload.oldPassword, action.payload.newPassword).pipe(
          map((response: any) => new AccountActions.changePasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.changePasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public setPassword$ = this.actions$
    .ofType(AccountActionTypes.SET_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.setPassword(action.payload.newPassword).pipe(
          map((response: any) => new AccountActions.setPasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.setPasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyAccessTokens$ = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.createManyAccessTokens(action.payload.id, action.payload.data).pipe(
          map((response: any) => new AccountActions.createManyAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.createManyAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyRooms$ = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ROOMS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.createManyRooms(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new AccountActions.createManyRoomsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.createManyRoomsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyAdministrations$ = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ADMINISTRATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.createManyAdministrations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Room', 'findSuccess'),
            of(new AccountActions.createManyAdministrationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AccountActions.createManyAdministrationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Account specific actions
   */
  @Effect()
  public signup$ = this.actions$
    .ofType(AccountActionTypes.SIGNUP).pipe(
      mergeMap((action: LoopbackAction) =>
        this.account.create(action.payload).pipe(
          map((response: any) => new AccountActions.signupSuccess(action.payload, response, action.meta)),
          catchError((error: any) => concat(
            of(new AccountActions.signupFail(error, action.meta)),
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
    @Inject(AccountApi) public account: AccountApi
  ) {
    super(actions$, account, 'Account', AccountActionTypes, AccountActions);
  }
}
