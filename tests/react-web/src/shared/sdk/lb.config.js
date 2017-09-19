/**
* @module LoopBackConfig
* @description
*
* The LoopBackConfig module help developers to externally 
* configure the base url and api version for loopback.io
*
* Example
*
* import { LoopBackConfig } from './sdk';
* 
* @Component() // No metadata needed for this module
*
* export class MyApp {
*   constructor() {
*     LoopBackConfig.setBaseURL('http://localhost:3000');
*     LoopBackConfig.setApiVersion('api');
*   }
* }
**/
export class LoopBackConfig {
  static path = '//0.0.0.0:3000';
  static version  = 'api';
  static authPrefix = '';
  static debug = true;
  static filterOn = 'headers';
  static secure = false;

  static setApiVersion(version = 'api') {
    LoopBackConfig.version = version;
  }
  
  static getApiVersion() {
    return LoopBackConfig.version;
  }

  static setBaseURL(url = '/') {
    LoopBackConfig.path = url;
  }
  
  static getPath() {
    return LoopBackConfig.path;
  }

  static setAuthPrefix(authPrefix = '') {
    LoopBackConfig.authPrefix = authPrefix;
  }

  static getAuthPrefix() {
    return LoopBackConfig.authPrefix;
  }

  static setDebugMode(isEnabled) {
    LoopBackConfig.debug = isEnabled;
  }

  static debuggable() {
    return LoopBackConfig.debug;
  }

  static filterOnUrl() {
    LoopBackConfig.filterOn = 'url';
  }

  static filterOnHeaders() {
    LoopBackConfig.filterOn = 'headers';
  }

  static isHeadersFilteringSet() {
    return (LoopBackConfig.filterOn === 'headers');
  }

  static setSecureWebSockets() {
    LoopBackConfig.secure = true;
  }

  static unsetSecureWebSockets() {
    LoopBackConfig.secure = false;
  }

  static isSecureWebSocketsSet() {
    return LoopBackConfig.secure;
  }
}
