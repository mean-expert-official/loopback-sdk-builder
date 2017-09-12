/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
// import { Http, Headers, Request, RequestOptions } from '@angular/http';
import axios from 'axios';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { JSONSearchParams } from './search.params';
import { ErrorHandler } from './error.service';
import { LoopBackAuth } from './auth';
import { LoopBackConfig } from '../../lb.config';
import { AccessToken } from '../../models/BaseModels';
import { SDKModels } from '../custom/SDKModels';
import { Observable } from 'npm /Observable';
import { Subject } from 'rxjs/Subject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SocketConnection } from '../../sockets/socket.connections';
// Making Sure EventSource Type is available to avoid compilation issues.
/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
export class BaseLoopBackApi {

 path;
 model;

  constructor( ) {
    this.model = this.models.get(this.getModelName());
  }
  /**
   * @method request
   * @param {string}  method      Request method (GET, POST, PUT)
   * @param {string}  url         Request url (my-host/my-url/:id)
   * @param {any}     routeParams Values of url parameters
   * @param {any}     urlParams   Parameters for building url (filter and other)
   * @param {any}     postBody    Request postBody
   * @return }
   * @description
   * This is a core method, every HTTP Call will be done from here, every API Service will
   * extend this class and use this method to get RESTful communication.
   **/
  request(
    method         ,
    url            ,
    routeParams    = {},
    urlParams      = {},
    postBody       = {},
    pubsub         = false,
    customHeaders
  ) {
    // Transpile route variables to the actual request Values
    Object.keys(routeParams).forEach((key) => {
      url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1")
    });
    if (pubsub) {
      if (url.match(/fk/)) {
        let arr = url.split('/'); arr.pop();
        url = arr.join('/');
      }
      let event = (`[${method}]${url}`).replace(/\?/, '');
      let subject = new Subject();
      this.connection.on(event, (res) => subject.next(res));
      return subject.asObservable();
    } else {
      // Headers to be sent
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // Authenticate request
      this.authenticate(url, headers);
      // Body fix for built in remote methods using "data", "options" or "credentials
      // that are the actual body, Custom remote method properties are different and need
      // to be wrapped into a body object
      let body;
      let postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : []
      if (postBodyKeys.length === 1) {
        body = postBody[postBodyKeys.shift()];
      } else {
        body = postBody;
      }
      let filter = '';
      // Separate filter object from url params and add to search query
      if (urlParams.filter) {
        if (LoopBackConfig.isHeadersFilteringSet()) {
          headers.append('filter', JSON.stringify(urlParams.filter));
        } else {
          filter = `?filter=${ encodeURI(JSON.stringify(urlParams.filter))}`;
        }
        delete urlParams.filter;
      }
      // Separate where object from url params and add to search query
      /**
      CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
      - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
      - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328 
      if (urlParams.where) {
        headers.append('where', JSON.stringify(urlParams.where));
        delete urlParams.where;
      }
      **/
      if (typeof customHeaders === 'function') {
        headers = customHeaders(headers);
      }
      this.searchParams.setJSON(urlParams);
      let request = new Request(
        new RequestOptions({
          headers ,
          method  : method,
          url     : `${url}${filter}`,
          search  : Object.keys(urlParams).length > 0
                  ? this.searchParams.getURLSearchParams() : null,
          body    : body ? JSON.stringify(body) : undefined
        })
      );
      return this.http.request(request)
        .map((res) => (res.text() != "" ? res.json() : {}))
        .catch((e) => this.errorHandler.handleError(e));
    }
  }
  /**
   * @method authenticate
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {string} url Server URL
   * @param {Headers} headers HTTP Headers
   * @return {void}
   * @description
   * This method will try to authenticate using either an access_token or basic http auth
   */
  authenticate(url, headers) {
    if (this.auth.getAccessTokenId()) {
      headers.append(
        'Authorization',
        LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId()
      );
    }
  }
  /**
   * @method create
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {T} data Generic data type
   * @return {Observable}
   * @description
   * Generic create method
   */
  create(data, customHeaders) {
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path
    ].join('/'), undefined, undefined, { data }, null, customHeaders).map((data) => this.model.factory(data));
  }
  /**
   * @method onCreate
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {T[]} data Generic data type array
   * @return {Observable}
   * @description
   * Generic pubsub oncreate many method
   */
  onCreate(data) {
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path
    ].join('/'), undefined, undefined, { data }, true)
    .map((datum) => datum.map((data) => this.model.factory(data)));
  }
  /**
   * @method createMany
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {T[]} data Generic data type array
   * @return {Observable}
   * @description
   * Generic create many method
   */
  createMany(data, customHeaders) {
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path
    ].join('/'), undefined, undefined, { data }, null, customHeaders)
    .map((datum) => datum.map((data) => this.model.factory(data)));
  }
  /**
   * @method onCreateMany
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {T[]} data Generic data type array
   * @return {Observable}
   * @description
   * Generic create many method
   */
  onCreateMany(data) {
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path
    ].join('/'), undefined, undefined, { data }, true)
    .map((datum) => datum.map((data) => this.model.factory(data)));
  }
  /**
   * @method findById
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {any} data Generic data type
   * @return {Observable}
   * @description
   * Generic findById method
   */
  findById(id, filter = {}, customHeaders) {
    let _urlParams= {};
    if (filter) _urlParams.filter = filter;
    return this.request('GET', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      ':id'
    ].join('/'), { id }, _urlParams, undefined, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method find
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T[+>}
   * @description
   * Generic find method
   */
  find(filter = {}, customHeaders) {
    return this.request('GET', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path
    ].join('/'), undefined, { filter }, undefined, null, customHeaders)
    .map((datum) => datum.map((data) => this.model.factory(data)));
  }
  /**
   * @method exists
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic exists method
   */
  exists(id, customHeaders) {
    return this.request('GET', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      ':id/exists'
    ].join('/'), { id }, undefined, undefined, null, customHeaders);
  }
  /**
   * @method findOne
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic findOne method
   */
  findOne(filter = {}, customHeaders) {
    return this.request('GET', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      'findOne'
    ].join('/'), undefined, { filter }, undefined, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method updateAll
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic updateAll method
   */
  updateAll(where= {}, data, customHeaders) {
    let _urlParams= {};
    if (where) _urlParams.where = where;
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      'update'
    ].join('/'), undefined, _urlParams, { data }, null, customHeaders);
  }
  /**
   * @method onUpdateAll
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic pubsub onUpdateAll method
   */
  onUpdateAll(where= {}, data) {
    let _urlParams= {};
    if (where) _urlParams.where = where;
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      'update'
    ].join('/'), undefined, _urlParams, { data }, true);
  }
  /**
   * @method deleteById
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic deleteById method
   */
  deleteById(id, customHeaders) {
    return this.request('DELETE', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      ':id'
    ].join('/'), { id }, undefined, undefined, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method onDeleteById
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic pubsub onDeleteById method
   */
  onDeleteById(id) {
    return this.request('DELETE', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      ':id'
    ].join('/'), { id }, undefined, undefined, true).map((data) => this.model.factory(data));
  }
  /**
   * @method count
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic count method
   */
  count(where= {}, customHeaders) {
    let _urlParams= {};
    if (where) _urlParams.where = where;
    return this.request('GET', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      'count'
    ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
  }
  /**
   * @method updateAttributes
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic updateAttributes method
   */
  updateAttributes(id, data, customHeaders) {
    return this.request('PUT', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      ':id'
    ].join('/'), { id }, undefined, { data }, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method onUpdateAttributes
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic onUpdateAttributes method
   */
  onUpdateAttributes(id, data) {
    return this.request('PUT', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      ':id'
    ].join('/'), { id }, undefined, { data }, true).map((data) => this.model.factory(data));
  }
  /**
   * @method upsert
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic upsert method
   */
  upsert(data= {}, customHeaders) {
    return this.request('PUT', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
    ].join('/'), undefined, undefined, { data }, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method onUpsert
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic pubsub onUpsert method
   */
  onUpsert(data= {}) {
    return this.request('PUT', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
    ].join('/'), undefined, undefined, { data }, true).map((data) => this.model.factory(data));
  }
  /**
   * @method upsertPatch
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic upsert method using patch http method
   */
  upsertPatch(data= {}, customHeaders) {
    return this.request('PATCH', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
    ].join('/'), undefined, undefined, { data }, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method onUpsertPatch
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic pubsub onUpsertPatch method using patch http method
   */
  onUpsertPatch(data= {}) {
    return this.request('PATCH', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
    ].join('/'), undefined, undefined, { data }, true).map((data) => this.model.factory(data));
  }
  /**
   * @method upsertWithWhere
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic upsertWithWhere method
   */
  upsertWithWhere(where= {}, data= {}, customHeaders) {
    let _urlParams= {};
    if (where) _urlParams.where = where;
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      'upsertWithWhere'
    ].join('/'), undefined, _urlParams, { data }, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method onUpsertWithWhere
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic pubsub onUpsertWithWhere method
   */
  onUpsertWithWhere(where= {}, data= {}) {
    let _urlParams= {};
    if (where) _urlParams.where = where;
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      'upsertWithWhere'
    ].join('/'), undefined, _urlParams, { data }, true).map((data) => this.model.factory(data));
  }
  /**
   * @method replaceOrCreate
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic replaceOrCreate method
   */
  replaceOrCreate(data= {}, customHeaders) {
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      'replaceOrCreate'
    ].join('/'), undefined, undefined, { data }, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method onReplaceOrCreate
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic onReplaceOrCreate method
   */
  onReplaceOrCreate(data= {}) {
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      'replaceOrCreate'
    ].join('/'), undefined, undefined, { data }, true).map((data) => this.model.factory(data));
  }
  /**
   * @method replaceById
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic replaceById method
   */
  replaceById(id, data= {}, customHeaders) {
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      ':id', 'replace'
    ].join('/'), { id }, undefined, { data }, null, customHeaders)
    .map((data) => this.model.factory(data));
  }
  /**
   * @method onReplaceById
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable}
   * @description
   * Generic onReplaceById method
   */
  onReplaceById(id, data= {}) {
    return this.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      this.model.getModelDefinition().path,
      ':id', 'replace'
    ].join('/'), { id }, undefined, { data }, true).map((data) => this.model.factory(data));
  }
  /**
   * @method createChangeStream
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return }
   * @description
   * Generic createChangeStream method
   */
  createChangeStream() {
    let subject = new Subject();
    if (typeof EventSource !== 'undefined') {
      let emit   = (msg) => subject.next(JSON.parse(msg.data));
      var source = new EventSource([
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        'change-stream'
      ].join('/'));
      source.addEventListener('data', emit);
      source.onerror = emit;
    } else {
      console.warn('SDK Builder: EventSource is not supported'); 
    }
    return subject.asObservable();
  }
  /**
   * @method getModelName
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {string}
   * @description
   * Abstract getModelName method
   */
  getModelName();
}
