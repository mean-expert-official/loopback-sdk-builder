/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, User } from '../models';

export const UserActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('User'), {
  FIND_BY_ID_ACCESSTOKENS: type('[User] findByIdAccessTokens'),
  FIND_BY_ID_ACCESSTOKENS_SUCCESS: type('[User] findByIdAccessTokens success'),
  FIND_BY_ID_ACCESSTOKENS_FAIL: type('[User] findByIdAccessTokens fail'),

  DESTROY_BY_ID_ACCESSTOKENS: type('[User] destroyByIdAccessTokens'),
  DESTROY_BY_ID_ACCESSTOKENS_SUCCESS: type('[User] destroyByIdAccessTokens success'),
  DESTROY_BY_ID_ACCESSTOKENS_FAIL: type('[User] destroyByIdAccessTokens fail'),

  UPDATE_BY_ID_ACCESSTOKENS: type('[User] updateByIdAccessTokens'),
  UPDATE_BY_ID_ACCESSTOKENS_SUCCESS: type('[User] updateByIdAccessTokens success'),
  UPDATE_BY_ID_ACCESSTOKENS_FAIL: type('[User] updateByIdAccessTokens fail'),

  GET_ACCESSTOKENS: type('[User] getAccessTokens'),
  GET_ACCESSTOKENS_SUCCESS: type('[User] getAccessTokens success'),
  GET_ACCESSTOKENS_FAIL: type('[User] getAccessTokens fail'),

  CREATE_ACCESSTOKENS: type('[User] createAccessTokens'),
  CREATE_ACCESSTOKENS_SUCCESS: type('[User] createAccessTokens success'),
  CREATE_ACCESSTOKENS_FAIL: type('[User] createAccessTokens fail'),

  DELETE_ACCESSTOKENS: type('[User] deleteAccessTokens'),
  DELETE_ACCESSTOKENS_SUCCESS: type('[User] deleteAccessTokens success'),
  DELETE_ACCESSTOKENS_FAIL: type('[User] deleteAccessTokens fail'),

  LOGIN: type('[User] login'),
  LOGIN_SUCCESS: type('[User] login success'),
  LOGIN_FAIL: type('[User] login fail'),

  LOGOUT: type('[User] logout'),
  LOGOUT_SUCCESS: type('[User] logout success'),
  LOGOUT_FAIL: type('[User] logout fail'),

  VERIFY: type('[User] verify'),
  VERIFY_SUCCESS: type('[User] verify success'),
  VERIFY_FAIL: type('[User] verify fail'),

  CONFIRM: type('[User] confirm'),
  CONFIRM_SUCCESS: type('[User] confirm success'),
  CONFIRM_FAIL: type('[User] confirm fail'),

  RESET_PASSWORD: type('[User] resetPassword'),
  RESET_PASSWORD_SUCCESS: type('[User] resetPassword success'),
  RESET_PASSWORD_FAIL: type('[User] resetPassword fail'),

  CHANGE_PASSWORD: type('[User] changePassword'),
  CHANGE_PASSWORD_SUCCESS: type('[User] changePassword success'),
  CHANGE_PASSWORD_FAIL: type('[User] changePassword fail'),

  SET_PASSWORD: type('[User] setPassword'),
  SET_PASSWORD_SUCCESS: type('[User] setPassword success'),
  SET_PASSWORD_FAIL: type('[User] setPassword fail'),

  CREATE_MANY_ACCESSTOKENS: type('[User] createManyAccessTokens'),
  CREATE_MANY_ACCESSTOKENS_SUCCESS: type('[User] createManyAccessTokens success'),
  CREATE_MANY_ACCESSTOKENS_FAIL: type('[User] createManyAccessTokens fail'),

}, {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * User specific action types
   */
  SIGNUP: type('[User] Signup'),
  SIGNUP_SUCCESS: type('[User] Signup success'),
  SIGNUP_FAIL: type('[User] Signup fail'),
});
export const UserActions =
Object.assign(BaseLoopbackActionsFactory<User>(UserActionTypes), {

  /**
   * findByIdAccessTokens Action.
   * Find a related item by id for accessTokens.
   *
   * @param {any} id User id
   * @param {any} fk Foreign key for accessTokens
   * @param {any} meta (optional).
   * 
   */
  findByIdAccessTokens: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ACCESSTOKENS;
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
    public readonly type = UserActionTypes.FIND_BY_ID_ACCESSTOKENS_SUCCESS;
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
    public readonly type = UserActionTypes.FIND_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdAccessTokens Action.
   * Delete a related item by id for accessTokens.
   *
   * @param {any} id User id
   * @param {any} fk Foreign key for accessTokens
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccessTokens: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS;
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
    public readonly type = UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS_SUCCESS;
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
    public readonly type = UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdAccessTokens Action.
   * Update a related item by id for accessTokens.
   *
   * @param {any} id User id
   * @param {any} fk Foreign key for accessTokens
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccessTokens: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS;
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
    public readonly type = UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS_SUCCESS;
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
    public readonly type = UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getAccessTokens Action.
   * Queries accessTokens of User.
   *
   * @param {any} id User id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getAccessTokens: class implements Action {
    public readonly type = UserActionTypes.GET_ACCESSTOKENS;
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
    public readonly type = UserActionTypes.GET_ACCESSTOKENS_SUCCESS;
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
    public readonly type = UserActionTypes.GET_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createAccessTokens Action.
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id User id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createAccessTokens: class implements Action {
    public readonly type = UserActionTypes.CREATE_ACCESSTOKENS;
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
    public readonly type = UserActionTypes.CREATE_ACCESSTOKENS_SUCCESS;
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
    public readonly type = UserActionTypes.CREATE_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteAccessTokens Action.
   * Deletes all accessTokens of this model.
   *
   * @param {any} id User id
   * @param {any} meta (optional).
   * 
   */
  deleteAccessTokens: class implements Action {
    public readonly type = UserActionTypes.DELETE_ACCESSTOKENS;
      
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
    public readonly type = UserActionTypes.DELETE_ACCESSTOKENS_SUCCESS;
  
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
    public readonly type = UserActionTypes.DELETE_ACCESSTOKENS_FAIL;

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
    public readonly type = UserActionTypes.LOGIN;
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
    public readonly type = UserActionTypes.LOGIN_SUCCESS;
  
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
    public readonly type = UserActionTypes.LOGIN_FAIL;

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
    public readonly type = UserActionTypes.LOGOUT;
      
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
    public readonly type = UserActionTypes.LOGOUT_SUCCESS;
  
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
    public readonly type = UserActionTypes.LOGOUT_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * verify Action.
   * Trigger user's identity verification with configured verifyOptions
   *
   * @param {any} id User id
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   * @param {any} meta (optional).
   * 
   */
  verify: class implements Action {
    public readonly type = UserActionTypes.VERIFY;
      
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
    public readonly type = UserActionTypes.VERIFY_SUCCESS;
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
    public readonly type = UserActionTypes.VERIFY_FAIL;

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
    public readonly type = UserActionTypes.CONFIRM;
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
    public readonly type = UserActionTypes.CONFIRM_SUCCESS;
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
    public readonly type = UserActionTypes.CONFIRM_FAIL;

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
    public readonly type = UserActionTypes.RESET_PASSWORD;
      
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
    public readonly type = UserActionTypes.RESET_PASSWORD_SUCCESS;
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
    public readonly type = UserActionTypes.RESET_PASSWORD_FAIL;

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
    public readonly type = UserActionTypes.CHANGE_PASSWORD;
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
    public readonly type = UserActionTypes.CHANGE_PASSWORD_SUCCESS;
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
    public readonly type = UserActionTypes.CHANGE_PASSWORD_FAIL;

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
    public readonly type = UserActionTypes.SET_PASSWORD;
      
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
    public readonly type = UserActionTypes.SET_PASSWORD_SUCCESS;
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
    public readonly type = UserActionTypes.SET_PASSWORD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyAccessTokens Action.
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id User id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyAccessTokens: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ACCESSTOKENS;
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
    public readonly type = UserActionTypes.CREATE_MANY_ACCESSTOKENS_SUCCESS;
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
    public readonly type = UserActionTypes.CREATE_MANY_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
}, {
  /**
   * User specific actions
   */
  signup: class implements Action {
    public readonly type = UserActionTypes.SIGNUP;

    constructor(public payload: any, public meta?: any) { }
  },

  signupSuccess: class implements Action {
    public readonly type = UserActionTypes.SIGNUP_SUCCESS;
    public payload: {credentials: any, data: any};

    constructor(credentials: any, data: any, public meta?: any) {
      this.payload = {credentials, data};
    }
  },

  signupFail: class implements Action {
    public readonly type = UserActionTypes.SIGNUP_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});