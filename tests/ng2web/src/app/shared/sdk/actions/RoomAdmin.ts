/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, RoomAdmin } from '../models';

export const RoomAdminActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('RoomAdmin'), {
  GET_ACCOUNT: type('[RoomAdmin] getAccount'),
  GET_ACCOUNT_SUCCESS: type('[RoomAdmin] getAccount success'),
  GET_ACCOUNT_FAIL: type('[RoomAdmin] getAccount fail'),

  GET_ROOM: type('[RoomAdmin] getRoom'),
  GET_ROOM_SUCCESS: type('[RoomAdmin] getRoom success'),
  GET_ROOM_FAIL: type('[RoomAdmin] getRoom fail'),

});
export const RoomAdminActions =
Object.assign(BaseLoopbackActionsFactory<RoomAdmin>(RoomAdminActionTypes), {

  /**
   * getAccount Action.
   * Fetches belongsTo relation account.
   *
   * @param {any} id RoomAdmin id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getAccount: class implements Action {
    public readonly type = RoomAdminActionTypes.GET_ACCOUNT;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getAccountSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getAccountSuccess: class implements Action {
    public readonly type = RoomAdminActionTypes.GET_ACCOUNT_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getAccountFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getAccountFail: class implements Action {
    public readonly type = RoomAdminActionTypes.GET_ACCOUNT_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getRoom Action.
   * Fetches belongsTo relation room.
   *
   * @param {any} id RoomAdmin id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getRoom: class implements Action {
    public readonly type = RoomAdminActionTypes.GET_ROOM;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getRoomSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getRoomSuccess: class implements Action {
    public readonly type = RoomAdminActionTypes.GET_ROOM_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getRoomFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getRoomFail: class implements Action {
    public readonly type = RoomAdminActionTypes.GET_ROOM_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});