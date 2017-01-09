import { Injectable, Inject } from '@angular/core';
import { IO } from './io.service';
import { JSONSearchParams } from './search.params';
import { LoopBackAuth } from './auth.service';
import { LoopBackConfig } from '../../lb.config';
import { FireLoop } from '../../models/FireLoop';
import { SocketConnection } from '../../sockets/socket.connections';
import { SDKModels } from '../custom/SDKModels';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module RealTime
* @license MIT
* @description
* This module is a real-time interface for using socket connections, its main purpose
* is to make sure that when there is a valid connection, it will create instances
* of the different real-time functionalities like FireLoop, PubSub and IO.
**/
@Injectable()
export class RealTime {

  public IO: IO;
  public FireLoop: FireLoop;
  private connecting: boolean = false;
  private onReadySubject: Subject<string> = new Subject<string>();
  private sharedOnReady: Observable<string> = this.onReadySubject.asObservable().share();

  constructor(
    @Inject(SocketConnection) public connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams
  ) {
    this.sharedOnReady.subscribe();
  }
  /**
  * @method onDisconnect
  * @description
  * Will trigger when Real-Time Service is disconnected from server.
  **/
  onDisconnect(): Observable<any> {
    return this.connection.sharedObservables.sharedOnDisconnect;
  }
  /**
  * @method onAuthenticated
  * @description
  * Will trigger when Real-Time Service is not authorized from server.
  **/
  onAuthenticated(): Observable<any> {
    return this.connection.sharedObservables.sharedOnAuthenticated;
  }
  /**
  * @method onUnAuthorized
  * @description
  * Will trigger when Real-Time Service is not authorized from server.
  **/
  onUnAuthorized(): Observable<any> {
    return this.connection.sharedObservables.sharedOnUnAuthorized;
  }
  /**
  * @method onReady
  * @description
  * Will trigger when Real-Time Service is Ready for broadcasting.
  * and will register connection flow events to notify subscribers.
  **/
  public onReady(): Observable<string> {
    if (this.connection.isConnected()) {
      // Send back to the event loop so it executes after subscription
      let to = setTimeout(() => {
        this.onReadySubject.next();
        clearTimeout(to);
      });
    } else if (this.connecting) {
      let ti = setInterval(() => {
        if (this.connection.isConnected()) {
          this.onReadySubject.next();
          clearInterval(ti);
        }
      }, 500);

    } else {
      this.connecting = true;
      this.connection.connect(this.auth.getToken());
      this.IO       = new IO(this.connection);
      this.FireLoop = new FireLoop(this.connection, this.models);
      // Fire event for those subscribed 
      let s1: Subscription = this.connection.sharedObservables.sharedOnConnect.subscribe(() => {
        console.log('Real-Time connection has been established');
        this.connecting = false;
        this.onReadySubject.next('connected');
        let s2: Subscription = this.connection.sharedObservables.sharedOnDisconnect.subscribe(() => {
          s1.unsubscribe();
          s2.unsubscribe();
        });
      });
    }
    return this.sharedOnReady;
  }
}
