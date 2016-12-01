/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Room } from '../../models/Room';
import { Message } from '../../models/Message';
import { ApplicationCredential } from '../../models/ApplicationCredential';
import { UserCredential } from '../../models/UserCredential';
import { UserIdentity } from '../../models/UserIdentity';
import { Category } from '../../models/Category';
import { Account } from '../../models/Account';
import { RoomAccount } from '../../models/RoomAccount';
import { Storage } from '../../models/Storage';
import { Core } from '../../models/Core';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    User: User,
    Room: Room,
    Message: Message,
    ApplicationCredential: ApplicationCredential,
    UserCredential: UserCredential,
    UserIdentity: UserIdentity,
    Category: Category,
    Account: Account,
    RoomAccount: RoomAccount,
    Storage: Storage,
    Core: Core,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}
