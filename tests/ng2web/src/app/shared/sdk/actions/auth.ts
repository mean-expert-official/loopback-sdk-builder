/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { SDKToken } from '../models/BaseModels';

/**
 * @module LoopbackAuthActionTypes
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible authentication action types.
 */
export const LoopbackAuthActionTypes = {
  LOAD_TOKEN: type('[LoopbackAuth] Load token from storage into store'),
  LOAD_TOKEN_SUCCESS: type('[LoopbackAuth] Load token from storage into store success'),
  LOAD_TOKEN_FAIL: type('[LoopbackAuth] Load token from storage into store fail'),
  SET_TOKEN: type('[LoopbackAuth] Set token in store'),
  SET_TOKEN_SUCCESS: type('[LoopbackAuth] Set token in store success'),
  CLEAR_TOKEN: type('[LoopbackAuth] Clear token in store'),
  SET_USER: type('[LoopbackAuth] Set user in store'),
  SET_USER_SUCCESS: type('[LoopbackAuth] Set user in store success'),
  UPDATE_USER_PROPERTIES: type('[LoopbackAuth] Update user properties'),
  UPDATE_USER_PROPERTIES_SUCCESS: type('[LoopbackAuth] Update user properties success'),
  UPDATE_USER_PROPERTIES_FAIL: type('[LoopbackAuth] Update user properties fail'),
  UPDATE_USER_STATE: type('[LoopbackAuth] Update user state'),
  UPDATE_USER_STATE_SUCCESS: type('[LoopbackAuth] Update user state success'),
  GUARD_FAIL: type('[LoopbackAuth] Auth Guard fail'),
};

/**
 * @module LoopbackAuthActions
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible authentication actions.
 */
export const LoopbackAuthActions = {
  loadToken: class implements Action {
    public readonly type = LoopbackAuthActionTypes.LOAD_TOKEN;
  },

  loadTokenSuccess: class implements Action {
    public readonly type = LoopbackAuthActionTypes.LOAD_TOKEN_SUCCESS;

    constructor(public payload: SDKToken, public meta?: any) { }
  },

  loadTokenFail: class implements Action {
    public readonly type = LoopbackAuthActionTypes.LOAD_TOKEN_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  setToken: class implements Action {
    public readonly type = LoopbackAuthActionTypes.SET_TOKEN;

    constructor(public payload: SDKToken, public meta?: any) { }
  },

  setTokenSuccess: class implements Action {
    public readonly type = LoopbackAuthActionTypes.SET_TOKEN_SUCCESS;

    constructor(public payload: SDKToken, public meta?: any) { }
  },

  clearToken: class implements Action {
    public readonly type = LoopbackAuthActionTypes.CLEAR_TOKEN;
  },

  setUser: class implements Action {
    public readonly type = LoopbackAuthActionTypes.SET_USER;

    constructor(public payload: any, public meta?: any) { }
  },

  setUserSuccess: class implements Action {
    public readonly type = LoopbackAuthActionTypes.SET_USER_SUCCESS;

    constructor(public payload: any, public meta?: any) { }
  },

  updateUserProperties: class implements Action {
    public readonly type = LoopbackAuthActionTypes.UPDATE_USER_PROPERTIES;

    constructor(public payload: any, public meta?: any) { }
  },

  updateUserPropertiesSuccess: class implements Action {
    public readonly type = LoopbackAuthActionTypes.UPDATE_USER_PROPERTIES_SUCCESS;

    constructor(public payload: any, public meta?: any) { }
  },

  updateUserPropertiesFail: class implements Action {
    public readonly type = LoopbackAuthActionTypes.UPDATE_USER_PROPERTIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  updateUserState: class implements Action {
    public readonly type = LoopbackAuthActionTypes.UPDATE_USER_STATE;

    constructor(public payload: any, public meta?: any) { }
  },

  updateUserStateSuccess: class implements Action {
    public readonly type = LoopbackAuthActionTypes.UPDATE_USER_STATE_SUCCESS;

    constructor(public payload: any, public meta?: any) { }
  },

  guardFail: class implements Action {
    public readonly type = LoopbackAuthActionTypes.GUARD_FAIL;
  },
};
