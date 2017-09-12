import { FireLoopRef } from './index';

export class FireLoop {

  references = {};

  constructor(socket, models) {}

  ref(model) {
    let name = model.getModelName();
    model.models = this.models;
    this.references[name] = new FireLoopRef(model, this.socket);
    return this.references[name];
  }
}
