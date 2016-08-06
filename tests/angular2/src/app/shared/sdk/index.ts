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
  CategoryApi
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
  CategoryApi
];
export * from './models/index';
export * from './services/index';
export * from './lb.config';

