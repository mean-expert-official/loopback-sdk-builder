import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { UserCredential } from '../models';
import { UserCredentialActionTypes } from '../actions';

export interface UserCredentialState {
  ids: string[];
  entities: { [id: string]: UserCredential };
};

const initialState: UserCredentialState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<UserCredentialState, UserCredential>(UserCredentialActionTypes);

/**
 * @module UserCredentialsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible UserCredential reducer.
 */
export function UserCredentialsReducer(state = initialState, action: Action): UserCredentialState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getUserCredentialsState = (state: any) => state.UserCredential;
export const getUserCredentialsEntities = (state: any) => state.UserCredential.entities;
export const getUserCredentialsIds = (state: any) => state.UserCredential.ids;

export const getUserCredentials =
  createSelector(getUserCredentialsEntities, getUserCredentialsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getUserCredentialById(id: string) {
  return (state: any) => state.UserCredential.entities[id];
}

export function getUserCredentialsById(ids: string[]) {
  return createSelector(getUserCredentialsEntities, (entities) => ids.map((id) => entities[id]));
}