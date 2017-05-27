/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { ActionReducer } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SDKToken } from './models/BaseModels';

import * as reducers from './reducers/index';

import * as effects from './effects/index';

export interface LoopbackStateInterface {
  loopbackAuth: SDKToken;
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
  loopbackAuth: reducers.LoopbackAuthReducer,
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
};

export const LoopbackEffects = [
  EffectsModule.run(effects.LoopbackAuthEffects),
	EffectsModule.run(effects.UserEffects),
	EffectsModule.run(effects.AccountEffects),
	EffectsModule.run(effects.ApplicationCredentialEffects),
	EffectsModule.run(effects.CategoryEffects),
	EffectsModule.run(effects.CoreEffects),
	EffectsModule.run(effects.LikeEffects),
	EffectsModule.run(effects.MessageEffects),
	EffectsModule.run(effects.RoomEffects),
	EffectsModule.run(effects.RoomAccountEffects),
	EffectsModule.run(effects.RoomAdminEffects),
	EffectsModule.run(effects.StorageEffects),
	EffectsModule.run(effects.UserCredentialEffects),
	EffectsModule.run(effects.UserIdentityEffects),
];
