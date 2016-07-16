/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import {
  LoopBackAuth,
  ErrorHandler,
  JSONSearchParams,
  BaseLoopBackApi,
} from '../core/index';
import {
  LoopBackFilter,
  Room
} from '../../models/index';
import { LoopBackConfig } from '../../lb.config';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

/**
 * Api for the `Room` model.
 */
@Injectable()
export class RoomApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) http: Http,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth, 
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams, 
    @Optional() @Inject(ErrorHandler) errorHandler: ErrorHandler
  ) {
    super(http, auth, searchParams, errorHandler);
  }

  /**
   * Find a related item by id for messages.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for messages
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public findByIdMessages(id: any, fk: any) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id/messages/:fk";
    let urlParams: any = {
      id: id,
      fk: fk
    };
    let params: any = {};
    let result = this.request(method, url, urlParams, params)
    return result.map((result: Room | Array<Room>) => Array.isArray(result)
                             ? result.map((instance: Room)=> new Room(instance))
                             : new Room(result));
  }

  /**
   * Delete a related item by id for messages.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for messages
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public destroyByIdMessages(id: any, fk: any) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id/messages/:fk";
    let urlParams: any = {
      id: id,
      fk: fk
    };
    let params: any = {};
    let result = this.request(method, url, urlParams, params);
    return result;
  }

  /**
   * Update a related item by id for messages.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for messages
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public updateByIdMessages(id: any, fk: any, data: any = undefined) {
    let method: string = "PUT";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id/messages/:fk";
    let urlParams: any = {
      id: id,
      fk: fk
    };
    let params: any = {};
    if (data) params.data = data;
    let result = this.request(method, url, urlParams, params, data);
    return result;
  }

  /**
   * Queries messages of Room.
   *
   * @param any id PersistedModel id
   *
   * @param object filter 
   *
   * @returns object[] An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public getMessages(id: any, filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id/messages";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    if (filter) params.filter = filter;
    let result = this.request(method, url, urlParams, params);
    return result;
  }

  /**
   * Creates a new instance in messages of this model.
   *
   * @param any id PersistedModel id
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public createMessages(id: any, data: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id/messages";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    if (data) params.data = data;
    let result = this.request(method, url, urlParams, params, data);
    return result;
  }

  /**
   * Deletes all messages of this model.
   *
   * @param any id PersistedModel id
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public deleteMessages(id: any) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id/messages";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    let result = this.request(method, url, urlParams, params);
    return result;
  }

  /**
   * Counts messages of Room.
   *
   * @param any id PersistedModel id
   *
   * @param object where Criteria to match model instances
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` - 
   */
  public countMessages(id: any, where: any = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id/messages/count";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    if (where) params.where = where;
    let result = this.request(method, url, urlParams, params);
    return result;
  }

  /**
   * Create a new instance of the model and persist it into the data source.
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public create(data: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms";
    let urlParams: any = {
    };
    let params: any = {};
    if (data) params.data = data;
    let result = this.request(method, url, urlParams, params, data)
    return result.map((result: Room | Array<Room>) => Array.isArray(result)
                             ? result.map((instance: Room)=> new Room(instance))
                             : new Room(result));
  }

  /**
   * Update an existing model instance or insert a new one into the data source.
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public upsert(data: any = undefined) {
    let method: string = "PUT";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms";
    let urlParams: any = {
    };
    let params: any = {};
    if (data) params.data = data;
    let result = this.request(method, url, urlParams, params, data)
    return result.map((result: Room | Array<Room>) => Array.isArray(result)
                             ? result.map((instance: Room)=> new Room(instance))
                             : new Room(result));
  }

  /**
   * Check whether a model instance exists in the data source.
   *
   * @param any id Model id
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `exists` – `{boolean}` - 
   */
  public exists(id: any) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id/exists";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    let result = this.request(method, url, urlParams, params);
    return result;
  }

  /**
   * Find a model instance by id from the data source.
   *
   * @param any id Model id
   *
   * @param object filter Filter defining fields and include
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public findById(id: any, filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    if (filter) params.filter = filter;
    let result = this.request(method, url, urlParams, params)
    return result.map((result: Room | Array<Room>) => Array.isArray(result)
                             ? result.map((instance: Room)=> new Room(instance))
                             : new Room(result));
  }

  /**
   * Find all instances of the model matched by filter from the data source.
   *
   * @param object filter Filter defining fields, where, include, order, offset, and limit
   *
   * @returns object[] An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public find(filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms";
    let urlParams: any = {
    };
    let params: any = {};
    if (filter) params.filter = filter;
    let result = this.request(method, url, urlParams, params)
    return result.map((result: Room | Array<Room>) => Array.isArray(result)
                             ? result.map((instance: Room)=> new Room(instance))
                             : new Room(result));
  }

  /**
   * Find first instance of the model matched by filter from the data source.
   *
   * @param object filter Filter defining fields, where, include, order, offset, and limit
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public findOne(filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/findOne";
    let urlParams: any = {
    };
    let params: any = {};
    if (filter) params.filter = filter;
    let result = this.request(method, url, urlParams, params)
    return result.map((result: Room | Array<Room>) => Array.isArray(result)
                             ? result.map((instance: Room)=> new Room(instance))
                             : new Room(result));
  }

  /**
   * Update instances of the model matched by where from the data source.
   *
   * @param object where Criteria to match model instances
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * The number of instances updated
   */
  public updateAll(where: any = undefined, data: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/update";
    let urlParams: any = {
    };
    let params: any = {};
    if (where) params.where = where;
    if (data) params.data = data;
    let result = this.request(method, url, urlParams, params, data)
    return result.map((result: Room | Array<Room>) => Array.isArray(result)
                             ? result.map((instance: Room)=> new Room(instance))
                             : new Room(result));
  }

  /**
   * Delete a model instance by id from the data source.
   *
   * @param any id Model id
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public deleteById(id: any) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    let result = this.request(method, url, urlParams, params);
    return result;
  }

  /**
   * Count instances of the model matched by where from the data source.
   *
   * @param object where Criteria to match model instances
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` - 
   */
  public count(where: any = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/count";
    let urlParams: any = {
    };
    let params: any = {};
    if (where) params.where = where;
    let result = this.request(method, url, urlParams, params);
    return result;
  }

  /**
   * Update attributes for a model instance and persist it into the data source.
   *
   * @param any id PersistedModel id
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public updateAttributes(id: any, data: any = undefined) {
    let method: string = "PUT";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/:id";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    if (data) params.data = data;
    let result = this.request(method, url, urlParams, params, data);
    return result;
  }

  /**
   * Create a change stream.
   *
   * @param object data Request data.
   *
   *  - `options` – `{object}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `changes` – `{ReadableStream}` - 
   */
  public createChangeStream(options: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/rooms/change-stream";
    let urlParams: any = {
    };
    let params: any = {};
    if (options) params.options = options;
    let result = this.request(method, url, urlParams, params, options);
    return result;
  }

  /**
   * Fetches belongsTo relation room.
   *
   * @param any id PersistedModel id
   *
   * @param boolean refresh 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Room` object.)
   * </em>
   */
  public getMessageRoom(id: any, refresh: boolean = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/messages/:id/room";
    let urlParams: any = {
      id: id
    };
    let params: any = {};
    if (refresh) params.refresh = refresh;
    let result = this.request(method, url, urlParams, params);
    return result;
  }


  /**
   * The name of the model represented by this $resource,
   * i.e. `Room`.
   */
  public getModelName() {
    return "Room";
  }
}
