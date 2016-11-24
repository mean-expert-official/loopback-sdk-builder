import { FireLoopRef } from './index';

export class FireLoop {

  private socket: any;
  private references: any = {};

  constructor(socket: any) { this.socket = socket; }

  public ref<T>(model: { getModelName(): string }): FireLoopRef<T> {
    let name: string = model.getModelName();
    if (this.references[name]) { return this.references[name]; }
    this.references[name] = new FireLoopRef<T>(name, this.socket);
    return this.references[name];
  }
}
