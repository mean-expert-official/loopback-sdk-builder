/* tslint:disable */
import * as io from 'socket.io-client';
export class SocketNode {
  connect(url: any, options: any) {
    return io(url, options);
  }
}
