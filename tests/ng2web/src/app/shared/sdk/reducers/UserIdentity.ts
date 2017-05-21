import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { UserIdentity } from '../models';
import { UserIdentityActionTypes } from '../actions';

export interface UserIdentityState {
  ids: string[];
  entities: { [id: string]: UserIdentity };
};

const initialState: UserIdentityState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<UserIdentityState, UserIdentity>(UserIdentityActionTypes);

/**
 * @module UserIdentitysReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible UserIdentity reducer.
 */
export function UserIdentitysReducer(state = initialState, action: Action): UserIdentityState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getUserIdentitysState = (state: any) => state.UserIdentity;
export const getUserIdentitysEntities = (state: any) => state.UserIdentity.entities;
export const getUserIdentitysIds = (state: any) => state.UserIdentity.ids;

export const getUserIdentitys =
  createSelector(getUserIdentitysEntities, getUserIdentitysIds, (entities, ids) => ids.map((id) => entities[id]));

export function getUserIdentityById(id: string) {
  return (state: any) => state.UserIdentity.entities[id];
}

export function getUserIdentitysById(ids: string[]) {
  return createSelector(getUserIdentitysEntities, (entities) => ids.map((id) => entities[id]));
}