/* tslint:disable */
import { Injectable, Inject } from '@angular/core';
import { SocketDriver } from './socket.driver';
import { AccessToken } from '../models';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module SocketConnections
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web and NativeScript 2.
**/
@Injectable()
export class SocketConnections {
  private connections: any = {};
  private configured: boolean  = false;
  constructor(@Inject(SocketDriver) private driver: SocketDriver) {}
  getHandler(url: string, token: AccessToken) {
    if (!this.connections[url]) {
      console.log('Creating a new connection with: ', url);
      let config: any = { log: false, secure: false, forceWebsockets: true };
      this.connections[url] = this.driver.connect(url, config);
      this.connections[url].on('connect', () => {
        if (!this.configured) 
        this.setupConnection(url, token, config);
      });
      let forceConfig: any = setInterval(() => {
        if (!this.configured && this.connections[url].connected) {
          console.info('Forcing IO Configuration');
          this.setupConnection(url, token, config);
          clearInterval(forceConfig);
        } else if (this.configured) {
          clearInterval(forceConfig);
        }
      }, 1000)
    } else {
      console.log('Reusing existing connection: ', url);
    }
    return this.connections[url];
  }

  private setupConnection(url: string, token: AccessToken, config: any): void {
    this.configured = true;
    console.log('Connected to %s', url);
    if(token.id) {
      this.connections[url].emit('authentication', token);
    }
    this.connections[url].on('unauthorized', (res: any) => console.error('Unauthenticated', res));
    setInterval(() => this.connections[url].emit('lb-ping'), 15000);
    this.connections[url].on('lb-pong', (data: any) => console.info('Heartbeat: ', data));
    this.connections[url].on('disconnect', (data: any) => {
      console.info('Unexpected disconnection from IO - Socket IO will try to reconnect');
    });
  }
}
