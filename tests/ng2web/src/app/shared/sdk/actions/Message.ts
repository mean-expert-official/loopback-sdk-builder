/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Message } from '../models';

export const MessageActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Message'), {
  FIND_BY_ID_LIKES: type('[Message] findByIdLikes'),
  FIND_BY_ID_LIKES_SUCCESS: type('[Message] findByIdLikes success'),
  FIND_BY_ID_LIKES_FAIL: type('[Message] findByIdLikes fail'),

  DESTROY_BY_ID_LIKES: type('[Message] destroyByIdLikes'),
  DESTROY_BY_ID_LIKES_SUCCESS: type('[Message] destroyByIdLikes success'),
  DESTROY_BY_ID_LIKES_FAIL: type('[Message] destroyByIdLikes fail'),

  UPDATE_BY_ID_LIKES: type('[Message] updateByIdLikes'),
  UPDATE_BY_ID_LIKES_SUCCESS: type('[Message] updateByIdLikes success'),
  UPDATE_BY_ID_LIKES_FAIL: type('[Message] updateByIdLikes fail'),

  FIND_BY_ID_REPLIES: type('[Message] findByIdReplies'),
  FIND_BY_ID_REPLIES_SUCCESS: type('[Message] findByIdReplies success'),
  FIND_BY_ID_REPLIES_FAIL: type('[Message] findByIdReplies fail'),

  DESTROY_BY_ID_REPLIES: type('[Message] destroyByIdReplies'),
  DESTROY_BY_ID_REPLIES_SUCCESS: type('[Message] destroyByIdReplies success'),
  DESTROY_BY_ID_REPLIES_FAIL: type('[Message] destroyByIdReplies fail'),

  UPDATE_BY_ID_REPLIES: type('[Message] updateByIdReplies'),
  UPDATE_BY_ID_REPLIES_SUCCESS: type('[Message] updateByIdReplies success'),
  UPDATE_BY_ID_REPLIES_FAIL: type('[Message] updateByIdReplies fail'),

  GET_PARENT: type('[Message] getParent'),
  GET_PARENT_SUCCESS: type('[Message] getParent success'),
  GET_PARENT_FAIL: type('[Message] getParent fail'),

  GET_ROOM: type('[Message] getRoom'),
  GET_ROOM_SUCCESS: type('[Message] getRoom success'),
  GET_ROOM_FAIL: type('[Message] getRoom fail'),

  GET_LIKES: type('[Message] getLikes'),
  GET_LIKES_SUCCESS: type('[Message] getLikes success'),
  GET_LIKES_FAIL: type('[Message] getLikes fail'),

  CREATE_LIKES: type('[Message] createLikes'),
  CREATE_LIKES_SUCCESS: type('[Message] createLikes success'),
  CREATE_LIKES_FAIL: type('[Message] createLikes fail'),

  DELETE_LIKES: type('[Message] deleteLikes'),
  DELETE_LIKES_SUCCESS: type('[Message] deleteLikes success'),
  DELETE_LIKES_FAIL: type('[Message] deleteLikes fail'),

  GET_REPLIES: type('[Message] getReplies'),
  GET_REPLIES_SUCCESS: type('[Message] getReplies success'),
  GET_REPLIES_FAIL: type('[Message] getReplies fail'),

  CREATE_REPLIES: type('[Message] createReplies'),
  CREATE_REPLIES_SUCCESS: type('[Message] createReplies success'),
  CREATE_REPLIES_FAIL: type('[Message] createReplies fail'),

  DELETE_REPLIES: type('[Message] deleteReplies'),
  DELETE_REPLIES_SUCCESS: type('[Message] deleteReplies success'),
  DELETE_REPLIES_FAIL: type('[Message] deleteReplies fail'),

  CREATE_MANY_LIKES: type('[Message] createManyLikes'),
  CREATE_MANY_LIKES_SUCCESS: type('[Message] createManyLikes success'),
  CREATE_MANY_LIKES_FAIL: type('[Message] createManyLikes fail'),

  CREATE_MANY_REPLIES: type('[Message] createManyReplies'),
  CREATE_MANY_REPLIES_SUCCESS: type('[Message] createManyReplies success'),
  CREATE_MANY_REPLIES_FAIL: type('[Message] createManyReplies fail'),

});
export const MessageActions =
Object.assign(BaseLoopbackActionsFactory<Message>(MessageActionTypes), {

  /**
   * findByIdLikes Action.
   * Find a related item by id for likes.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for likes
   * @param {any} meta (optional).
   * 
   */
  findByIdLikes: class implements Action {
    public readonly type = MessageActionTypes.FIND_BY_ID_LIKES;
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
    public readonly type = MessageActionTypes.FIND_BY_ID_LIKES_SUCCESS;
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
    public readonly type = MessageActionTypes.FIND_BY_ID_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdLikes Action.
   * Delete a related item by id for likes.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for likes
   * @param {any} meta (optional).
   * 
   */
  destroyByIdLikes: class implements Action {
    public readonly type = MessageActionTypes.DESTROY_BY_ID_LIKES;
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
    public readonly type = MessageActionTypes.DESTROY_BY_ID_LIKES_SUCCESS;
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
    public readonly type = MessageActionTypes.DESTROY_BY_ID_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdLikes Action.
   * Update a related item by id for likes.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for likes
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdLikes: class implements Action {
    public readonly type = MessageActionTypes.UPDATE_BY_ID_LIKES;
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
    public readonly type = MessageActionTypes.UPDATE_BY_ID_LIKES_SUCCESS;
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
    public readonly type = MessageActionTypes.UPDATE_BY_ID_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdReplies Action.
   * Find a related item by id for replies.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for replies
   * @param {any} meta (optional).
   * 
   */
  findByIdReplies: class implements Action {
    public readonly type = MessageActionTypes.FIND_BY_ID_REPLIES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdRepliesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdRepliesSuccess: class implements Action {
    public readonly type = MessageActionTypes.FIND_BY_ID_REPLIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdRepliesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdRepliesFail: class implements Action {
    public readonly type = MessageActionTypes.FIND_BY_ID_REPLIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdReplies Action.
   * Delete a related item by id for replies.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for replies
   * @param {any} meta (optional).
   * 
   */
  destroyByIdReplies: class implements Action {
    public readonly type = MessageActionTypes.DESTROY_BY_ID_REPLIES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdRepliesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRepliesSuccess: class implements Action {
    public readonly type = MessageActionTypes.DESTROY_BY_ID_REPLIES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdRepliesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRepliesFail: class implements Action {
    public readonly type = MessageActionTypes.DESTROY_BY_ID_REPLIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdReplies Action.
   * Update a related item by id for replies.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for replies
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdReplies: class implements Action {
    public readonly type = MessageActionTypes.UPDATE_BY_ID_REPLIES;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdRepliesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdRepliesSuccess: class implements Action {
    public readonly type = MessageActionTypes.UPDATE_BY_ID_REPLIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdRepliesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdRepliesFail: class implements Action {
    public readonly type = MessageActionTypes.UPDATE_BY_ID_REPLIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getParent Action.
   * Fetches belongsTo relation parent.
   *
   * @param {any} id Message id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getParent: class implements Action {
    public readonly type = MessageActionTypes.GET_PARENT;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getParentSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getParentSuccess: class implements Action {
    public readonly type = MessageActionTypes.GET_PARENT_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getParentFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getParentFail: class implements Action {
    public readonly type = MessageActionTypes.GET_PARENT_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getRoom Action.
   * Fetches belongsTo relation room.
   *
   * @param {any} id Message id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getRoom: class implements Action {
    public readonly type = MessageActionTypes.GET_ROOM;
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
    public readonly type = MessageActionTypes.GET_ROOM_SUCCESS;
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
    public readonly type = MessageActionTypes.GET_ROOM_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getLikes Action.
   * Queries likes of Message.
   *
   * @param {any} id Message id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getLikes: class implements Action {
    public readonly type = MessageActionTypes.GET_LIKES;
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
    public readonly type = MessageActionTypes.GET_LIKES_SUCCESS;
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
    public readonly type = MessageActionTypes.GET_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createLikes Action.
   * Creates a new instance in likes of this model.
   *
   * @param {any} id Message id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createLikes: class implements Action {
    public readonly type = MessageActionTypes.CREATE_LIKES;
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
    public readonly type = MessageActionTypes.CREATE_LIKES_SUCCESS;
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
    public readonly type = MessageActionTypes.CREATE_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteLikes Action.
   * Deletes all likes of this model.
   *
   * @param {any} id Message id
   * @param {any} meta (optional).
   * 
   */
  deleteLikes: class implements Action {
    public readonly type = MessageActionTypes.DELETE_LIKES;
      
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
    public readonly type = MessageActionTypes.DELETE_LIKES_SUCCESS;
  
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
    public readonly type = MessageActionTypes.DELETE_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getReplies Action.
   * Queries replies of Message.
   *
   * @param {any} id Message id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getReplies: class implements Action {
    public readonly type = MessageActionTypes.GET_REPLIES;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getRepliesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getRepliesSuccess: class implements Action {
    public readonly type = MessageActionTypes.GET_REPLIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getRepliesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getRepliesFail: class implements Action {
    public readonly type = MessageActionTypes.GET_REPLIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createReplies Action.
   * Creates a new instance in replies of this model.
   *
   * @param {any} id Message id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createReplies: class implements Action {
    public readonly type = MessageActionTypes.CREATE_REPLIES;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createRepliesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createRepliesSuccess: class implements Action {
    public readonly type = MessageActionTypes.CREATE_REPLIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createRepliesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createRepliesFail: class implements Action {
    public readonly type = MessageActionTypes.CREATE_REPLIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteReplies Action.
   * Deletes all replies of this model.
   *
   * @param {any} id Message id
   * @param {any} meta (optional).
   * 
   */
  deleteReplies: class implements Action {
    public readonly type = MessageActionTypes.DELETE_REPLIES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteRepliesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteRepliesSuccess: class implements Action {
    public readonly type = MessageActionTypes.DELETE_REPLIES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteRepliesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteRepliesFail: class implements Action {
    public readonly type = MessageActionTypes.DELETE_REPLIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyLikes Action.
   * Creates a new instance in likes of this model.
   *
   * @param {any} id Message id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyLikes: class implements Action {
    public readonly type = MessageActionTypes.CREATE_MANY_LIKES;
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
    public readonly type = MessageActionTypes.CREATE_MANY_LIKES_SUCCESS;
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
    public readonly type = MessageActionTypes.CREATE_MANY_LIKES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyReplies Action.
   * Creates a new instance in replies of this model.
   *
   * @param {any} id Message id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyReplies: class implements Action {
    public readonly type = MessageActionTypes.CREATE_MANY_REPLIES;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyRepliesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyRepliesSuccess: class implements Action {
    public readonly type = MessageActionTypes.CREATE_MANY_REPLIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyRepliesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyRepliesFail: class implements Action {
    public readonly type = MessageActionTypes.CREATE_MANY_REPLIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});