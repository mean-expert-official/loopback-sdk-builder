import { ActionReducer, ActionReducerMap, MetaReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InjectionToken } from '@angular/core';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import { LoopbackStateInterface, LoopbackReducer, LoopbackEffects } from './sdk/index';

import * as fromApp from './app.reducer';

import { AppEffects } from './app.effects';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface IAppState extends LoopbackStateInterface {
  app: fromApp.IAppState;
}

export const effects = [
  ...LoopbackEffects,
  AppEffects,
];

export const reducers: ActionReducerMap<IAppState> = Object.assign(LoopbackReducer, {
  app: fromApp.reducer
});

export const reducerToken = new InjectionToken<ActionReducerMap<IAppState>>('Reducers');

export function getReducers() {
    return reducers;
}

export const reducerProvider = [
    { provide: reducerToken, useFactory: getReducers }
];

export const getApplicationState = createFeatureSelector<fromApp.IAppState>('app');
