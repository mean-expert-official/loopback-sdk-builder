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

});
export const UserIdentityActions =
Object.assign(BaseLoopbackActionsFactory<UserIdentity>(UserIdentityActionTypes), {

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

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
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
});