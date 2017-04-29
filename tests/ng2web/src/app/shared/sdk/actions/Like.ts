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

  PATCH_OR_CREATE: type('[Like] patchOrCreate'),
  PATCH_OR_CREATE_SUCCESS: type('[Like] patchOrCreate success'),
  PATCH_OR_CREATE_FAIL: type('[Like] patchOrCreate fail'),

  PATCH_ATTRIBUTES: type('[Like] patchAttributes'),
  PATCH_ATTRIBUTES_SUCCESS: type('[Like] patchAttributes success'),
  PATCH_ATTRIBUTES_FAIL: type('[Like] patchAttributes fail'),

});
export const LikeActions =
Object.assign(BaseLoopbackActionsFactory<Like>('Like', LikeActionTypes), {

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

    constructor(id: any, refresh: any = {}, public meta?: any) {
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

    constructor(id: any, refresh: any = {}, public meta?: any) {
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
    public readonly type = LikeActionTypes.PATCH_OR_CREATE;
      
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
    public readonly type = LikeActionTypes.PATCH_OR_CREATE_SUCCESS;
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
    public readonly type = LikeActionTypes.PATCH_OR_CREATE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * patchAttributes Action.
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id like id
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   * @param {any} meta (optional).
   * 
   */
  patchAttributes: class implements Action {
    public readonly type = LikeActionTypes.PATCH_ATTRIBUTES;
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
    public readonly type = LikeActionTypes.PATCH_ATTRIBUTES_SUCCESS;
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
    public readonly type = LikeActionTypes.PATCH_ATTRIBUTES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});