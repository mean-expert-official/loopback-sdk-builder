/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description 
*/

import React, { Component as ReactComponent } from 'react';
// import { CookieBrowser } from './storage/cookie.browser';
// import { StorageBrowser } from './storage/storage.browser';
import * as Services from './services';
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';


export class Component extends ReactComponent {
  models = {};
  constructor(config) {
    super();
    config.services.forEach((service) => {
      if ( typeof this.services === 'object') this.services = {};
      this[service] = new Services[service]();
    });
  }
}
