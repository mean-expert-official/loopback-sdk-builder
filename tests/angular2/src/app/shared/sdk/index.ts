/* tslint:disable */
import { HTTP_PROVIDERS } from '@angular/http';
import {
  LoopBackAuth,
  ErrorHandler,
  LoggerService,
  JSONSearchParams,
  UserApi,
  RoomApi,
  MessageApi,
  LikeApi,
  ApplicationCredentialApi,
  UserCredentialApi,
  UserIdentityApi
} from './services/index'
export const API_PROVIDERS: any[] = [
	HTTP_PROVIDERS,
	LoopBackAuth,
	ErrorHandler,
	LoggerService,
  JSONSearchParams,
  UserApi,
  RoomApi,
  MessageApi,
  LikeApi,
  ApplicationCredentialApi,
  UserCredentialApi,
  UserIdentityApi
];
export * from './models/index';
export * from './services/index';
export * from './lb.config';

