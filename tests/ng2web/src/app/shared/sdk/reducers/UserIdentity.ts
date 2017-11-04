/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { UserIdentity, UserIdentityInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { UserIdentityActionTypes } from '../actions';

export interface UserIdentitysState extends EntityState<UserIdentity | UserIdentityInterface> {};

export const UserIdentityAdapter: EntityAdapter<UserIdentity | UserIdentityInterface> = createEntityAdapter<UserIdentity | UserIdentityInterface>();

const initialState: UserIdentitysState = UserIdentityAdapter.getInitialState({});

const cases = BaseReducerFactory<UserIdentitysState, UserIdentity | UserIdentityInterface>(UserIdentityActionTypes, UserIdentityAdapter);

/**
 * @module UserIdentitysReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible UserIdentity reducer.
 */
export function UserIdentitysReducer(state = initialState, action: LoopbackAction): UserIdentitysState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getUserIdentitysState = (state: any) => state.UserIdentitys;
export const getUserIdentitysEntities = (state: any) => state.UserIdentitys.entities;
export const getUserIdentitysIds = (state: any) => state.UserIdentitys.ids;

export const getUserIdentitys =
  createSelector(getUserIdentitysEntities, getUserIdentitysIds, (entities, ids) => ids.map((id) => entities[id]));

export function getUserIdentityById(id: string) {
  return (state: any) => state.UserIdentitys.entities[id];
}

export function getUserIdentitysById(ids: string[]) {
  return createSelector(getUserIdentitysEntities, (entities) => ids.map((id) => entities[id]));
}
