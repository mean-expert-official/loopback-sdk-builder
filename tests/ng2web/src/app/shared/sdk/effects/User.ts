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
import { UserActionTypes, UserActions } from '../actions/User';
import { LoopbackErrorActions } from '../actions/error';
import { UserApi } from '../services/index';

@Injectable()
export class UserEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdAccessTokens$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdAccessTokens(action.payload.id, action.payload.fk).pipe(
          map((response: any) => new UserActions.findByIdAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.findByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdAccessTokens$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdAccessTokens(action.payload.id, action.payload.fk).pipe(
          map((response: any) => new UserActions.destroyByIdAccessTokensSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdAccessTokens$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdAccessTokens(action.payload.id, action.payload.fk, action.payload.data).pipe(
          map((response: any) => new UserActions.updateByIdAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getAccessTokens$ = this.actions$
    .ofType(UserActionTypes.GET_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getAccessTokens(action.payload.id, action.payload.filter).pipe(
          map((response: any) => new UserActions.getAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.getAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createAccessTokens$ = this.actions$
    .ofType(UserActionTypes.CREATE_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createAccessTokens(action.payload.id, action.payload.data).pipe(
          map((response: any) => new UserActions.createAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.createAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteAccessTokens$ = this.actions$
    .ofType(UserActionTypes.DELETE_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteAccessTokens(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteAccessTokensSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public login$ = this.actions$
    .ofType(UserActionTypes.LOGIN).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.login(action.payload.credentials, action.payload.include).pipe(
          map((response: any) => new UserActions.loginSuccess(response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.loginFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public logout$ = this.actions$
    .ofType(UserActionTypes.LOGOUT).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.logout().pipe(
          map((response: any) => new UserActions.logoutSuccess(action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.logoutFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public verify$ = this.actions$
    .ofType(UserActionTypes.VERIFY).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.verify(action.payload.id).pipe(
          map((response: any) => new UserActions.verifySuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.verifyFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public confirm$ = this.actions$
    .ofType(UserActionTypes.CONFIRM).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.confirm(action.payload.uid, action.payload.token, action.payload.redirect).pipe(
          map((response: any) => new UserActions.confirmSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.confirmFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public resetPassword$ = this.actions$
    .ofType(UserActionTypes.RESET_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.resetPassword(action.payload.options).pipe(
          map((response: any) => new UserActions.resetPasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.resetPasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public changePassword$ = this.actions$
    .ofType(UserActionTypes.CHANGE_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.changePassword(action.payload.oldPassword, action.payload.newPassword).pipe(
          map((response: any) => new UserActions.changePasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.changePasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public setPassword$ = this.actions$
    .ofType(UserActionTypes.SET_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.setPassword(action.payload.newPassword).pipe(
          map((response: any) => new UserActions.setPasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.setPasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyAccessTokens$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyAccessTokens(action.payload.id, action.payload.data).pipe(
          map((response: any) => new UserActions.createManyAccessTokensSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.createManyAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * User specific actions
   */
  @Effect()
  public signup$ = this.actions$
    .ofType(UserActionTypes.SIGNUP).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.create(action.payload).pipe(
          map((response: any) => new UserActions.signupSuccess(action.payload, response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.signupFail(error, action.meta)),
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
    @Inject(UserApi) public user: UserApi
  ) {
    super(actions$, user, 'User', UserActionTypes, UserActions);
  }
}
