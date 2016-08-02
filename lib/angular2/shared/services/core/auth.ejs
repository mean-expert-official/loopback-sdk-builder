/* tslint:disable */
import { Injectable } from '@angular/core';
import { StorageDriver } from '../../storage/storage.driver';

@Injectable()
export class LoopBackAuth {
  protected accessTokenId: any;
  protected currentUserId: any;
  protected rememberMe: boolean;
  protected currentUserData: any;

  protected propsPrefix: string = '$LoopBack$';

  constructor() {
    this.accessTokenId = this.load("accessTokenId");
    this.currentUserId = this.load("currentUserId");
    this.rememberMe = this.load("rememberMe");
    this.currentUserData = null;
  }

  public setRememberMe(value: boolean): LoopBackAuth {
    this.rememberMe = value;
    return this;
  }

  public getCurrentUserId(): any {
    return this.currentUserId;
  }

  public setCurrentUserData(data: any): LoopBackAuth {
    this.currentUserData = data;
    return this;
  }

  public getCurrentUserData(): any {
    return this.currentUserData;
  }

  public getAccessTokenId(): any {
    return this.accessTokenId;
  }

  public save() {
    this.saveThis("accessTokenId", this.accessTokenId);
    this.saveThis("currentUserId", this.currentUserId);
    this.saveThis("rememberMe", this.rememberMe);
  };

  public setUser(accessTokenId: any, userId: any, userData: any) {
    this.accessTokenId = accessTokenId;
    this.currentUserId = userId;
    this.currentUserData = userData;
  }

  public clearUser() {
    this.accessTokenId = null;
    this.currentUserId = null;
    this.currentUserData = null;
  }

  public clearStorage() {
    StorageDriver.remove(this.propsPrefix + 'accessTokenId');
    StorageDriver.remove(this.propsPrefix + 'currentUserId');
    StorageDriver.remove(this.propsPrefix + 'rememberMe');
  };

  protected saveThis(name: string, value: any) {
    try {
      var key = this.propsPrefix + name;
      StorageDriver.set(key, value);
    }
    catch(err) {
      console.log('Cannot access local/session storage:', err);
    }
  }

  protected load(name: string): any {
    var key = this.propsPrefix + name;
    return StorageDriver.get(key);
  }
}
