/* tslint:disable */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as OrmModels from './models';
import * as models from '../models';

import { RealTime } from '../services';


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

  constructor(public store: Store<any>, protected realTime?: RealTime) {
    this.User = new OrmModels.OrmUser(store, realTime);
    this.Account = new OrmModels.OrmAccount(store, realTime);
    this.ApplicationCredential = new OrmModels.OrmApplicationCredential(store, realTime);
    this.Category = new OrmModels.OrmCategory(store, realTime);
    this.Core = new OrmModels.OrmCore(store, realTime);
    this.Like = new OrmModels.OrmLike(store, realTime);
    this.Message = new OrmModels.OrmMessage(store, realTime);
    this.Room = new OrmModels.OrmRoom(store, realTime);
    this.RoomAccount = new OrmModels.OrmRoomAccount(store, realTime);
    this.RoomAdmin = new OrmModels.OrmRoomAdmin(store, realTime);
    this.Storage = new OrmModels.OrmStorage(store, realTime);
    this.UserCredential = new OrmModels.OrmUserCredential(store, realTime);
    this.UserIdentity = new OrmModels.OrmUserIdentity(store, realTime);
  }
}
