/* tslint:disable */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as OrmModels from './models';
import * as models from '../models';

@Injectable()
export class Orm {
  public User: OrmModels.OrmUser;
  public Account: OrmModels.OrmAccount;
  public ApplicationCredential: OrmModels.OrmApplicationCredential;
  public Category: OrmModels.OrmCategory;
  public Core: OrmModels.OrmCore;
  public Like: OrmModels.OrmLike;
  public Message: OrmModels.OrmMessage;
  public Room: OrmModels.OrmRoom;
  public RoomAccount: OrmModels.OrmRoomAccount;
  public RoomAdmin: OrmModels.OrmRoomAdmin;
  public Storage: OrmModels.OrmStorage;
  public UserCredential: OrmModels.OrmUserCredential;
  public UserIdentity: OrmModels.OrmUserIdentity;

  constructor(
    private store: Store<any>
  ) {
    this.User = new OrmModels.OrmUser(store);
    this.Account = new OrmModels.OrmAccount(store);
    this.ApplicationCredential = new OrmModels.OrmApplicationCredential(store);
    this.Category = new OrmModels.OrmCategory(store);
    this.Core = new OrmModels.OrmCore(store);
    this.Like = new OrmModels.OrmLike(store);
    this.Message = new OrmModels.OrmMessage(store);
    this.Room = new OrmModels.OrmRoom(store);
    this.RoomAccount = new OrmModels.OrmRoomAccount(store);
    this.RoomAdmin = new OrmModels.OrmRoomAdmin(store);
    this.Storage = new OrmModels.OrmStorage(store);
    this.UserCredential = new OrmModels.OrmUserCredential(store);
    this.UserIdentity = new OrmModels.OrmUserIdentity(store);
  }
}
