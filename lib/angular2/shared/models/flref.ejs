import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LoopBackConfig } from '../lb.config';
import { AccessToken, LoopBackFilter } from './index';
import { SocketConnections } from '../sockets/socket.connections';

export class FireLoopRef<T> {

  private instance: any;
  private socket: any;
  private name: string;
  private parent: FireLoopRef<T>;
  private childs: any = {};
  private observables: any = {};

  constructor(name: string, socket: any, parent: FireLoopRef<any> = null) {
    this.name   = name;
    this.parent = parent;
    this.socket = socket;
    return this;
  }
  
  public upsert(data: any): Observable<T> {
    let id: number = Math.floor(Math.random() * 100800) *
                     Math.floor(Math.random() * 100700) *
                     Math.floor(Math.random() * 198500);
    let request: any = {
        event: `${this.name}.upsert`,
        data : {
          id     : id,
          data   : data,
          parent : this.parent && this.parent.instance ? this.parent.instance : null
        }
    };
    let subject: Subject<T> = new Subject<T>();
    this.socket.emit('ME:RT:1://event', request);
    this.socket.on(`${this.name}.value.result.${id}`, (res: any) =>
      subject.next(res.error ? Observable.throw(res.error) : res)
    );
    return subject.asObservable();
  }

  public on(event: string, filter: LoopBackFilter = { limit: 100 }): Observable<T | T[]> {
    event = `${this.name}.${event}`;
    if (this.observables[event]) { return this.observables[event]; }
    let subject: Subject<T> = new Subject<T>();
    if (event.match(/(value)/))
    this.pull(event, filter, subject);
    // Listen for broadcast announces
    this.socket.on(
      // When there is a broadcast announce
      `${event}.broadcast.announce`,
      // We send a request containing the filtering options
      () => this.socket.emit(`${event}.broadcast.request`, filter)
    );
    // Once processed our request will return a unique result
    this.socket.on(`${event}.broadcast`, (res: any) => subject.next(res));
    this.observables[event] = subject.asObservable();
    return this.observables[event];
  }

  private pull(event: string, filter: any, subject: Subject<T>): void {
    this.socket.emit(`${event}.pull.request`, filter);
    this.socket.on(`${event}.pull.requested`, (res: any) => subject.next(res));
  }

  public make(instance: any): FireLoopRef<T> {
    this.instance = instance;
    return this;
  }

  public child<T>(name: string): FireLoopRef<T> {
    if (!this.parent) {
      let childName = `${this.name}.${name}`;
      if (this.childs[childName]) { return this.childs[childName]; }
      this.childs[childName] = new FireLoopRef<T>(childName, this.socket, this);
      return this.childs[childName];
    } else {
      console.warn('Only 1 child level is supported');
      // TODO ADD UNLIMITED LEVELS
    }
  }
}