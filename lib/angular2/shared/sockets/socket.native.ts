/* tslint:disable */
import * as SocketIO from 'nativescript-socket.io';
export class SocketNative {
  connect(url: any, options: any): SocketIO.Socket {
    return SocketIO.connect(url, options);
  }
}
