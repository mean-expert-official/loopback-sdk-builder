/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Account } from '../models';

export const AccountActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Account'), {
  FIND_BY_ID_ACCESSTOKENS: type('[Account] findByIdAccessTokens'),
  FIND_BY_ID_ACCESSTOKENS_SUCCESS: type('[Account] findByIdAccessTokens success'),
  FIND_BY_ID_ACCESSTOKENS_FAIL: type('[Account] findByIdAccessTokens fail'),

  DESTROY_BY_ID_ACCESSTOKENS: type('[Account] destroyByIdAccessTokens'),
  DESTROY_BY_ID_ACCESSTOKENS_SUCCESS: type('[Account] destroyByIdAccessTokens success'),
  DESTROY_BY_ID_ACCESSTOKENS_FAIL: type('[Account] destroyByIdAccessTokens fail'),

  UPDATE_BY_ID_ACCESSTOKENS: type('[Account] updateByIdAccessTokens'),
  UPDATE_BY_ID_ACCESSTOKENS_SUCCESS: type('[Account] updateByIdAccessTokens success'),
  UPDATE_BY_ID_ACCESSTOKENS_FAIL: type('[Account] updateByIdAccessTokens fail'),

  FIND_BY_ID_ROOMS: type('[Account] findByIdRooms'),
  FIND_BY_ID_ROOMS_SUCCESS: type('[Account] findByIdRooms success'),
  FIND_BY_ID_ROOMS_FAIL: type('[Account] findByIdRooms fail'),

  DESTROY_BY_ID_ROOMS: type('[Account] destroyByIdRooms'),
  DESTROY_BY_ID_ROOMS_SUCCESS: type('[Account] destroyByIdRooms success'),
  DESTROY_BY_ID_ROOMS_FAIL: type('[Account] destroyByIdRooms fail'),

  UPDATE_BY_ID_ROOMS: type('[Account] updateByIdRooms'),
  UPDATE_BY_ID_ROOMS_SUCCESS: type('[Account] updateByIdRooms success'),
  UPDATE_BY_ID_ROOMS_FAIL: type('[Account] updateByIdRooms fail'),

  LINK_ROOMS: type('[Account] linkRooms'),
  LINK_ROOMS_SUCCESS: type('[Account] linkRooms success'),
  LINK_ROOMS_FAIL: type('[Account] linkRooms fail'),

  UNLINK_ROOMS: type('[Account] unlinkRooms'),
  UNLINK_ROOMS_SUCCESS: type('[Account] unlinkRooms success'),
  UNLINK_ROOMS_FAIL: type('[Account] unlinkRooms fail'),

  FIND_BY_ID_ADMINISTRATIONS: type('[Account] findByIdAdministrations'),
  FIND_BY_ID_ADMINISTRATIONS_SUCCESS: type('[Account] findByIdAdministrations success'),
  FIND_BY_ID_ADMINISTRATIONS_FAIL: type('[Account] findByIdAdministrations fail'),

  DESTROY_BY_ID_ADMINISTRATIONS: type('[Account] destroyByIdAdministrations'),
  DESTROY_BY_ID_ADMINISTRATIONS_SUCCESS: type('[Account] destroyByIdAdministrations success'),
  DESTROY_BY_ID_ADMINISTRATIONS_FAIL: type('[Account] destroyByIdAdministrations fail'),

  UPDATE_BY_ID_ADMINISTRATIONS: type('[Account] updateByIdAdministrations'),
  UPDATE_BY_ID_ADMINISTRATIONS_SUCCESS: type('[Account] updateByIdAdministrations success'),
  UPDATE_BY_ID_ADMINISTRATIONS_FAIL: type('[Account] updateByIdAdministrations fail'),

  LINK_ADMINISTRATIONS: type('[Account] linkAdministrations'),
  LINK_ADMINISTRATIONS_SUCCESS: type('[Account] linkAdministrations success'),
  LINK_ADMINISTRATIONS_FAIL: type('[Account] linkAdministrations fail'),

  UNLINK_ADMINISTRATIONS: type('[Account] unlinkAdministrations'),
  UNLINK_ADMINISTRATIONS_SUCCESS: type('[Account] unlinkAdministrations success'),
  UNLINK_ADMINISTRATIONS_FAIL: type('[Account] unlinkAdministrations fail'),

  GET_ACCESSTOKENS: type('[Account] getAccessTokens'),
  GET_ACCESSTOKENS_SUCCESS: type('[Account] getAccessTokens success'),
  GET_ACCESSTOKENS_FAIL: type('[Account] getAccessTokens fail'),

  CREATE_ACCESSTOKENS: type('[Account] createAccessTokens'),
  CREATE_ACCESSTOKENS_SUCCESS: type('[Account] createAccessTokens success'),
  CREATE_ACCESSTOKENS_FAIL: type('[Account] createAccessTokens fail'),

  DELETE_ACCESSTOKENS: type('[Account] deleteAccessTokens'),
  DELETE_ACCESSTOKENS_SUCCESS: type('[Account] deleteAccessTokens success'),
  DELETE_ACCESSTOKENS_FAIL: type('[Account] deleteAccessTokens fail'),

  GET_ROOMS: type('[Account] getRooms'),
  GET_ROOMS_SUCCESS: type('[Account] getRooms success'),
  GET_ROOMS_FAIL: type('[Account] getRooms fail'),

  CREATE_ROOMS: type('[Account] createRooms'),
  CREATE_ROOMS_SUCCESS: type('[Account] createRooms success'),
  CREATE_ROOMS_FAIL: type('[Account] createRooms fail'),

  DELETE_ROOMS: type('[Account] deleteRooms'),
  DELETE_ROOMS_SUCCESS: type('[Account] deleteRooms success'),
  DELETE_ROOMS_FAIL: type('[Account] deleteRooms fail'),

  GET_ADMINISTRATIONS: type('[Account] getAdministrations'),
  GET_ADMINISTRATIONS_SUCCESS: type('[Account] getAdministrations success'),
  GET_ADMINISTRATIONS_FAIL: type('[Account] getAdministrations fail'),

  CREATE_ADMINISTRATIONS: type('[Account] createAdministrations'),
  CREATE_ADMINISTRATIONS_SUCCESS: type('[Account] createAdministrations success'),
  CREATE_ADMINISTRATIONS_FAIL: type('[Account] createAdministrations fail'),

  DELETE_ADMINISTRATIONS: type('[Account] deleteAdministrations'),
  DELETE_ADMINISTRATIONS_SUCCESS: type('[Account] deleteAdministrations success'),
  DELETE_ADMINISTRATIONS_FAIL: type('[Account] deleteAdministrations fail'),

  LOGIN: type('[Account] login'),
  LOGIN_SUCCESS: type('[Account] login success'),
  LOGIN_FAIL: type('[Account] login fail'),

  LOGOUT: type('[Account] logout'),
  LOGOUT_SUCCESS: type('[Account] logout success'),
  LOGOUT_FAIL: type('[Account] logout fail'),

  VERIFY: type('[Account] verify'),
  VERIFY_SUCCESS: type('[Account] verify success'),
  VERIFY_FAIL: type('[Account] verify fail'),

  CONFIRM: type('[Account] confirm'),
  CONFIRM_SUCCESS: type('[Account] confirm success'),
  CONFIRM_FAIL: type('[Account] confirm fail'),

  RESET_PASSWORD: type('[Account] resetPassword'),
  RESET_PASSWORD_SUCCESS: type('[Account] resetPassword success'),
  RESET_PASSWORD_FAIL: type('[Account] resetPassword fail'),

  CHANGE_PASSWORD: type('[Account] changePassword'),
  CHANGE_PASSWORD_SUCCESS: type('[Account] changePassword success'),
  CHANGE_PASSWORD_FAIL: type('[Account] changePassword fail'),

  SET_PASSWORD: type('[Account] setPassword'),
  SET_PASSWORD_SUCCESS: type('[Account] setPassword success'),
  SET_PASSWORD_FAIL: type('[Account] setPassword fail'),

  CREATE_MANY_ACCESSTOKENS: type('[Account] createManyAccessTokens'),
  CREATE_MANY_ACCESSTOKENS_SUCCESS: type('[Account] createManyAccessTokens success'),
  CREATE_MANY_ACCESSTOKENS_FAIL: type('[Account] createManyAccessTokens fail'),

  CREATE_MANY_ROOMS: type('[Account] createManyRooms'),
  CREATE_MANY_ROOMS_SUCCESS: type('[Account] createManyRooms success'),
  CREATE_MANY_ROOMS_FAIL: type('[Account] createManyRooms fail'),

  CREATE_MANY_ADMINISTRATIONS: type('[Account] createManyAdministrations'),
  CREATE_MANY_ADMINISTRATIONS_SUCCESS: type('[Account] createManyAdministrations success'),
  CREATE_MANY_ADMINISTRATIONS_FAIL: type('[Account] createManyAdministrations fail'),

}, {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Account specific action types
   */
  SIGNUP: type('[Account] Signup'),
  SIGNUP_SUCCESS: type('[Account] Signup success'),
  SIGNUP_FAIL: type('[Account] Signup fail'),
});
export const AccountActions =
Object.assign(BaseLoopbackActionsFactory<Account>(AccountActionTypes), {

  /**
   * findByIdAccessTokens Action.
   * Find a related item by id for accessTokens.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for accessTokens
   * @param {any} meta (optional).
   * 
   */
  findByIdAccessTokens: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ACCESSTOKENS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdAccessTokensSuccess: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdAccessTokensFail: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdAccessTokens Action.
   * Delete a related item by id for accessTokens.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for accessTokens
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccessTokens: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ACCESSTOKENS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccessTokensSuccess: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccessTokensFail: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdAccessTokens Action.
   * Update a related item by id for accessTokens.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for accessTokens
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccessTokens: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ACCESSTOKENS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccessTokensSuccess: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccessTokensFail: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdRooms Action.
   * Find a related item by id for rooms.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for rooms
   * @param {any} meta (optional).
   * 
   */
  findByIdRooms: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ROOMS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdRoomsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ROOMS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdRooms Action.
   * Delete a related item by id for rooms.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for rooms
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRooms: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ROOMS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdRoomsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ROOMS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdRooms Action.
   * Update a related item by id for rooms.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for rooms
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdRooms: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ROOMS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdRoomsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ROOMS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkRooms Action.
   * Add a related item by id for rooms.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for rooms
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkRooms: class implements Action {
    public readonly type = AccountActionTypes.LINK_ROOMS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * linkRoomsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.LINK_ROOMS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.LINK_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkRooms Action.
   * Remove the rooms relation to an item by id.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for rooms
   * @param {any} meta (optional).
   * 
   */
  unlinkRooms: class implements Action {
    public readonly type = AccountActionTypes.UNLINK_ROOMS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkRoomsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.UNLINK_ROOMS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.UNLINK_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdAdministrations Action.
   * Find a related item by id for administrations.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for administrations
   * @param {any} meta (optional).
   * 
   */
  findByIdAdministrations: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ADMINISTRATIONS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ADMINISTRATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdAdministrations Action.
   * Delete a related item by id for administrations.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for administrations
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAdministrations: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ADMINISTRATIONS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ADMINISTRATIONS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdAdministrations Action.
   * Update a related item by id for administrations.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for administrations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdAdministrations: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ADMINISTRATIONS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ADMINISTRATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkAdministrations Action.
   * Add a related item by id for administrations.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for administrations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkAdministrations: class implements Action {
    public readonly type = AccountActionTypes.LINK_ADMINISTRATIONS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * linkAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.LINK_ADMINISTRATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.LINK_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkAdministrations Action.
   * Remove the administrations relation to an item by id.
   *
   * @param {any} id Account id
   * @param {any} fk Foreign key for administrations
   * @param {any} meta (optional).
   * 
   */
  unlinkAdministrations: class implements Action {
    public readonly type = AccountActionTypes.UNLINK_ADMINISTRATIONS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.UNLINK_ADMINISTRATIONS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.UNLINK_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getAccessTokens Action.
   * Queries accessTokens of Account.
   *
   * @param {any} id Account id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getAccessTokens: class implements Action {
    public readonly type = AccountActionTypes.GET_ACCESSTOKENS;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getAccessTokensSuccess: class implements Action {
    public readonly type = AccountActionTypes.GET_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getAccessTokensFail: class implements Action {
    public readonly type = AccountActionTypes.GET_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createAccessTokens Action.
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id Account id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createAccessTokens: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ACCESSTOKENS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createAccessTokensSuccess: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createAccessTokensFail: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteAccessTokens Action.
   * Deletes all accessTokens of this model.
   *
   * @param {any} id Account id
   * @param {any} meta (optional).
   * 
   */
  deleteAccessTokens: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ACCESSTOKENS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteAccessTokensSuccess: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ACCESSTOKENS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteAccessTokensFail: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getRooms Action.
   * Queries rooms of Account.
   *
   * @param {any} id Account id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getRooms: class implements Action {
    public readonly type = AccountActionTypes.GET_ROOMS;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getRoomsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.GET_ROOMS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.GET_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createRooms Action.
   * Creates a new instance in rooms of this model.
   *
   * @param {any} id Account id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createRooms: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ROOMS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createRoomsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ROOMS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteRooms Action.
   * Deletes all rooms of this model.
   *
   * @param {any} id Account id
   * @param {any} meta (optional).
   * 
   */
  deleteRooms: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ROOMS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteRoomsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ROOMS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getAdministrations Action.
   * Queries administrations of Account.
   *
   * @param {any} id Account id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getAdministrations: class implements Action {
    public readonly type = AccountActionTypes.GET_ADMINISTRATIONS;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.GET_ADMINISTRATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.GET_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createAdministrations Action.
   * Creates a new instance in administrations of this model.
   *
   * @param {any} id Account id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createAdministrations: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ADMINISTRATIONS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ADMINISTRATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.CREATE_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteAdministrations Action.
   * Deletes all administrations of this model.
   *
   * @param {any} id Account id
   * @param {any} meta (optional).
   * 
   */
  deleteAdministrations: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ADMINISTRATIONS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ADMINISTRATIONS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.DELETE_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * login Action.
   * Login a user with username/email and password.
   *
   * @param {string} include Related objects to include in the response. See the description of return value for more details.
   *   Default value: `user`.
   *  - `rememberMe` - `boolean` - Whether the authentication credentials
   *     should be remembered in localStorage across app/browser restarts.
   *     Default: `true`.
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  login: class implements Action {
    public readonly type = AccountActionTypes.LOGIN;
      public payload: {credentials: any, include: any};

    constructor(credentials: any, include: any = 'user', rememberMe: boolean = true, customHeaders?: Function, public meta?: any) {
      this.payload = {credentials, include};
    }
  },
  /**
   * loginSuccess Action.
   * 
   * @param {any} id 
   * The response body contains properties of the AccessToken created on login.
   * Depending on the value of `include` parameter, the body may contain additional properties:
   * 
   *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
   * 
   *
   * @param {any} meta (optional).
   * 
   */
  loginSuccess: class implements Action {
    public readonly type = AccountActionTypes.LOGIN_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * loginFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  loginFail: class implements Action {
    public readonly type = AccountActionTypes.LOGIN_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * logout Action.
   * Logout a user with access token.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   * @param {any} meta (optional).
   * 
   */
  logout: class implements Action {
    public readonly type = AccountActionTypes.LOGOUT;
      
    constructor(public meta?: any) {}
  },
  /**
   * logoutSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  logoutSuccess: class implements Action {
    public readonly type = AccountActionTypes.LOGOUT_SUCCESS;
  
    constructor(public meta?: any) {}
  },
  /**
   * logoutFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  logoutFail: class implements Action {
    public readonly type = AccountActionTypes.LOGOUT_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * verify Action.
   * Trigger user's identity verification with configured verifyOptions
   *
   * @param {any} id Account id
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   * @param {any} meta (optional).
   * 
   */
  verify: class implements Action {
    public readonly type = AccountActionTypes.VERIFY;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * verifySuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  verifySuccess: class implements Action {
    public readonly type = AccountActionTypes.VERIFY_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * verifyFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  verifyFail: class implements Action {
    public readonly type = AccountActionTypes.VERIFY_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * confirm Action.
   * Confirm a user registration with identity verification token.
   *
   * @param {string} uid 
   * @param {string} token 
   * @param {string} redirect 
   * @param {any} meta (optional).
   * 
   */
  confirm: class implements Action {
    public readonly type = AccountActionTypes.CONFIRM;
      public payload: {uid: any, token: any, redirect: any};

    constructor(uid: any, token: any, redirect: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {uid, token, redirect};
    }
  },
  /**
   * confirmSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  confirmSuccess: class implements Action {
    public readonly type = AccountActionTypes.CONFIRM_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * confirmFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  confirmFail: class implements Action {
    public readonly type = AccountActionTypes.CONFIRM_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * resetPassword Action.
   * Reset password for a user with email.
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  resetPassword: class implements Action {
    public readonly type = AccountActionTypes.RESET_PASSWORD;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * resetPasswordSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  resetPasswordSuccess: class implements Action {
    public readonly type = AccountActionTypes.RESET_PASSWORD_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * resetPasswordFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  resetPasswordFail: class implements Action {
    public readonly type = AccountActionTypes.RESET_PASSWORD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * changePassword Action.
   * Change a user's password.
   *
   * @param {object} data Request data.
   *
   *  - `oldPassword` – `{string}` - 
   *
   *  - `newPassword` – `{string}` - 
   * @param {any} meta (optional).
   * 
   */
  changePassword: class implements Action {
    public readonly type = AccountActionTypes.CHANGE_PASSWORD;
      public payload: {oldPassword: any, newPassword: any};

    constructor(oldPassword: any, newPassword: any, customHeaders?: Function, public meta?: any) {
      this.payload = {oldPassword, newPassword};
    }
  },
  /**
   * changePasswordSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  changePasswordSuccess: class implements Action {
    public readonly type = AccountActionTypes.CHANGE_PASSWORD_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * changePasswordFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  changePasswordFail: class implements Action {
    public readonly type = AccountActionTypes.CHANGE_PASSWORD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * setPassword Action.
   * Reset user's password via a password-reset token.
   *
   * @param {object} data Request data.
   *
   *  - `newPassword` – `{string}` - 
   * @param {any} meta (optional).
   * 
   */
  setPassword: class implements Action {
    public readonly type = AccountActionTypes.SET_PASSWORD;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * setPasswordSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  setPasswordSuccess: class implements Action {
    public readonly type = AccountActionTypes.SET_PASSWORD_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * setPasswordFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  setPasswordFail: class implements Action {
    public readonly type = AccountActionTypes.SET_PASSWORD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyAccessTokens Action.
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id Account id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyAccessTokens: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ACCESSTOKENS;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyAccessTokensSuccess: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyAccessTokensFail: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyRooms Action.
   * Creates a new instance in rooms of this model.
   *
   * @param {any} id Account id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyRooms: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ROOMS;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyRoomsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyRoomsSuccess: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ROOMS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyRoomsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyRoomsFail: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyAdministrations Action.
   * Creates a new instance in administrations of this model.
   *
   * @param {any} id Account id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyAdministrations: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ADMINISTRATIONS;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAdministrationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyAdministrationsSuccess: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ADMINISTRATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAdministrationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyAdministrationsFail: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_ADMINISTRATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
}, {
  /**
   * Account specific actions
   */
  signup: class implements Action {
    public readonly type = AccountActionTypes.SIGNUP;

    constructor(public payload: any, public meta?: any) { }
  },

  signupSuccess: class implements Action {
    public readonly type = AccountActionTypes.SIGNUP_SUCCESS;
    public payload: {credentials: any, data: any};

    constructor(credentials: any, data: any, public meta?: any) {
      this.payload = {credentials, data};
    }
  },

  signupFail: class implements Action {
    public readonly type = AccountActionTypes.SIGNUP_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});