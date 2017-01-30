/* tslint:disable */
import { Injectable } from '@angular/core';
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

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
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

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
