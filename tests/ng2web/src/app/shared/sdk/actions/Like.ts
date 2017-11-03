/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Like } from '../models';

export const LikeActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Like'), {
  GET_MESSAGE: type('[Like] getMessage'),
  GET_MESSAGE_SUCCESS: type('[Like] getMessage success'),
  GET_MESSAGE_FAIL: type('[Like] getMessage fail'),

  GET_ROOM: type('[Like] getRoom'),
  GET_ROOM_SUCCESS: type('[Like] getRoom success'),
  GET_ROOM_FAIL: type('[Like] getRoom fail'),

});
export const LikeActions =
Object.assign(BaseLoopbackActionsFactory<Like>(LikeActionTypes), {

  /**
   * getMessage Action.
   * Fetches belongsTo relation message.
   *
   * @param {any} id like id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getMessage: class implements Action {
    public readonly type = LikeActionTypes.GET_MESSAGE;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getMessageSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getMessageSuccess: class implements Action {
    public readonly type = LikeActionTypes.GET_MESSAGE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getMessageFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getMessageFail: class implements Action {
    public readonly type = LikeActionTypes.GET_MESSAGE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getRoom Action.
   * Fetches belongsTo relation room.
   *
   * @param {any} id like id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getRoom: class implements Action {
    public readonly type = LikeActionTypes.GET_ROOM;
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
    public readonly type = LikeActionTypes.GET_ROOM_SUCCESS;
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
    public readonly type = LikeActionTypes.GET_ROOM_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});