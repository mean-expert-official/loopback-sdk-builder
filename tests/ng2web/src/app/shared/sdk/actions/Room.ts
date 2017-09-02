/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Room } from '../models';

export const RoomActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Room'), {
  FIND_BY_ID_MESSAGES: type('[Room] findByIdMessages'),
  FIND_BY_ID_MESSAGES_SUCCESS: type('[Room] findByIdMessages success'),
  FIND_BY_ID_MESSAGES_FAIL: type('[Room] findByIdMessages fail'),

  DESTROY_BY_ID_MESSAGES: type('[Room] destroyByIdMessages'),
  DESTROY_BY_ID_MESSAGES_SUCCESS: type('[Room] destroyByIdMessages success'),
  DESTROY_BY_ID_MESSAGES_FAIL: type('[Room] destroyByIdMessages fail'),

  UPDATE_BY_ID_MESSAGES: type('[Room] updateByIdMessages'),
  UPDATE_BY_ID_MESSAGES_SUCCESS: type('[Room] updateByIdMessages success'),
  UPDATE_BY_ID_MESSAGES_FAIL: type('[Room] updateByIdMessages fail'),

  FIND_BY_ID_LIKES: type('[Room] findByIdLikes'),
  FIND_BY_ID_LIKES_SUCCESS: type('[Room] findByIdLikes success'),
  FIND_BY_ID_LIKES_FAIL: type('[Room] findByIdLikes fail'),

  DESTROY_BY_ID_LIKES: type('[Room] destroyByIdLikes'),
  DESTROY_BY_ID_LIKES_SUCCESS: type('[Room] destroyByIdLikes success'),
  DESTROY_BY_ID_LIKES_FAIL: type('[Room] destroyByIdLikes fail'),

  UPDATE_BY_ID_LIKES: type('[Room] updateByIdLikes'),
  UPDATE_BY_ID_LIKES_SUCCESS: type('[Room] updateByIdLikes success'),
  UPDATE_BY_ID_LIKES_FAIL: type('[Room] updateByIdLikes fail'),

  FIND_BY_ID_CATEGORIES: type('[Room] findByIdCategories'),
  FIND_BY_ID_CATEGORIES_SUCCESS: type('[Room] findByIdCategories success'),
  FIND_BY_ID_CATEGORIES_FAIL: type('[Room] findByIdCategories fail'),

  DESTROY_BY_ID_CATEGORIES: type('[Room] destroyByIdCategories'),
  DESTROY_BY_ID_CATEGORIES_SUCCESS: type('[Room] destroyByIdCategories success'),
  DESTROY_BY_ID_CATEGORIES_FAIL: type('[Room] destroyByIdCategories fail'),

  UPDATE_BY_ID_CATEGORIES: type('[Room] updateByIdCategories'),
  UPDATE_BY_ID_CATEGORIES_SUCCESS: type('[Room] updateByIdCategories success'),
  UPDATE_BY_ID_CATEGORIES_FAIL: type('[Room] updateByIdCategories fail'),

  LINK_CATEGORIES: type('[Room] linkCategories'),
  LINK_CATEGORIES_SUCCESS: type('[Room] linkCategories success'),
  LINK_CATEGORIES_FAIL: type('[Room] linkCategories fail'),

  UNLINK_CATEGORIES: type('[Room] unlinkCategories'),
  UNLINK_CATEGORIES_SUCCESS: type('[Room] unlinkCategories success'),
  UNLINK_CATEGORIES_FAIL: type('[Room] unlinkCategories fail'),

  FIND_BY_ID_ACCOUNTS: type('[Room] findByIdAccounts'),
  FIND_BY_ID_ACCOUNTS_SUCCESS: type('[Room] findByIdAccounts success'),
  FIND_BY_ID_ACCOUNTS_FAIL: type('[Room] findByIdAccounts fail'),

  DESTROY_BY_ID_ACCOUNTS: type('[Room] destroyByIdAccounts'),
  DESTROY_BY_ID_ACCOUNTS_SUCCESS: type('[Room] destroyByIdAccounts success'),
  DESTROY_BY_ID_ACCOUNTS_FAIL: type('[Room] destroyByIdAccounts fail'),

  UPDATE_BY_ID_ACCOUNTS: type('[Room] updateByIdAccounts'),
  UPDATE_BY_ID_ACCOUNTS_SUCCESS: type('[Room] updateByIdAccounts success'),
  UPDATE_BY_ID_ACCOUNTS_FAIL: type('[Room] updateByIdAccounts fail'),

  LINK_ACCOUNTS: type('[Room] linkAccounts'),
  LINK_ACCOUNTS_SUCCESS: type('[Room] linkAccounts success'),
  LINK_ACCOUNTS_FAIL: type('[Room] linkAccounts fail'),

  UNLINK_ACCOUNTS: type('[Room] unlinkAccounts'),
  UNLINK_ACCOUNTS_SUCCESS: type('[Room] unlinkAccounts success'),
  UNLINK_ACCOUNTS_FAIL: type('[Room] unlinkAccounts fail'),

  FIND_BY_ID_ADMINS: type('[Room] findByIdAdmins'),
  FIND_BY_ID_ADMINS_SUCCESS: type('[Room] findByIdAdmins success'),
  FIND_BY_ID_ADMINS_FAIL: type('[Room] findByIdAdmins fail'),

  DESTROY_BY_ID_ADMINS: type('[Room] destroyByIdAdmins'),
  DESTROY_BY_ID_ADMINS_SUCCESS: type('[Room] destroyByIdAdmins success'),
  DESTROY_BY_ID_ADMINS_FAIL: type('[Room] destroyByIdAdmins fail'),

  UPDATE_BY_ID_ADMINS: type('[Room] updateByIdAdmins'),
  UPDATE_BY_ID_ADMINS_SUCCESS: type('[Room] updateByIdAdmins success'),
  UPDATE_BY_ID_ADMINS_FAIL: type('[Room] updateByIdAdmins fail'),

  LINK_ADMINS: type('[Room] linkAdmins'),
  LINK_ADMINS_SUCCESS: type('[Room] linkAdmins success'),
  LINK_ADMINS_FAIL: type('[Room] linkAdmins fail'),

  UNLINK_ADMINS: type('[Room] unlinkAdmins'),
  UNLINK_ADMINS_SUCCESS: type('[Room] unlinkAdmins success'),
  UNLINK_ADMINS_FAIL: type('[Room] unlinkAdmins fail'),

  GET_MESSAGES: type('[Room] getMessages'),
  GET_MESSAGES_SUCCESS: type('[Room] getMessages success'),
  GET_MESSAGES_FAIL: type('[Room] getMessages fail'),

  CREATE_MESSAGES: type('[Room] createMessages'),
  CREATE_MESSAGES_SUCCESS: type('[Room] createMessages success'),
  CREATE_MESSAGES_FAIL: type('[Room] createMessages fail'),

  DELETE_MESSAGES: type('[Room] deleteMessages'),
  DELETE_MESSAGES_SUCCESS: type('[Room] deleteMessages success'),
  DELETE_MESSAGES_FAIL: type('[Room] deleteMessages fail'),

  GET_LIKES: type('[Room] getLikes'),
  GET_LIKES_SUCCESS: type('[Room] getLikes success'),
  GET_LIKES_FAIL: type('[Room] getLikes fail'),

  CREATE_LIKES: type('[Room] createLikes'),
  CREATE_LIKES_SUCCESS: type('[Room] createLikes success'),
  CREATE_LIKES_FAIL: type('[Room] createLikes fail'),

  DELETE_LIKES: type('[Room] deleteLikes'),
  DELETE_LIKES_SUCCESS: type('[Room] deleteLikes success'),
  DELETE_LIKES_FAIL: type('[Room] deleteLikes fail'),

  GET_CATEGORIES: type('[Room] getCategories'),
  GET_CATEGORIES_SUCCESS: type('[Room] getCategories success'),
  GET_CATEGORIES_FAIL: type('[Room] getCategories fail'),

  CREATE_CATEGORIES: type('[Room] createCategories'),
  CREATE_CATEGORIES_SUCCESS: type('[Room] createCategories success'),
  CREATE_CATEGORIES_FAIL: type('[Room] createCategories fail'),

  DELETE_CATEGORIES: type('[Room] deleteCategories'),
  DELETE_CATEGORIES_SUCCESS: type('[Room] deleteCategories success'),
  DELETE_CATEGORIES_FAIL: type('[Room] deleteCategories fail'),

  GET_ACCOUNTS: type('[Room] getAccounts'),
  GET_ACCOUNTS_SUCCESS: type('[Room] getAccounts success'),
  GET_ACCOUNTS_FAIL: type('[Room] getAccounts fail'),

  CREATE_ACCOUNTS: type('[Room] createAccounts'),
  CREATE_ACCOUNTS_SUCCESS: type('[Room] createAccounts success'),
  CREATE_ACCOUNTS_FAIL: type('[Room] createAccounts fail'),

  DELETE_ACCOUNTS: type('[Room] deleteAccounts'),
  DELETE_ACCOUNTS_SUCCESS: type('[Room] deleteAccounts success'),
  DELETE_ACCOUNTS_FAIL: type('[Room] deleteAccounts fail'),

  GET_ADMINS: type('[Room] getAdmins'),
  GET_ADMINS_SUCCESS: type('[Room] getAdmins success'),
  GET_ADMINS_FAIL: type('[Room] getAdmins fail'),

  CREATE_ADMINS: type('[Room] createAdmins'),
  CREATE_ADMINS_SUCCESS: type('[Room] createAdmins success'),
  CREATE_ADMINS_FAIL: type('[Room] createAdmins fail'),

  DELETE_ADMINS: type('[Room] deleteAdmins'),
  DELETE_ADMINS_SUCCESS: type('[Room] deleteAdmins success'),
  DELETE_ADMINS_FAIL: type('[Room] deleteAdmins fail'),

  GREET_ROUTE: type('[Room] greetRoute'),
  GREET_ROUTE_SUCCESS: type('[Room] greetRoute success'),
  GREET_ROUTE_FAIL: type('[Room] greetRoute fail'),

  GREET_GET: type('[Room] greetGet'),
  GREET_GET_SUCCESS: type('[Room] greetGet success'),
  GREET_GET_FAIL: type('[Room] greetGet fail'),

  GREET_POST: type('[Room] greetPost'),
  GREET_POST_SUCCESS: type('[Room] greetPost success'),
  GREET_POST_FAIL: type('[Room] greetPost fail'),

  FIND_BY_ROOM: type('[Room] findByRoom'),
  FIND_BY_ROOM_SUCCESS: type('[Room] findByRoom success'),
  FIND_BY_ROOM_FAIL: type('[Room] findByRoom fail'),

  FIND_BY_ROOM_CONTEXT: type('[Room] findByRoomContext'),
  FIND_BY_ROOM_CONTEXT_SUCCESS: type('[Room] findByRoomContext success'),
  FIND_BY_ROOM_CONTEXT_FAIL: type('[Room] findByRoomContext fail'),

  SINGLE_PARAM_POST: type('[Room] singleParamPost'),
  SINGLE_PARAM_POST_SUCCESS: type('[Room] singleParamPost success'),
  SINGLE_PARAM_POST_FAIL: type('[Room] singleParamPost fail'),

  GET_PROPERTY_VALUES: type('[Room] getPropertyValues'),
  GET_PROPERTY_VALUES_SUCCESS: type('[Room] getPropertyValues success'),
  GET_PROPERTY_VALUES_FAIL: type('[Room] getPropertyValues fail'),

  CREATE_MANY_MESSAGES: type('[Room] createManyMessages'),
  CREATE_MANY_MESSAGES_SUCCESS: type('[Room] createManyMessages success'),
  CREATE_MANY_MESSAGES_FAIL: type('[Room] createManyMessages fail'),

  CREATE_MANY_LIKES: type('[Room] createManyLikes'),
  CREATE_MANY_LIKES_SUCCESS: type('[Room] createManyLikes success'),
  CREATE_MANY_LIKES_FAIL: type('[Room] createManyLikes fail'),

  CREATE_MANY_CATEGORIES: type('[Room] createManyCategories'),
  CREATE_MANY_CATEGORIES_SUCCESS: type('[Room] createManyCategories success'),
  CREATE_MANY_CATEGORIES_FAIL: type('[Room] createManyCategories fail'),

  CREATE_MANY_ACCOUNTS: type('[Room] createManyAccounts'),
  CREATE_MANY_ACCOUNTS_SUCCESS: type('[Room] createManyAccounts success'),
  CREATE_MANY_ACCOUNTS_FAIL: type('[Room] createManyAccounts fail'),

  CREATE_MANY_ADMINS: type('[Room] createManyAdmins'),
  CREATE_MANY_ADMINS_SUCCESS: type('[Room] createManyAdmins success'),
  CREATE_MANY_ADMINS_FAIL: type('[Room] createManyAdmins fail'),

});
export const RoomActions =
Object.assign(BaseLoopbackActionsFactory<Room>(RoomActionTypes), {

  /**
   * findByIdMessages Action.
   * Find a related item by id for messages.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for messages
   * @param {any} meta (optional).
   * 
   */
  findByIdMessages: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_MESSAGES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdMessagesSuccess: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdMessagesFail: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdMessages Action.
   * Delete a related item by id for messages.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for messages
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMessages: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_MESSAGES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdMessagesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMessagesSuccess: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_MESSAGES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMessagesFail: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdMessages Action.
   * Update a related item by id for messages.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for messages
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdMessages: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_MESSAGES;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdMessagesSuccess: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdMessagesFail: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdLikes Action.
   * Find a related item by id for likes.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for likes
   * @param {any} meta (optional).
   * 
   */
  findByIdLikes: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_LIKES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdLikesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdLikesSuccess: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_LIKES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdLikesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdLikesFail: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdLikes Action.
   * Delete a related item by id for likes.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for likes
   * @param {any} meta (optional).
   * 
   */
  destroyByIdLikes: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_LIKES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdLikesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdLikesSuccess: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_LIKES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdLikesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdLikesFail: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdLikes Action.
   * Update a related item by id for likes.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for likes
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdLikes: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_LIKES;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdLikesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdLikesSuccess: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_LIKES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdLikesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdLikesFail: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdCategories Action.
   * Find a related item by id for categories.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for categories
   * @param {any} meta (optional).
   * 
   */
  findByIdCategories: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_CATEGORIES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdCategories Action.
   * Delete a related item by id for categories.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for categories
   * @param {any} meta (optional).
   * 
   */
  destroyByIdCategories: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_CATEGORIES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdCategoriesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_CATEGORIES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdCategories Action.
   * Update a related item by id for categories.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for categories
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdCategories: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_CATEGORIES;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkCategories Action.
   * Add a related item by id for categories.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for categories
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkCategories: class implements Action {
    public readonly type = RoomActionTypes.LINK_CATEGORIES;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * linkCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.LINK_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.LINK_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkCategories Action.
   * Remove the categories relation to an item by id.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for categories
   * @param {any} meta (optional).
   * 
   */
  unlinkCategories: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_CATEGORIES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkCategoriesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_CATEGORIES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdAccounts Action.
   * Find a related item by id for accounts.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for accounts
   * @param {any} meta (optional).
   * 
   */
  findByIdAccounts: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_ACCOUNTS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdAccountsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_ACCOUNTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdAccounts Action.
   * Delete a related item by id for accounts.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for accounts
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccounts: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_ACCOUNTS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAccountsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_ACCOUNTS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdAccounts Action.
   * Update a related item by id for accounts.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for accounts
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccounts: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_ACCOUNTS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdAccountsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_ACCOUNTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkAccounts Action.
   * Add a related item by id for accounts.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for accounts
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkAccounts: class implements Action {
    public readonly type = RoomActionTypes.LINK_ACCOUNTS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * linkAccountsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.LINK_ACCOUNTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.LINK_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkAccounts Action.
   * Remove the accounts relation to an item by id.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for accounts
   * @param {any} meta (optional).
   * 
   */
  unlinkAccounts: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_ACCOUNTS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkAccountsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_ACCOUNTS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdAdmins Action.
   * Find a related item by id for admins.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for admins
   * @param {any} meta (optional).
   * 
   */
  findByIdAdmins: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_ADMINS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdAdminsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_ADMINS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ID_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdAdmins Action.
   * Delete a related item by id for admins.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for admins
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAdmins: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_ADMINS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAdminsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_ADMINS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.DESTROY_BY_ID_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdAdmins Action.
   * Update a related item by id for admins.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for admins
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdAdmins: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_ADMINS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdAdminsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_ADMINS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.UPDATE_BY_ID_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkAdmins Action.
   * Add a related item by id for admins.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for admins
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkAdmins: class implements Action {
    public readonly type = RoomActionTypes.LINK_ADMINS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * linkAdminsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.LINK_ADMINS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.LINK_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkAdmins Action.
   * Remove the admins relation to an item by id.
   *
   * @param {any} id Room id
   * @param {any} fk Foreign key for admins
   * @param {any} meta (optional).
   * 
   */
  unlinkAdmins: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_ADMINS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkAdminsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_ADMINS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.UNLINK_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getMessages Action.
   * Queries messages of Room.
   *
   * @param {any} id Room id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getMessages: class implements Action {
    public readonly type = RoomActionTypes.GET_MESSAGES;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getMessagesSuccess: class implements Action {
    public readonly type = RoomActionTypes.GET_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getMessagesFail: class implements Action {
    public readonly type = RoomActionTypes.GET_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createMessages Action.
   * Creates a new instance in messages of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createMessages: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MESSAGES;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createMessagesSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createMessagesFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteMessages Action.
   * Deletes all messages of this model.
   *
   * @param {any} id Room id
   * @param {any} meta (optional).
   * 
   */
  deleteMessages: class implements Action {
    public readonly type = RoomActionTypes.DELETE_MESSAGES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteMessagesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteMessagesSuccess: class implements Action {
    public readonly type = RoomActionTypes.DELETE_MESSAGES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteMessagesFail: class implements Action {
    public readonly type = RoomActionTypes.DELETE_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getLikes Action.
   * Queries likes of Room.
   *
   * @param {any} id Room id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getLikes: class implements Action {
    public readonly type = RoomActionTypes.GET_LIKES;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getLikesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getLikesSuccess: class implements Action {
    public readonly type = RoomActionTypes.GET_LIKES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getLikesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getLikesFail: class implements Action {
    public readonly type = RoomActionTypes.GET_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createLikes Action.
   * Creates a new instance in likes of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createLikes: class implements Action {
    public readonly type = RoomActionTypes.CREATE_LIKES;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createLikesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createLikesSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_LIKES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createLikesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createLikesFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteLikes Action.
   * Deletes all likes of this model.
   *
   * @param {any} id Room id
   * @param {any} meta (optional).
   * 
   */
  deleteLikes: class implements Action {
    public readonly type = RoomActionTypes.DELETE_LIKES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteLikesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteLikesSuccess: class implements Action {
    public readonly type = RoomActionTypes.DELETE_LIKES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteLikesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteLikesFail: class implements Action {
    public readonly type = RoomActionTypes.DELETE_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getCategories Action.
   * Queries categories of Room.
   *
   * @param {any} id Room id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getCategories: class implements Action {
    public readonly type = RoomActionTypes.GET_CATEGORIES;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.GET_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.GET_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createCategories Action.
   * Creates a new instance in categories of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createCategories: class implements Action {
    public readonly type = RoomActionTypes.CREATE_CATEGORIES;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteCategories Action.
   * Deletes all categories of this model.
   *
   * @param {any} id Room id
   * @param {any} meta (optional).
   * 
   */
  deleteCategories: class implements Action {
    public readonly type = RoomActionTypes.DELETE_CATEGORIES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteCategoriesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.DELETE_CATEGORIES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.DELETE_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getAccounts Action.
   * Queries accounts of Room.
   *
   * @param {any} id Room id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getAccounts: class implements Action {
    public readonly type = RoomActionTypes.GET_ACCOUNTS;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getAccountsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.GET_ACCOUNTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.GET_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createAccounts Action.
   * Creates a new instance in accounts of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createAccounts: class implements Action {
    public readonly type = RoomActionTypes.CREATE_ACCOUNTS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAccountsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_ACCOUNTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteAccounts Action.
   * Deletes all accounts of this model.
   *
   * @param {any} id Room id
   * @param {any} meta (optional).
   * 
   */
  deleteAccounts: class implements Action {
    public readonly type = RoomActionTypes.DELETE_ACCOUNTS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAccountsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.DELETE_ACCOUNTS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.DELETE_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getAdmins Action.
   * Queries admins of Room.
   *
   * @param {any} id Room id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getAdmins: class implements Action {
    public readonly type = RoomActionTypes.GET_ADMINS;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getAdminsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.GET_ADMINS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.GET_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createAdmins Action.
   * Creates a new instance in admins of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createAdmins: class implements Action {
    public readonly type = RoomActionTypes.CREATE_ADMINS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAdminsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_ADMINS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteAdmins Action.
   * Deletes all admins of this model.
   *
   * @param {any} id Room id
   * @param {any} meta (optional).
   * 
   */
  deleteAdmins: class implements Action {
    public readonly type = RoomActionTypes.DELETE_ADMINS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAdminsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.DELETE_ADMINS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.DELETE_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * greetRoute Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} a 
   * @param {string} b 
   * @param {string} c 
   * @param {any} meta (optional).
   * 
   */
  greetRoute: class implements Action {
    public readonly type = RoomActionTypes.GREET_ROUTE;
      public payload: {a: any, b: any, c: any};

    constructor(a: any = {}, b: any = {}, c: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {a, b, c};
    }
  },
  /**
   * greetRouteSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `greeting` – `{string}` - 
   * @param {any} meta (optional).
   * 
   */
  greetRouteSuccess: class implements Action {
    public readonly type = RoomActionTypes.GREET_ROUTE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * greetRouteFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  greetRouteFail: class implements Action {
    public readonly type = RoomActionTypes.GREET_ROUTE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * greetGet Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} a 
   * @param {string} b 
   * @param {string} c 
   * @param {any} meta (optional).
   * 
   */
  greetGet: class implements Action {
    public readonly type = RoomActionTypes.GREET_GET;
      public payload: {a: any, b: any, c: any};

    constructor(a: any = {}, b: any = {}, c: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {a, b, c};
    }
  },
  /**
   * greetGetSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `greeting` – `{string}` - 
   * @param {any} meta (optional).
   * 
   */
  greetGetSuccess: class implements Action {
    public readonly type = RoomActionTypes.GREET_GET_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * greetGetFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  greetGetFail: class implements Action {
    public readonly type = RoomActionTypes.GREET_GET_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * greetPost Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `a` – `{object}` - 
   *
   *  - `b` – `{object}` - 
   *
   *  - `c` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  greetPost: class implements Action {
    public readonly type = RoomActionTypes.GREET_POST;
      public payload: {a: any, b: any, c: any};

    constructor(a: any = {}, b: any = {}, c: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {a, b, c};
    }
  },
  /**
   * greetPostSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `greeting` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  greetPostSuccess: class implements Action {
    public readonly type = RoomActionTypes.GREET_POST_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * greetPostFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  greetPostFail: class implements Action {
    public readonly type = RoomActionTypes.GREET_POST_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByRoom Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  findByRoom: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ROOM;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * findByRoomSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByRoomSuccess: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ROOM_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByRoomFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByRoomFail: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ROOM_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByRoomContext Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `room` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  findByRoomContext: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ROOM_CONTEXT;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * findByRoomContextSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByRoomContextSuccess: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ROOM_CONTEXT_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByRoomContextFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByRoomContextFail: class implements Action {
    public readonly type = RoomActionTypes.FIND_BY_ROOM_CONTEXT_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * singleParamPost Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  singleParamPost: class implements Action {
    public readonly type = RoomActionTypes.SINGLE_PARAM_POST;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * singleParamPostSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  singleParamPostSuccess: class implements Action {
    public readonly type = RoomActionTypes.SINGLE_PARAM_POST_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * singleParamPostFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  singleParamPostFail: class implements Action {
    public readonly type = RoomActionTypes.SINGLE_PARAM_POST_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getPropertyValues Action.
   * Gets list of all unique values used for a given property.
   *
   * @param {string} property Property name to lookup values for.
   * @param {object} filter Filter defining fields, where, include, order, offset, and limit
   * @param {any} meta (optional).
   * 
   */
  getPropertyValues: class implements Action {
    public readonly type = RoomActionTypes.GET_PROPERTY_VALUES;
      public payload: {property: any, filter: LoopBackFilter};

    constructor(property: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {property, filter};
    }
  },
  /**
   * getPropertyValuesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getPropertyValuesSuccess: class implements Action {
    public readonly type = RoomActionTypes.GET_PROPERTY_VALUES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getPropertyValuesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getPropertyValuesFail: class implements Action {
    public readonly type = RoomActionTypes.GET_PROPERTY_VALUES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyMessages Action.
   * Creates a new instance in messages of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyMessages: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_MESSAGES;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyMessagesSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyMessagesFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyLikes Action.
   * Creates a new instance in likes of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyLikes: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_LIKES;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyLikesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyLikesSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_LIKES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyLikesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyLikesFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyCategories Action.
   * Creates a new instance in categories of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyCategories: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_CATEGORIES;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyCategoriesSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyCategoriesFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyAccounts Action.
   * Creates a new instance in accounts of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyAccounts: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_ACCOUNTS;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAccountsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyAccountsSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_ACCOUNTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAccountsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyAccountsFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_ACCOUNTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyAdmins Action.
   * Creates a new instance in admins of this model.
   *
   * @param {any} id Room id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyAdmins: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_ADMINS;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAdminsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyAdminsSuccess: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_ADMINS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAdminsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyAdminsFail: class implements Action {
    public readonly type = RoomActionTypes.CREATE_MANY_ADMINS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});