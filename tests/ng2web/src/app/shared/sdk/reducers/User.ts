/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { User, UserInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { UserActionTypes } from '../actions';

export interface UsersState extends EntityState<User | UserInterface> {};

export const UserAdapter: EntityAdapter<User | UserInterface> = createEntityAdapter<User | UserInterface>();

const initialState: UsersState = UserAdapter.getInitialState({});

const cases = BaseReducerFactory<UsersState, User | UserInterface>(UserActionTypes, UserAdapter);

/**
 * @module UsersReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible User reducer.
 */
export function UsersReducer(state = initialState, action: LoopbackAction): UsersState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getUsersState = (state: any) => state.Users;
export const getUsersEntities = (state: any) => state.Users.entities;
export const getUsersIds = (state: any) => state.Users.ids;

export const getUsers =
  createSelector(getUsersEntities, getUsersIds, (entities, ids) => ids.map((id) => entities[id]));

export function getUserById(id: string) {
  return (state: any) => state.Users.entities[id];
}

export function getUsersById(ids: string[]) {
  return createSelector(getUsersEntities, (entities) => ids.map((id) => entities[id]));
}
