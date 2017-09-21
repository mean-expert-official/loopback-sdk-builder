import { User } from '../../models/User';
import { Account } from '../../models/Account';
import { ApplicationCredential } from '../../models/ApplicationCredential';
import { Category } from '../../models/Category';
import { Core } from '../../models/Core';
import { Like } from '../../models/Like';
import { Message } from '../../models/Message';
import { Room } from '../../models/Room';
import { RoomAccount } from '../../models/RoomAccount';
import { RoomAdmin } from '../../models/RoomAdmin';
import { Storage } from '../../models/Storage';
import { UserCredential } from '../../models/UserCredential';
import { UserIdentity } from '../../models/UserIdentity';
export class SDKModels {
  models = {
    User: User,
    Account: Account,
    ApplicationCredential: ApplicationCredential,
    Category: Category,
    Core: Core,
    Like: Like,
    Message: Message,
    Room: Room,
    RoomAccount: RoomAccount,
    RoomAdmin: RoomAdmin,
    Storage: Storage,
    UserCredential: UserCredential,
    UserIdentity: UserIdentity,
    
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
