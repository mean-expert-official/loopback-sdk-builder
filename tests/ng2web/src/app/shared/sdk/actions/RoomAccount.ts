/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, RoomAccount } from '../models';

export const RoomAccountActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('RoomAccount'), {
  GET_ACCOUNT: type('[RoomAccount] getAccount'),
  GET_ACCOUNT_SUCCESS: type('[RoomAccount] getAccount success'),
  GET_ACCOUNT_FAIL: type('[RoomAccount] getAccount fail'),

  GET_ROOM: type('[RoomAccount] getRoom'),
  GET_ROOM_SUCCESS: type('[RoomAccount] getRoom success'),
  GET_ROOM_FAIL: type('[RoomAccount] getRoom fail'),

});
export const RoomAccountActions =
Object.assign(BaseLoopbackActionsFactory<RoomAccount>(RoomAccountActionTypes), {

  /**
   * getAccount Action.
   * Fetches belongsTo relation account.
   *
   * @param {any} id RoomAccount id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getAccount: class implements Action {
    public readonly type = RoomAccountActionTypes.GET_ACCOUNT;
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
    public readonly type = RoomAccountActionTypes.GET_ACCOUNT_SUCCESS;
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
    public readonly type = RoomAccountActionTypes.GET_ACCOUNT_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getRoom Action.
   * Fetches belongsTo relation room.
   *
   * @param {any} id RoomAccount id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getRoom: class implements Action {
    public readonly type = RoomAccountActionTypes.GET_ROOM;
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
    public readonly type = RoomAccountActionTypes.GET_ROOM_SUCCESS;
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
    public readonly type = RoomAccountActionTypes.GET_ROOM_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});