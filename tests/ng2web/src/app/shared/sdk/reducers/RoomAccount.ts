import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { RoomAccount } from '../models';
import { RoomAccountActionTypes } from '../actions';

export interface RoomAccountState {
  ids: string[];
  entities: { [id: string]: RoomAccount };
};

const initialState: RoomAccountState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<RoomAccountState, RoomAccount>(RoomAccountActionTypes);

/**
 * @module RoomAccountsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible RoomAccount reducer.
 */
export function RoomAccountsReducer(state = initialState, action: Action): RoomAccountState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getRoomAccountsState = (state: any) => state.RoomAccount;
export const getRoomAccountsEntities = (state: any) => state.RoomAccount.entities;
export const getRoomAccountsIds = (state: any) => state.RoomAccount.ids;

export const getRoomAccounts =
  createSelector(getRoomAccountsEntities, getRoomAccountsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getRoomAccountById(id: string) {
  return (state: any) => state.RoomAccount.entities[id];
}

export function getRoomAccountsById(ids: string[]) {
  return createSelector(getRoomAccountsEntities, (entities) => ids.map((id) => entities[id]));
}