/* tslint:disable */
import { SDKToken } from './models/BaseModels';

import * as reducers from './reducers/index';

import { LoopbackAuthEffects } from './effects/auth';
import { UserEffects } from './effects/User';
import { AccountEffects } from './effects/Account';
import { ApplicationCredentialEffects } from './effects/ApplicationCredential';
import { CategoryEffects } from './effects/Category';
import { CoreEffects } from './effects/Core';
import { LikeEffects } from './effects/Like';
import { MessageEffects } from './effects/Message';
import { RoomEffects } from './effects/Room';
import { RoomAccountEffects } from './effects/RoomAccount';
import { RoomAdminEffects } from './effects/RoomAdmin';
import { StorageEffects } from './effects/Storage';
import { UserCredentialEffects } from './effects/UserCredential';
import { UserIdentityEffects } from './effects/UserIdentity';

export interface LoopbackStateInterface {
  LoopbackAuth: SDKToken;
  Users: reducers.UsersState;
  Accounts: reducers.AccountsState;
  ApplicationCredentials: reducers.ApplicationCredentialsState;
  Categorys: reducers.CategorysState;
  Cores: reducers.CoresState;
  Likes: reducers.LikesState;
  Messages: reducers.MessagesState;
  Rooms: reducers.RoomsState;
  RoomAccounts: reducers.RoomAccountsState;
  RoomAdmins: reducers.RoomAdminsState;
  Storages: reducers.StoragesState;
  UserCredentials: reducers.UserCredentialsState;
  UserIdentitys: reducers.UserIdentitysState;
};

export const LoopbackReducer = {
  LoopbackAuth: reducers.LoopbackAuthReducer,
	Users: reducers.UsersReducer,
	Accounts: reducers.AccountsReducer,
	ApplicationCredentials: reducers.ApplicationCredentialsReducer,
	Categorys: reducers.CategorysReducer,
	Cores: reducers.CoresReducer,
	Likes: reducers.LikesReducer,
	Messages: reducers.MessagesReducer,
	Rooms: reducers.RoomsReducer,
	RoomAccounts: reducers.RoomAccountsReducer,
	RoomAdmins: reducers.RoomAdminsReducer,
	Storages: reducers.StoragesReducer,
	UserCredentials: reducers.UserCredentialsReducer,
	UserIdentitys: reducers.UserIdentitysReducer,
	RoomCategorys: reducers.RoomCategorysReducer,
};

export const LoopbackEffects = [
  LoopbackAuthEffects,
  UserEffects,
  AccountEffects,
  ApplicationCredentialEffects,
  CategoryEffects,
  CoreEffects,
  LikeEffects,
  MessageEffects,
  RoomEffects,
  RoomAccountEffects,
  RoomAdminEffects,
  StorageEffects,
  UserCredentialEffects,
  UserIdentityEffects,
];
