/* tslint:disable */
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { User } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { UserActionTypes } from '../actions';

export interface UsersState {
  ids: string[];
  entities: { [id: string]: User };
};

const initialState: UsersState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<UsersState, User>(UserActionTypes);

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