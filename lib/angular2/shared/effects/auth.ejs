/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { LoopbackAuthActionTypes, LoopbackAuthActions } from '../actions/auth';
import { LoopBackAuth } from '../services/core/auth.service';

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
  public loadToken: Observable<Action> = this.actions$
    .ofType(LoopbackAuthActionTypes.LOAD_TOKEN)
    .startWith(new LoopbackAuthActions.loadToken())
    .map(() => new LoopbackAuthActions.loadTokenSuccess(this.auth.getToken()));

  @Effect({dispatch: false})
  public setToken: Observable<Action> = this.actions$
    .ofType(LoopbackAuthActionTypes.SET_TOKEN)
    .map(toPayload)
    .do((payload) => {
      this.auth.setUser(payload);
      this.auth.setRememberMe(true);
      this.auth.save();

      this.store.dispatch(new LoopbackAuthActions.setTokenSuccess(payload));
    });

  @Effect({dispatch: false})
  public setUser: Observable<Action> = this.actions$
    .ofType(LoopbackAuthActionTypes.SET_USER)
    .map(toPayload)
    .do((payload) => {
      let token = this.auth.getToken();
      this.auth.setUser(Object.assign(token, {
        userId: payload.id,
        user: payload
      }));
      this.auth.setRememberMe(true);
      this.auth.save();

      this.store.dispatch(new LoopbackAuthActions.setUserSuccess(payload));
    });

  @Effect({dispatch: false})
  public updateUserProperties: Observable<Action> = this.actions$
    .ofType(LoopbackAuthActionTypes.UPDATE_USER_PROPERTIES)
    .map(toPayload)
    .do((payload) => {
      let token = this.auth.getToken();
      token.user = Object.assign(token.user, payload);
      this.auth.setUser(token);
      this.auth.save();

      this.store.dispatch(new LoopbackAuthActions.updateUserPropertiesSuccess(payload));
    });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private auth: LoopBackAuth
  ) {}
}
