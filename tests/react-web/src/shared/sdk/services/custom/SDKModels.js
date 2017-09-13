import { Account } from '../../models/Account';
import { Core } from '../../models/Core';
import { Room } from '../../models/Room';
import { User } from '../../models/User';

export class SDKModels {
  models = {
    Account: Account,
    Room: Room,
    User: User,
    Core: Core,
  };

   get(modelName) {
    return this.models[modelName];
  }

   getAll() {
    return this.models;
  }

   getModelNames() {
    return Object.keys(this.models);
  }
}
