import { SocketDriver } from './socket.driver';
export class SocketConnections {
  private static connections = {};
  static getHandler(url, token: { id: any, userId: any }) {
    if (!SocketConnections.connections[url]) {
      console.log('Trying to make connection with: ', url);
      SocketConnections.connections[url] = SocketDriver.connect(url, {
          log: false,
          secure: false,
          forceWebsockets: true,
      });
      SocketConnections.connections[url].on('connect', () => {
        console.log('Connected to %s', url);
        SocketConnections.connections[url].emit('authentication', token);
        SocketConnections.connections[url].on('unauthorized', res => console.error('Unauthenticated', res));
      });
    } else {
      console.log('Returning existing connection for: ', url);
    }
    return SocketConnections.connections[url];
  }
}