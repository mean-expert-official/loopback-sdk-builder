/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Category } from '../models';

export const CategoryActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Category'), {
  FIND_BY_ID_ROOMS: type('[Category] findByIdRooms'),
  FIND_BY_ID_ROOMS_SUCCESS: type('[Category] findByIdRooms success'),
  FIND_BY_ID_ROOMS_FAIL: type('[Category] findByIdRooms fail'),

  DESTROY_BY_ID_ROOMS: type('[Category] destroyByIdRooms'),
  DESTROY_BY_ID_ROOMS_SUCCESS: type('[Category] destroyByIdRooms success'),
  DESTROY_BY_ID_ROOMS_FAIL: type('[Category] destroyByIdRooms fail'),

  UPDATE_BY_ID_ROOMS: type('[Category] updateByIdRooms'),
  UPDATE_BY_ID_ROOMS_SUCCESS: type('[Category] updateByIdRooms success'),
  UPDATE_BY_ID_ROOMS_FAIL: type('[Category] updateByIdRooms fail'),

  LINK_ROOMS: type('[Category] linkRooms'),
  LINK_ROOMS_SUCCESS: type('[Category] linkRooms success'),
  LINK_ROOMS_FAIL: type('[Category] linkRooms fail'),

  UNLINK_ROOMS: type('[Category] unlinkRooms'),
  UNLINK_ROOMS_SUCCESS: type('[Category] unlinkRooms success'),
  UNLINK_ROOMS_FAIL: type('[Category] unlinkRooms fail'),

  GET_ROOMS: type('[Category] getRooms'),
  GET_ROOMS_SUCCESS: type('[Category] getRooms success'),
  GET_ROOMS_FAIL: type('[Category] getRooms fail'),

  CREATE_ROOMS: type('[Category] createRooms'),
  CREATE_ROOMS_SUCCESS: type('[Category] createRooms success'),
  CREATE_ROOMS_FAIL: type('[Category] createRooms fail'),

  DELETE_ROOMS: type('[Category] deleteRooms'),
  DELETE_ROOMS_SUCCESS: type('[Category] deleteRooms success'),
  DELETE_ROOMS_FAIL: type('[Category] deleteRooms fail'),

  CREATE_MANY_ROOMS: type('[Category] createManyRooms'),
  CREATE_MANY_ROOMS_SUCCESS: type('[Category] createManyRooms success'),
  CREATE_MANY_ROOMS_FAIL: type('[Category] createManyRooms fail'),

});
export const CategoryActions =
Object.assign(BaseLoopbackActionsFactory<Category>(CategoryActionTypes), {

  /**
   * findByIdRooms Action.
   * Find a related item by id for rooms.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for rooms
   * @param {any} meta (optional).
   * 
   */
  findByIdRooms: class implements Action {
    public readonly type = CategoryActionTypes.FIND_BY_ID_ROOMS;
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
    public readonly type = CategoryActionTypes.FIND_BY_ID_ROOMS_SUCCESS;
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
    public readonly type = CategoryActionTypes.FIND_BY_ID_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdRooms Action.
   * Delete a related item by id for rooms.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for rooms
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRooms: class implements Action {
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_ROOMS;
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
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_ROOMS_SUCCESS;
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
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdRooms Action.
   * Update a related item by id for rooms.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for rooms
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdRooms: class implements Action {
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_ROOMS;
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
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_ROOMS_SUCCESS;
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
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkRooms Action.
   * Add a related item by id for rooms.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for rooms
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkRooms: class implements Action {
    public readonly type = CategoryActionTypes.LINK_ROOMS;
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
    public readonly type = CategoryActionTypes.LINK_ROOMS_SUCCESS;
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
    public readonly type = CategoryActionTypes.LINK_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkRooms Action.
   * Remove the rooms relation to an item by id.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for rooms
   * @param {any} meta (optional).
   * 
   */
  unlinkRooms: class implements Action {
    public readonly type = CategoryActionTypes.UNLINK_ROOMS;
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
    public readonly type = CategoryActionTypes.UNLINK_ROOMS_SUCCESS;
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
    public readonly type = CategoryActionTypes.UNLINK_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getRooms Action.
   * Queries rooms of Category.
   *
   * @param {any} id Category id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getRooms: class implements Action {
    public readonly type = CategoryActionTypes.GET_ROOMS;
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
    public readonly type = CategoryActionTypes.GET_ROOMS_SUCCESS;
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
    public readonly type = CategoryActionTypes.GET_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createRooms Action.
   * Creates a new instance in rooms of this model.
   *
   * @param {any} id Category id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createRooms: class implements Action {
    public readonly type = CategoryActionTypes.CREATE_ROOMS;
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
    public readonly type = CategoryActionTypes.CREATE_ROOMS_SUCCESS;
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
    public readonly type = CategoryActionTypes.CREATE_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteRooms Action.
   * Deletes all rooms of this model.
   *
   * @param {any} id Category id
   * @param {any} meta (optional).
   * 
   */
  deleteRooms: class implements Action {
    public readonly type = CategoryActionTypes.DELETE_ROOMS;
      
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
    public readonly type = CategoryActionTypes.DELETE_ROOMS_SUCCESS;
  
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
    public readonly type = CategoryActionTypes.DELETE_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyRooms Action.
   * Creates a new instance in rooms of this model.
   *
   * @param {any} id Category id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyRooms: class implements Action {
    public readonly type = CategoryActionTypes.CREATE_MANY_ROOMS;
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
    public readonly type = CategoryActionTypes.CREATE_MANY_ROOMS_SUCCESS;
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
    public readonly type = CategoryActionTypes.CREATE_MANY_ROOMS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});