/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Core } from '../../models/Core';

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

/**
 * Api services for the `Core` model.
 */
@Injectable()
export class CoreApi extends BaseLoopBackApi {

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
   * @param string path 
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
   * This usually means the response is a `Core` object.)
   * </em>
   */
  public run(path: any = undefined, body: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/cores/run/:path";
    let routeParams: any = {
      path: path
    };
    let postBody: any = {
      body: body
    };
    let urlParams: any = {};
    if (body) urlParams.body = body;
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
   * This method returns no data.
   */
  public invoke(request: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/cores/invoke";
    let routeParams: any = {};
    let postBody: any = {
      request: request
    };
    let urlParams: any = {};
    if (request) urlParams.request = request;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }


  /**
   * The name of the model represented by this $resource,
   * i.e. `Core`.
   */
  public getModelName() {
    return "Core";
  }
}
