/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, UserIdentity } from '../models';

export const UserIdentityActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('UserIdentity'), {
  GET_USER: type('[UserIdentity] getUser'),
  GET_USER_SUCCESS: type('[UserIdentity] getUser success'),
  GET_USER_FAIL: type('[UserIdentity] getUser fail'),

  PATCH_OR_CREATE: type('[UserIdentity] patchOrCreate'),
  PATCH_OR_CREATE_SUCCESS: type('[UserIdentity] patchOrCreate success'),
  PATCH_OR_CREATE_FAIL: type('[UserIdentity] patchOrCreate fail'),

  PATCH_ATTRIBUTES: type('[UserIdentity] patchAttributes'),
  PATCH_ATTRIBUTES_SUCCESS: type('[UserIdentity] patchAttributes success'),
  PATCH_ATTRIBUTES_FAIL: type('[UserIdentity] patchAttributes fail'),

});
export const UserIdentityActions =
Object.assign(BaseLoopbackActionsFactory<UserIdentity>('UserIdentity', UserIdentityActionTypes), {

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id UserIdentity id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = UserIdentityActionTypes.GET_USER;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getUserSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getUserSuccess: class implements Action {
    public readonly type = UserIdentityActionTypes.GET_USER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getUserFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getUserFail: class implements Action {
    public readonly type = UserIdentityActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * patchOrCreate Action.
   * Patch an existing model instance or insert a new one into the data source.
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - Model instance data
   * @param {any} meta (optional).
   * 
   */
  patchOrCreate: class implements Action {
    public readonly type = UserIdentityActionTypes.PATCH_OR_CREATE;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * patchOrCreateSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  patchOrCreateSuccess: class implements Action {
    public readonly type = UserIdentityActionTypes.PATCH_OR_CREATE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * patchOrCreateFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  patchOrCreateFail: class implements Action {
    public readonly type = UserIdentityActionTypes.PATCH_OR_CREATE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * patchAttributes Action.
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id UserIdentity id
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   * @param {any} meta (optional).
   * 
   */
  patchAttributes: class implements Action {
    public readonly type = UserIdentityActionTypes.PATCH_ATTRIBUTES;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * patchAttributesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  patchAttributesSuccess: class implements Action {
    public readonly type = UserIdentityActionTypes.PATCH_ATTRIBUTES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * patchAttributesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  patchAttributesFail: class implements Action {
    public readonly type = UserIdentityActionTypes.PATCH_ATTRIBUTES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});