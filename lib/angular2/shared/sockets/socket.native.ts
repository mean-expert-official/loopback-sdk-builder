/* tslint:disable */
var SocketIO = require('nativescript-socket.io');
export class SocketNative {
  connect(url: any, options: any) {
    return SocketIO.connect(url, options);
  }
}
