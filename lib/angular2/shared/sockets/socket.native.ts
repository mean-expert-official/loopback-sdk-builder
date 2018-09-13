/* tslint:disable */
import * as SocketIO from 'nativescript-socket.io';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketNative
* @license MIT
* @description
* This module handle socket connections for nativescript apps, it will be DI Swapped
* depending on the platform environment.
* This module will be generated when the -d ng2native flag is set.
**/
export class SocketNative {
  /**
   * @method connect
   * @param {string} url URL path to connect with the server.
   * @param {any} options Any socket.io v1 =< valid options
   * @return {SocketIO.Socket}
   * @description
   * This method will return a valid socket connection.                    
   **/
  connect(url: string, options: any): SocketIO.SocketIO {
    return SocketIO.connect(url, options);
  }
}
