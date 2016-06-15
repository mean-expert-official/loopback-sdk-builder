/* tslint:disable */
import { Injectable } from '@angular/core';
import * as AppSettings from 'application-settings';

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
    this.saveThis("accessTokenId", null);
    this.saveThis("accessTokenId", null);
    this.saveThis("currentUserId", null);
    this.saveThis("currentUserId", null);
    this.saveThis("rememberMe", null);
    this.saveThis("rememberMe", null);
  };

  // Note: LocalStorage converts the value to string
  // We are using empty string as a marker for null/undefined values.
  protected saveThis(name: string, value: any) {
    try {
      var key = this.propsPrefix + name;
      if (value == null) {
        value = '';
      }
      AppSettings.setString(key, String(value));
    }
    catch(err) {
      console.log('Cannot access local/session storage:', err);
    }
  }

  protected load(name: string): any {
    var key = this.propsPrefix + name;
    return AppSettings.getString(key);
  }
}