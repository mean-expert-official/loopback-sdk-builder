/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { SDKToken } from '../models/BaseModels';
import { LoopbackAuthActionTypes } from '../actions/auth';
import { AccountActionTypes } from '../actions/Account';

const initialState: SDKToken = {
  id: null,
  user: null,
  userId: null,
  issuedAt: null,
  created: null,
  ttl: null,
  rememberMe: null,
  scopes: null
};

/**
 * @module LoopbackAuthReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible authentication reducer.
 */
export function LoopbackAuthReducer(state = initialState, action: Action): SDKToken {
  switch (action.type) {
    case AccountActionTypes.LOGIN_SUCCESS:
    case LoopbackAuthActionTypes.SET_TOKEN:
    case LoopbackAuthActionTypes.LOAD_TOKEN_SUCCESS: {
      const token: SDKToken = action.payload;

      return Object.assign({}, token);
    }

    case LoopbackAuthActionTypes.SET_USER: {
      const user: any = action.payload;
      let updateState = Object.assign({}, state);

      updateState.user = user;
      updateState.userId = user.id;

      return updateState;
    }

    case AccountActionTypes.LOGOUT_SUCCESS:
    case AccountActionTypes.LOGOUT_FAIL: {
      return Object.assign({}, initialState);
    }

    case LoopbackAuthActionTypes.UPDATE_USER_PROPERTIES_SUCCESS:
    case LoopbackAuthActionTypes.UPDATE_USER_STATE_SUCCESS: {
      const userProperties: any = action.payload;
      let updateState = Object.assign({}, state);

      updateState.user = Object.assign(updateState.user, userProperties);

      return updateState;
    }

    default: {
      return state;
    }
  }
}

export function getLoopbackAuthState() {
  return (state$: Observable<any>) => state$
    .select((s) => s.loopbackAuth);
}

export function getLoopbackAuthToken() {
  return (state$: Observable<any>) => state$
    .select((s) => s.loopbackAuth);
}

export function getLoopbackAuthAccount() {
  return (state$: Observable<any>) => state$
    .select((s) => s.loopbackAuth.user);
}

export function getLoopbackAuthAccountId() {
  return (state$: Observable<any>) => state$
    .select((s) => s.loopbackAuth.userId);
}
