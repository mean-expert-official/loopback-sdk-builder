/* tslint:disable */
import { Injectable, Inject, NgZone } from '@angular/core';
import { SocketDriver } from './socket.driver';
import { AccessToken } from '../models';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LoopBackConfig } from '../lb.config';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web and NativeScript 2.
**/
@Injectable()
export class SocketConnection {
  private socket: any;
  private subjects: {
    onConnect: Subject<any>,
    onDisconnect: Subject<any>,
    onAuthenticated: Subject<any>,
    onUnAuthorized: Subject<any>
  } = {
    onConnect: new Subject(),
    onDisconnect: new Subject(),
    onAuthenticated: new Subject(),
    onUnAuthorized: new Subject()
  };
  public sharedObservables: {
    sharedOnConnect?: Observable<any>,
    sharedOnDisconnect?: Observable<any>,
    sharedOnAuthenticated?: Observable<any>,
    sharedOnUnAuthorized?: Observable<any>
  } = {};
  private unauthenticated: boolean = true;
  /**
   * @method constructor
   * @param driver
   * @param zone
   **/
  constructor(
    @Inject(SocketDriver) private driver: SocketDriver,
    @Inject(NgZone) private zone: NgZone
  ) {
    this.sharedObservables = {
      sharedOnConnect: this.subjects.onConnect.asObservable().share(),
      sharedOnDisconnect: this.subjects.onDisconnect.asObservable().share(),
      sharedOnAuthenticated: this.subjects.onAuthenticated.asObservable().share(),
      sharedOnUnAuthorized: this.subjects.onUnAuthorized.asObservable().share()
    };
    // This is needed to create the first channel, subsequents will share the connection
    // We are using Hot Observables to avoid duplicating connection status events.
    this.sharedObservables.sharedOnConnect.subscribe();
    this.sharedObservables.sharedOnDisconnect.subscribe();
    this.sharedObservables.sharedOnAuthenticated.subscribe();
    this.sharedObservables.sharedOnUnAuthorized.subscribe();
  }
  /**
   * @method connect
   * @param url string
   * @param token AccessToken
   * @description
   * This method will return a socket socket connection
   **/
  public connect(token: AccessToken = null): void {
    if (!this.socket) {
      console.info('Creating a new connection with: ', LoopBackConfig.getPath());
      // Create new socket connection
      this.socket = this.driver.connect(LoopBackConfig.getPath(), {
        log: false,
        secure: false,
        forceNew: true,
        forceWebsockets: true
      });
      // Listen for connection
      this.on('connect', () => {
        this.subjects.onConnect.next('connected');
        // Authenticate or start heartbeat now    
        this.emit('authentication', token);
      });
      // Listen for authentication
      this.on('authenticated', () => {
        this.subjects.onAuthenticated.next();
        this.heartbeater();
      })
      // Listen for authentication
      this.on('unauthorized', (err: any) => {
        this.subjects.onUnAuthorized.next(err);
      })
      // Listen for disconnections
      this.on('disconnect', (status: any) => this.subjects.onDisconnect.next(status));
    } else if (this.socket && !this.socket.connected){
      this.socket.off();
      this.socket.destroy();
      delete this.socket;
      this.connect(token);
    }
  }
  /**
   * @method isConnected
   * @description
   * This method will return true or false depending on established connections
   **/
  public isConnected(): boolean {
    return (this.socket && this.socket.connected);
  }
  /**
   * @method on
   * @description
   * This method will wrap the original "on" method and run it within the Angular Zone
   **/
  public on(event: string, handler: Function): void {
    this.socket.on(event, (data: any) => this.zone.run(() => handler(data)));
  }
  /**
   * @method emit
   * @description
   * This method will wrap the original "on" method and run it within the Angular Zone
   **/
  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }
  /**
   * @method removeListener
   * @description
   * This method will wrap the original "on" method and run it within the Angular Zone
   * Note: off is being used since the nativescript socket io client does not provide
   * removeListener method, but only provides with off.
   **/
  public removeListener(event: string, handler: Function): void {
    this.socket.off(event, handler);
  }
  /**
   * @method disconnect
   * @description
   * This will disconnect the client from the server
   **/
  public disconnect(): void {
    this.socket.disconnect();
  }
  /**
   * @method heartbeater
   * @description
   * This will keep the connection as active, even when users are not sending
   * data, this avoids disconnection because of a connection not being used.
   **/
  private heartbeater(): void {
    let heartbeater: any = setInterval(() => {
      if (this.socket && this.socket.connected) {
        this.socket.emit('lb-ping');
      } else {
        clearInterval(heartbeater);
      }
    }, 15000);
    this.socket.on('lb-pong', (data: any) => console.info('Heartbeat: ', data));
  }
}
