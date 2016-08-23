/**
* @module SDK Index
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MTI 2016 Jonathan Casarrubias
* @description
* The SDK Index is automatically built by the LoopBack SDK Builder.
*
* The SDK Index will temporally keep providing access to everything in the SDK
* including services. This is because will maintain backwards compatibility for those
* Applications below Angular 2 RC 5 version that does not support NgModule just yet.
*
* IMPORTANT NOTE:
*
* If your application is equal or above RC 5 It is recommended to import the SDK
* Module located in ./sdk.module.ts and follow the instructions.
*
* Also, It is recommended for you to start upgrading your application in order to
* support NgModules before backwards support is also dropped by Angular.
*
* READ: https://angular.io/docs/ts/latest/cookbook/rc4-to-rc5.html#!#5-cleanup
**/

import { HTTP_PROVIDERS } from '@angular/http';
import { LoopBackAuth } from './services/core/auth.service';
import { ErrorHandler } from './services/core/error.service';
import { LoggerService } from './services/core/logger.service';
import { JSONSearchParams } from './services/core/search.params';
import { UserApi } from './services/custom/User';
import { RoomApi } from './services/custom/Room';
import { LikeApi } from './services/custom/Like';
import { ApplicationCredentialApi } from './services/custom/ApplicationCredential';
import { UserCredentialApi } from './services/custom/UserCredential';
import { UserIdentityApi } from './services/custom/UserIdentity';
import { CategoryApi } from './services/custom/Category';
import { AccountApi } from './services/custom/Account';
import { RoomAccountApi } from './services/custom/RoomAccount';
import { StorageApi } from './services/custom/Storage';
/**
* IMPORTANT: API_PROVIDERS WILL BE DEPRECATED WHEN ANGULAR 2 IS STABLE
* PLEASE MIGRATE YOUR PROJECT AS SOON AS POSSIBLE.
* ONCE ANGULAR 2 IS STABLE I WON'T KEEP SUPPORTING API PROVIDERS.
* USER NGMODULE INSTEAD LOCATED IN ./sdk.module.ts
**/
export const API_PROVIDERS: any[] = [
  LoopBackAuth,
  ErrorHandler,
  LoggerService,
  JSONSearchParams,
  UserApi,
  RoomApi,
  LikeApi,
  ApplicationCredentialApi,
  UserCredentialApi,
  UserIdentityApi,
  CategoryApi,
  AccountApi,
  RoomAccountApi,
  StorageApi,
  CoreApi
];
export * from './models/index';
export * from './services/index';
export * from './lb.config';
