import { Injectable, Inject } from '@angular/core';
import { IO } from './io.service';
import { JSONSearchParams } from './search.params';
import { LoopBackAuth } from './auth.service';
import { LoopBackConfig } from '../../lb.config';
import { FireLoop } from '../../models/FireLoop';
import { SocketConnections } from '../../sockets/socket.connections';

@Injectable()
export class RealTime {

  public IO: IO;
  public FireLoop: FireLoop;

  constructor(
    @Inject(SocketConnections) protected connections: SocketConnections,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams
  ) {
    let socket: any  = this.getConnection();
    this.IO          = new IO(socket);
    this.FireLoop    = new FireLoop(socket);
  }

  getConnection(): void {
    return this.connections.getHandler(LoopBackConfig.getPath(), this.auth.getToken());
  }
}
