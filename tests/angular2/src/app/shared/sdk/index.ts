/* tslint:disable */
import { HTTP_PROVIDERS } from '@angular/http';
import {
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
  StorageApi
} from './services/index'
export const API_PROVIDERS: any[] = [
	HTTP_PROVIDERS,
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
  StorageApi
];
export * from './models/index';
export * from './services/index';
export * from './lb.config';

