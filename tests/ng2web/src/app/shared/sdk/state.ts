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
  auth: SDKToken;
};

export const LoopbackReducer = {
  loopbackAuth: reducers.LoopbackAuthReducer
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
