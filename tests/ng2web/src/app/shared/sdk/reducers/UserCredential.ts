/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { UserCredential, UserCredentialInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { UserCredentialActionTypes } from '../actions';

export interface UserCredentialsState extends EntityState<UserCredential | UserCredentialInterface> {};

export const UserCredentialAdapter: EntityAdapter<UserCredential | UserCredentialInterface> = createEntityAdapter<UserCredential | UserCredentialInterface>();

const initialState: UserCredentialsState = UserCredentialAdapter.getInitialState({});

const cases = BaseReducerFactory<UserCredentialsState, UserCredential | UserCredentialInterface>(UserCredentialActionTypes, UserCredentialAdapter);

/**
 * @module UserCredentialsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible UserCredential reducer.
 */
export function UserCredentialsReducer(state = initialState, action: LoopbackAction): UserCredentialsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getUserCredentialsState = (state: any) => state.UserCredentials;
export const getUserCredentialsEntities = (state: any) => state.UserCredentials.entities;
export const getUserCredentialsIds = (state: any) => state.UserCredentials.ids;

export const getUserCredentials =
  createSelector(getUserCredentialsEntities, getUserCredentialsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getUserCredentialById(id: string) {
  return (state: any) => state.UserCredentials.entities[id];
}

export function getUserCredentialsById(ids: string[]) {
  return createSelector(getUserCredentialsEntities, (entities) => ids.map((id) => entities[id]));
}
