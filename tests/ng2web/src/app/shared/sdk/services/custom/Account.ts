/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter, SDKToken, AccessToken } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { Account } from '../../models/Account';
import { SocketConnection } from '../../sockets/socket.connections';
import { RoomAccount } from '../../models/RoomAccount';
import { Room } from '../../models/Room';
import { RoomAdmin } from '../../models/RoomAdmin';


/**
 * Api services for the `Account` model.
 */
@Injectable()
export class AccountApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, searchParams, errorHandler);
  }

  /**
   * Find a related item by id for accessTokens.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for accessTokens
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public findByIdAccessTokens(id: any, fk: any): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/accessTokens/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Delete a related item by id for accessTokens.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for accessTokens
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public destroyByIdAccessTokens(id: any, fk: any): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/accessTokens/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Update a related item by id for accessTokens.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for accessTokens
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public updateByIdAccessTokens(id: any, fk: any, data: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/accessTokens/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Find a related item by id for rooms.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for rooms
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public findByIdRooms(id: any, fk: any): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Delete a related item by id for rooms.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for rooms
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public destroyByIdRooms(id: any, fk: any): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Update a related item by id for rooms.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for rooms
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public updateByIdRooms(id: any, fk: any, data: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Add a related item by id for rooms.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for rooms
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public linkRooms(id: any, fk: any, data: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Remove the rooms relation to an item by id.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for rooms
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public unlinkRooms(id: any, fk: any): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Check the existence of rooms relation to an item by id.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for rooms
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public existsRooms(id: any, fk: any): Observable<any> {
    let _method: string = "HEAD";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Find a related item by id for administrations.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for administrations
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public findByIdAdministrations(id: any, fk: any): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Delete a related item by id for administrations.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for administrations
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public destroyByIdAdministrations(id: any, fk: any): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Update a related item by id for administrations.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for administrations
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public updateByIdAdministrations(id: any, fk: any, data: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Add a related item by id for administrations.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for administrations
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public linkAdministrations(id: any, fk: any, data: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Remove the administrations relation to an item by id.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for administrations
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public unlinkAdministrations(id: any, fk: any): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Check the existence of administrations relation to an item by id.
   *
   * @param {any} id Account id
   *
   * @param {any} fk Foreign key for administrations
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public existsAdministrations(id: any, fk: any): Observable<any> {
    let _method: string = "HEAD";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Queries accessTokens of Account.
   *
   * @param {any} id Account id
   *
   * @param {object} filter 
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public getAccessTokens(id: any, filter: LoopBackFilter = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/accessTokens";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (filter) _urlParams.filter = filter;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id Account id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public createAccessTokens(id: any, data: any = {}): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/accessTokens";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Deletes all accessTokens of this model.
   *
   * @param {any} id Account id
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public deleteAccessTokens(id: any): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/accessTokens";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Counts accessTokens of Account.
   *
   * @param {any} id Account id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` - 
   */
  public countAccessTokens(id: any, where: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/accessTokens/count";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (where) _urlParams.where = where;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Queries rooms of Account.
   *
   * @param {any} id Account id
   *
   * @param {object} filter 
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public getRooms(id: any, filter: LoopBackFilter = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (filter) _urlParams.filter = filter;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Creates a new instance in rooms of this model.
   *
   * @param {any} id Account id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public createRooms(id: any, data: any = {}): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Deletes all rooms of this model.
   *
   * @param {any} id Account id
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public deleteRooms(id: any): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Counts rooms of Account.
   *
   * @param {any} id Account id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` - 
   */
  public countRooms(id: any, where: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms/count";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (where) _urlParams.where = where;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Queries administrations of Account.
   *
   * @param {any} id Account id
   *
   * @param {object} filter 
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public getAdministrations(id: any, filter: LoopBackFilter = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (filter) _urlParams.filter = filter;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Creates a new instance in administrations of this model.
   *
   * @param {any} id Account id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public createAdministrations(id: any, data: any = {}): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Deletes all administrations of this model.
   *
   * @param {any} id Account id
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public deleteAdministrations(id: any): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Counts administrations of Account.
   *
   * @param {any} id Account id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` - 
   */
  public countAdministrations(id: any, where: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations/count";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (where) _urlParams.where = where;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Patch an existing model instance or insert a new one into the data source.
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - Model instance data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public patchOrCreate(data: any = {}): Observable<any> {
    let _method: string = "PATCH";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id Account id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public patchAttributes(id: any, data: any = {}): Observable<any> {
    let _method: string = "PATCH";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Login a user with username/email and password.
   *
   * @param {string} include Related objects to include in the response. See the description of return value for more details.
   *   Default value: `user`.
   *
   *  - `rememberMe` - `boolean` - Whether the authentication credentials
   *     should be remembered in localStorage across app/browser restarts.
   *     Default: `true`.
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * The response body contains properties of the AccessToken created on login.
   * Depending on the value of `include` parameter, the body may contain additional properties:
   * 
   *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
   * 
   *
   */
  public login(credentials: any, include: any = 'user', rememberMe: boolean = true): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/login";
    let _routeParams: any = {};
    let _postBody: any = {
      credentials: credentials
    };
    let _urlParams: any = {};
    if (include) _urlParams.include = include;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody)
      .map(
        (response: any) => {
          response.ttl = parseInt(response.ttl);
          response.rememberMe = rememberMe;
          this.auth.setToken(response);
          return response;
        }
      );
      return result;
      
  }

  /**
   * Logout a user with access token.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public logout(): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/logout";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
       _urlParams.access_token = this.auth.getAccessTokenId();
    this.auth.clear(); 
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Confirm a user registration with email verification token.
   *
   * @param {string} uid 
   *
   * @param {string} token 
   *
   * @param {string} redirect 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public confirm(uid: any, token: any, redirect: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/confirm";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (uid) _urlParams.uid = uid;
    if (token) _urlParams.token = token;
    if (redirect) _urlParams.redirect = redirect;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Reset password for a user with email.
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public resetPassword(options: any): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/reset";
    let _routeParams: any = {};
    let _postBody: any = {
      options: options
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Change a user's password.
   *
   * @param {object} data Request data.
   *
   *  - `oldPassword` – `{string}` - 
   *
   *  - `newPassword` – `{string}` - 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public changePassword(oldPassword: any, newPassword: any): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/change-password";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (oldPassword) _urlParams.oldPassword = oldPassword;
    if (newPassword) _urlParams.newPassword = newPassword;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `result` – `{any}` - 
   */
  public myRemote(): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/my-remote";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Statistical information for Account registers.
   *
   * @param {string} range hourly, daily, weekly, monthly, yearly, custom
   *
   * @param {object} custom {"start": date, "end": date }
   *
   * @param {object} where where filter 
   *
   * @param {string} groupBy group by filter 
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public stats(range: any, custom: any = {}, where: any = {}, groupBy: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/stats";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (range) _urlParams.range = range;
    if (custom) _urlParams.custom = custom;
    if (where) _urlParams.where = where;
    if (groupBy) _urlParams.groupBy = groupBy;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id Account id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public createManyAccessTokens(id: any, data: any[] = []): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/accessTokens";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Creates a new instance in rooms of this model.
   *
   * @param {any} id Account id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public createManyRooms(id: any, data: any[] = []): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/rooms";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Creates a new instance in administrations of this model.
   *
   * @param {any} id Account id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Account` object.)
   * </em>
   */
  public createManyAdministrations(id: any, data: any[] = []): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/accounts/:id/administrations";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }
  /**
   * @ngdoc method
   * @name sdk.Account#getCurrent
   * @methodOf sdk.Account
   *
   * @description
   *
   * Get data of the currently logged user. Fail with HTTP result 401
   * when there is no user logged in.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   */
  public getCurrent(): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/accounts" + "/:id";
    let id: any = this.auth.getCurrentUserId();
    if (id == null)
    id = '__anonymous__';
    let _routeParams: any = { id: id };
    let _urlParams: any = {};
    let _postBody: any = {};
    return this.request(_method, _url, _routeParams, _urlParams, _postBody);
  }
  /**
   * Get data of the currently logged user that was returned by the last
   * call to {@link sdk.Account#login} or
   * {@link sdk.Account#getCurrent}. Return null when there
   * is no user logged in or the data of the current user were not fetched
   * yet.
   *
   * @returns object An Account instance.
   */
  public getCachedCurrent() {
    return this.auth.getCurrentUserData();
  }
  /**
   * Get data of the currently logged access tokern that was returned by the last
   * call to {@link sdk.Account#login}
   *
   * @returns object An AccessToken instance.
   */
  public getCurrentToken(): AccessToken {
    return this.auth.getToken();
  }
  /**
   * @name sdk.Account#isAuthenticated
   *
   * @returns {boolean} True if the current user is authenticated (logged in).
   */
  public isAuthenticated() {
    return !(this.getCurrentId() === '' || this.getCurrentId() == null || this.getCurrentId() == 'null');
  }

  /**
   * @name sdk.Account#getCurrentId
   *
   * @returns object Id of the currently logged-in user or null.
   */
  public getCurrentId() {
    return this.auth.getCurrentUserId();
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public getModelName() {
    return "Account";
  }
}
