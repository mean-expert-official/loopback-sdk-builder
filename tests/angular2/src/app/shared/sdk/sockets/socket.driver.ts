/* tslint:disable */
import * as io from 'socket.io-client';
export class SocketDriver {
  static connect(url, options) {
    return io(url, options);
  }
}
