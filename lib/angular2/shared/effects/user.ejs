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
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { BaseLoopbackEffects } from './base';

import { UserActionTypes, UserActions } from '../actions/user';
import { LoopbackErrorActions } from '../actions/error';
import { UserApi } from '../services/index';

@Injectable()
export class UserEffects extends BaseLoopbackEffects {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Apps relation effects
   */
  @Effect()
  protected findByIdApps: Observable<Action> = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_APPS)
    .map(toPayload)
    .mergeMap((payload) =>
      this.user.findByIdApps(payload.id, payload.fk)
        .map((response) => new UserActions.findByIdAppsSuccess({id: payload.id, data: response}))
        .catch((error) => concat(
          of(new UserActions.findByIdAppsFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  @Effect()
  protected destroyByIdApps: Observable<Action> = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_APPS)
    .map(toPayload)
    .mergeMap((payload) =>
      this.user.destroyByIdApps(payload.id, payload.fk)
        .map(() => new UserActions.destroyByIdAppsSuccess(payload))
        .catch((error) => concat(
          of(new UserActions.destroyByIdAppsFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  @Effect()
  protected updateByIdApps: Observable<Action> = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_APPS)
    .map(toPayload)
    .mergeMap((payload) =>
      this.user.updateByIdApps(payload.id, payload.fk, payload.data)
        .map((response) => new UserActions.updateByIdAppsSuccess({id: payload.id, data: response}))
        .catch((error) => concat(
          of(new UserActions.updateByIdAppsFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  @Effect()
  protected createApps: Observable<Action> = this.actions$
    .ofType(UserActionTypes.CREATE_APPS)
    .map(toPayload)
    .mergeMap((payload) =>
      this.user.createApps(payload.id, payload.data)
        .map((response) => new UserActions.createAppsSuccess({id: payload.id, data: response}))
        .catch((error) => concat(
          of(new UserActions.createAppsFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  @Effect()
  protected deleteApps: Observable<Action> = this.actions$
    .ofType(UserActionTypes.DELETE_APPS)
    .map(toPayload)
    .mergeMap((payload) =>
      this.user.deleteApps(payload.id)
        .map(() => new UserActions.deleteAppsSuccess(payload.id))
        .catch((error) => concat(
          of(new UserActions.deleteAppsFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  @Effect()
  protected createManyApps: Observable<Action> = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_APPS)
    .map(toPayload)
    .mergeMap((payload) =>
      this.user.createManyApps(payload.id, payload.data)
        .map((response) => new UserActions.createManyAppsSuccess({id: payload.id, data: response}))
        .catch((error) => concat(
          of(new UserActions.createManyAppsFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * User specific actions
   */
  @Effect()
  protected login: Observable<Action> = this.actions$
    .ofType(UserActionTypes.LOGIN)
    .map(toPayload)
    .mergeMap((payload) =>
      this.user.login(payload.credentials, payload.include, payload.rememberMe)
        .map((response) => new UserActions.loginSuccess(response))
        .catch((error) => concat(
          of(new UserActions.loginFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  @Effect()
  protected register: Observable<Action> = this.actions$
    .ofType(UserActionTypes.REGISTER)
    .map(toPayload)
    .mergeMap((payload) => 
      this.user.create(payload.credentials)
        .map((response) => new UserActions.registerSuccess(response))
        .catch((error) => concat(
          of(new UserActions.registerFail(error)),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  @Effect()
  protected logout: Observable<Action> = this.actions$
    .ofType(UserActionTypes.LOGOUT)
    .map(toPayload)
    .mergeMap((payload) =>
      this.user.logout()
        .map(() => new UserActions.logoutSuccess())
        .catch((error) => concat(
          of(new UserActions.logoutFail()),
          of(new LoopbackErrorActions.error(error))
        ))
    );

  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() protected create: any;
  @Effect() protected createMany: any;
  @Effect() protected findById: any;
  @Effect() protected find: any;
  @Effect() protected findOne: any;
  @Effect() protected updateAll: any;
  @Effect() protected deleteById: any;
  @Effect() protected updateAttributes: any;
  @Effect() protected upsert: any;
  @Effect() protected upsertWithWhere: any;
  @Effect() protected replaceOrCreate: any;
  @Effect() protected replaceById: any;
  @Effect() protected patchOrCreate: any;
  @Effect() protected patchAttributes: any;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(UserApi) public user: UserApi
  ) {
    super(actions$, user, 'User', UserActionTypes);
  }
}
