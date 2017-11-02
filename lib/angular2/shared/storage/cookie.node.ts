/* tslint:disable */
declare var Zone: any;
import { Injectable } from '@angular/core';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module CookieNode
* @license MIT
* @description
* This module handle cookies, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
@Injectable()
export class CookieNode {
  /**
   * @method get
   * @param {string} key Cookie key name
   * @return {any}
   * @description
   * The getter will return any type of data persisted in cookies.
   **/
  get(key: string) {
    let cookies: { [key: string]: number } = Zone.current.get('req').cookies;
    return cookies[key];
  }
  /**
   * @method set
   * @param {string} key Cookie key name
   * @param {any} value Any value
   * @param {Date=} expires The date of expiration (Optional)
   * @return {void}
   * @description
   * The setter will return any type of data persisted in cookies.
   **/
  set(key: string, value: any): any {
    Zone.current.get('res').cookies(key, value).send('Cookie is set');
  }
  /**
   * @method remove
   * @param {string} key Cookie key name
   * @return {void}
   * @description
   * This method will remove a cookie from the client.
   **/
  remove(key: string, value: any): any {
    Zone.current.get('res').cookies(key, '; expires=Thu, 01 Jan 1970 00:00:01 GMT;').send('Cookie is removed');
  }
}
