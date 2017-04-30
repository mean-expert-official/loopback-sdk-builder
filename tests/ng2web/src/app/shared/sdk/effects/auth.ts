/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { LoopbackAction } from '../models/BaseModels';
import { LoopbackAuthActionTypes, LoopbackAuthActions } from '../actions/auth';
import { LoopbackErrorActions } from '../actions/error';
import { LoopBackAuth } from '../services/core/auth.service';
import { AccountApi } from '../services/index';


/**
 * @module LoopbackAuthEffects
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible authentication effects.
 */
@Injectable()
export class LoopbackAuthEffects {
  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  protected loadToken: Observable<LoopbackAction> = this.actions$
    .ofType(LoopbackAuthActionTypes.LOAD_TOKEN)
    .startWith(new LoopbackAuthActions.loadToken())
    .map(() => new LoopbackAuthActions.loadTokenSuccess(this.auth.getToken()));

  @Effect({dispatch: false})
  protected setToken: Observable<LoopbackAction> = this.actions$
    .ofType(LoopbackAuthActionTypes.SET_TOKEN)
    .do((action: LoopbackAction) => {
      this.auth.setUser(action.payload);
      this.auth.setRememberMe(true);
      this.auth.save();

      this.store.dispatch(new LoopbackAuthActions.setTokenSuccess(action.payload, action.meta));
    });

  @Effect({dispatch: false})
  protected setUser: Observable<LoopbackAction> = this.actions$
    .ofType(LoopbackAuthActionTypes.SET_USER)
    .do((action: LoopbackAction) => {
      let token = this.auth.getToken();
      this.auth.setUser(Object.assign(token, {
        userId: action.payload.id,
        user: action.payload
      }));
      this.auth.setRememberMe(true);
      this.auth.save();

      this.store.dispatch(new LoopbackAuthActions.setUserSuccess(action.payload, action.meta));
    });

  @Effect()
  protected updateUserProperties: Observable<LoopbackAction> = this.actions$
    .ofType(LoopbackAuthActionTypes.UPDATE_USER_PROPERTIES)
    .mergeMap((action: LoopbackAction) => {
      let token = this.auth.getToken();
      return this.user.patchAttributes(token.userId, action.payload)
        .map((response) => {
          token.user = Object.assign(token.user, action.payload);
          this.auth.setUser(token);
          this.auth.save();
          return new LoopbackAuthActions.updateUserPropertiesSuccess(action.payload, action.meta)
        })
        .catch((error) => concat(
          of(new LoopbackAuthActions.updateUserPropertiesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    });

  @Effect({dispatch: false})
  protected updateUserState: Observable<LoopbackAction> = this.actions$
    .ofType(LoopbackAuthActionTypes.UPDATE_USER_STATE)
    .do((action: LoopbackAction) => {
      let token = this.auth.getToken();
      token.user = Object.assign(token.user, action.payload);
      this.auth.setUser(token);
      this.auth.save();
      this.store.dispatch(
        new LoopbackAuthActions.updateUserStateSuccess(action.payload, action.meta)
      );
    });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private auth: LoopBackAuth,
    private user: AccountApi
  ) {}
}
