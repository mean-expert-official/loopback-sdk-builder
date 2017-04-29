/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, ApplicationCredential } from '../models';

export const ApplicationCredentialActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('ApplicationCredential'), {
  PATCH_OR_CREATE: type('[ApplicationCredential] patchOrCreate'),
  PATCH_OR_CREATE_SUCCESS: type('[ApplicationCredential] patchOrCreate success'),
  PATCH_OR_CREATE_FAIL: type('[ApplicationCredential] patchOrCreate fail'),

  PATCH_ATTRIBUTES: type('[ApplicationCredential] patchAttributes'),
  PATCH_ATTRIBUTES_SUCCESS: type('[ApplicationCredential] patchAttributes success'),
  PATCH_ATTRIBUTES_FAIL: type('[ApplicationCredential] patchAttributes fail'),

});
export const ApplicationCredentialActions =
Object.assign(BaseLoopbackActionsFactory<ApplicationCredential>('ApplicationCredential', ApplicationCredentialActionTypes), {

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
    public readonly type = ApplicationCredentialActionTypes.PATCH_OR_CREATE;
      
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
    public readonly type = ApplicationCredentialActionTypes.PATCH_OR_CREATE_SUCCESS;
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
    public readonly type = ApplicationCredentialActionTypes.PATCH_OR_CREATE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * patchAttributes Action.
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id ApplicationCredential id
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   * @param {any} meta (optional).
   * 
   */
  patchAttributes: class implements Action {
    public readonly type = ApplicationCredentialActionTypes.PATCH_ATTRIBUTES;
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
    public readonly type = ApplicationCredentialActionTypes.PATCH_ATTRIBUTES_SUCCESS;
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
    public readonly type = ApplicationCredentialActionTypes.PATCH_ATTRIBUTES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});