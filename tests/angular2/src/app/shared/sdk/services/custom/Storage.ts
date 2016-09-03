/* tslint:disable */
import { Injectable, Inject, Optional }  from '@angular/core';
import { Http, Response }  from '@angular/http';
import { BaseLoopBackApi }  from '../core/base.service';
import { LoopBackConfig }  from '../../lb.config';
import { LoopBackAuth }  from '../core/auth.service';
import { LoopBackFilter }  from '../../models/BaseModels';
import { JSONSearchParams }  from '../core/search.params';
import { ErrorHandler }  from '../core/error.service';
import { Subject }  from 'rxjs/Subject';
import 'rxjs/add/operator/map' ;
import { Storage }  from '../../models/Storage';

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

/**
 * Api services for the `Storage` model.
 */
@Injectable()
export class StorageApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) http: Http,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth, 
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams, 
    @Optional() @Inject(ErrorHandler) errorHandler: ErrorHandler
  ) {
    super(http, auth, searchParams, errorHandler);
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @returns object[] An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Storage` object.)
   * </em>
   */
  public getContainers() {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages";
    let routeParams: any = {};
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
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
   * This usually means the response is a `Storage` object.)
   * </em>
   */
  public createContainer(options: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages";
    let routeParams: any = {};
    let postBody: any = {
      options: options
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param string container 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `` – `{}` - 
   */
  public destroyContainer(container: any = undefined) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages/:container";
    let routeParams: any = {
      container: container
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (container) urlParams.container = container;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param string container 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Storage` object.)
   * </em>
   */
  public getContainer(container: any = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages/:container";
    let routeParams: any = {
      container: container
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (container) urlParams.container = container;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param string container 
   *
   * @returns object[] An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Storage` object.)
   * </em>
   */
  public getFiles(container: any = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages/:container/files";
    let routeParams: any = {
      container: container
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (container) urlParams.container = container;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param string container 
   *
   * @param string file 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Storage` object.)
   * </em>
   */
  public getFile(container: any = undefined, file: any = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages/:container/files/:file";
    let routeParams: any = {
      container: container,
      file: file
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (container) urlParams.container = container;
    if (file) urlParams.file = file;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param string container 
   *
   * @param string file 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `` – `{}` - 
   */
  public removeFile(container: any = undefined, file: any = undefined) {
    let method: string = "DELETE";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages/:container/files/:file";
    let routeParams: any = {
      container: container,
      file: file
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (container) urlParams.container = container;
    if (file) urlParams.file = file;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param object data Request data.
   *
   *  - `req` – `{object}` - 
   *
   *  - `res` – `{object}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `result` – `{object}` - 
   */
  public upload(req: any = undefined, res: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages/:container/upload";
    let routeParams: any = {};
    let postBody: any = {
      req: req,
      res: res
    };
    let urlParams: any = {};
    if (req) urlParams.req = req;
    if (res) urlParams.res = res;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param string container 
   *
   * @param string file 
   *
   * @param object req 
   *
   * @param object res 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public download(container: any = undefined, file: any = undefined, req: any = undefined, res: any = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/storages/:container/download/:file";
    let routeParams: any = {
      container: container,
      file: file
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (req) urlParams.req = req;
    if (res) urlParams.res = res;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }


  /**
   * The name of the model represented by this $resource,
   * i.e. `Storage`.
   */
  public getModelName() {
    return "Storage";
  }
}
