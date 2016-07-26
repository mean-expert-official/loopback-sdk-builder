/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Headers, Request } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {
  LoopBackAuth,
  LoopBackConfig,
  ErrorHandler,
  
  JSONSearchParams
} from '../../index';


@Injectable()
export abstract class BaseLoopBackApi {

  protected path: string;

  constructor(
    @Inject(Http) protected http: Http, 
    @Inject(LoopBackAuth) protected auth: LoopBackAuth, 
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams, 
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    if (!auth) {
      this.auth = new LoopBackAuth();
    }
    if (!errorHandler) {
      this.errorHandler = new ErrorHandler();
    }
  }

  /**
   * Process request
   * @param string  method      Request method (GET, POST, PUT)
   * @param string  url         Request url (my-host/my-url/:id)
   * @param any     routeParams Values of url parameters
   * @param any     urlParams   Parameters for building url (filter and other)
   * @param any     postBody    Request postBody
   * @param boolean isio        Request socket connection
   */
  public request(method: string, url: string, routeParams: any = {}, urlParams: any = {}, postBody: any = null) {    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.auth.getAccessTokenId()) {
      headers.append('Authorization', LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
    }

    let requestUrl = url;
    let key: string;
    for (key in routeParams) {
      requestUrl = requestUrl.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
    }

      let body = (typeof postBody === 'object' && postBody.data && Object.keys(postBody).length === 1)
               ? postBody.data : postBody;
      this.searchParams.setJSON(urlParams);
      let request = new Request({
        headers : headers,
        method  : method,
        url     : requestUrl,
        search  : this.searchParams.getURLSearchParams(),
        body    : body ? JSON.stringify(body) : undefined
      });
      return this.http.request(request)
        .map(res => (res.text() != "" ? res.json() : {}))
        .catch(this.errorHandler.handleError);
  }
}
