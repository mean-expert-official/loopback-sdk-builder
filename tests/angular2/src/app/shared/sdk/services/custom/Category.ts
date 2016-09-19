/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Category } from '../../models/Category';
import { Room } from '../../models/Room';

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

/**
 * Api services for the `Category` model.
 */
@Injectable()
export class CategoryApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) http: Http,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth, 
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams, 
    @Optional() @Inject(ErrorHandler) errorHandler: ErrorHandler
  ) {
    super(http, auth, searchParams, errorHandler);
  }

  /**
   * Find a related item by id for rooms.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for rooms
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public findByIdRooms(id: any, fk: any) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms/:fk";
    let routeParams: any = {
      id: id,
      fk: fk
    };
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: Category) => new Category(instance));
  }

  /**
   * Delete a related item by id for rooms.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for rooms
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public destroyByIdRooms(id: any, fk: any) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms/:fk";
    let routeParams: any = {
      id: id,
      fk: fk
    };
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Update a related item by id for rooms.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for rooms
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public updateByIdRooms(id: any, fk: any, data: Room = undefined) {
    let method: string = "PUT";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms/:fk";
    let routeParams: any = {
      id: id,
      fk: fk
    };
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Add a related item by id for rooms.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for rooms
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public linkRooms(id: any, fk: any, data: any = undefined) {
    let method: string = "PUT";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms/rel/:fk";
    let routeParams: any = {
      id: id,
      fk: fk
    };
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Remove the rooms relation to an item by id.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for rooms
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public unlinkRooms(id: any, fk: any) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms/rel/:fk";
    let routeParams: any = {
      id: id,
      fk: fk
    };
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Check the existence of rooms relation to an item by id.
   *
   * @param any id PersistedModel id
   *
   * @param any fk Foreign key for rooms
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public existsRooms(id: any, fk: any) {
    let method: string = "HEAD";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms/rel/:fk";
    let routeParams: any = {
      id: id,
      fk: fk
    };
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Queries rooms of Category.
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public getRooms(id: any, filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (filter) urlParams.filter = filter;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Creates a new instance in rooms of this model.
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public createRooms(id: any, data: Room = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Deletes all rooms of this model.
   *
   * @param any id PersistedModel id
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public deleteRooms(id: any) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Counts rooms of Category.
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
  public countRooms(id: any, where: any = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms/count";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (where) urlParams.where = where;
    let result = this.request(method, url, routeParams, urlParams, postBody);
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public create(data: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: Category) => new Category(instance));
  }

  /**
   * Patch an existing model instance or insert a new one into the data source.
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public upsert(data: any = undefined) {
    let method: string = "PATCH";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: Category) => new Category(instance));
  }

  /**
   * Replace an existing model instance or insert a new one into the data source.
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public replaceOrCreate(data: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/replaceOrCreate";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
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
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/exists";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Find a model instance by {{id}} from the data source.
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public findById(id: any, filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (filter) urlParams.filter = filter;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: Category) => new Category(instance));
  }

  /**
   * Replace attributes for a model instance and persist it into the data source.
   *
   * @param any id Model id
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public replaceById(id: any, data: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/replace";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public find(filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories";
    let routeParams: any = {};
    let postBody: any = {};
    let urlParams: any = {};
    if (filter) urlParams.filter = filter;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instances: Array<Category>) =>
        instances.map((instance: Category) => new Category(instance))
    );
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public findOne(filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/findOne";
    let routeParams: any = {};
    let postBody: any = {};
    let urlParams: any = {};
    if (filter) urlParams.filter = filter;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: Category) => new Category(instance));
  }

  /**
   * Update instances of the model matched by {{where}} from the data source.
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
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/update";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    if (where) urlParams.where = where;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Delete a model instance by {{id}} from the data source.
   *
   * @param any id Model id
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public deleteById(id: any) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
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
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/count";
    let routeParams: any = {};
    let postBody: any = {};
    let urlParams: any = {};
    if (where) urlParams.where = where;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
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
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public updateAttributes(id: any, data: any = undefined) {
    let method: string = "PATCH";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
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
  public createChangeStream() {
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/change-stream";
    let subject = new Subject();
    if (typeof EventSource !== 'undefined') {
      let emit   = (msg: any) => subject.next(JSON.parse(msg.data));
      var source = new EventSource(url);
      source.addEventListener('data', emit);
      source.onerror = emit;
    } else {
      console.warn('SDK Builder: EventSource is not supported'); 
    }
    return subject.asObservable();
  }
  /**
   * Creates a new instance in rooms of this model.
   *
   * @param any id PersistedModel id
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object[] An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public createManyRooms(id: any, data: Array<Room> = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories/:id/rooms";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Create a new instance of the model and persist it into the data source.
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object[] An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Category` object.)
   * </em>
   */
  public createMany(data: Array<any> = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Categories";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instances: Array<Category>) =>
        instances.map((instance: Category) => new Category(instance))
    );
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Category`.
   */
  public getModelName() {
    return "Category";
  }
}
