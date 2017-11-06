/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { RoomAccount, RoomAccountInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { RoomAccountActionTypes } from '../actions';

export interface RoomAccountsState extends EntityState<RoomAccount | RoomAccountInterface> {};

export const RoomAccountAdapter: EntityAdapter<RoomAccount | RoomAccountInterface> = createEntityAdapter<RoomAccount | RoomAccountInterface>();

const initialState: RoomAccountsState = RoomAccountAdapter.getInitialState({});

const cases = BaseReducerFactory<RoomAccountsState, RoomAccount | RoomAccountInterface>(RoomAccountActionTypes, RoomAccountAdapter);

/**
 * @module RoomAccountsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible RoomAccount reducer.
 */
export function RoomAccountsReducer(state = initialState, action: LoopbackAction): RoomAccountsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getRoomAccountsState = (state: any) => state.RoomAccounts;
export const getRoomAccountsEntities = (state: any) => state.RoomAccounts.entities;
export const getRoomAccountsIds = (state: any) => state.RoomAccounts.ids;

export const getRoomAccounts =
  createSelector(getRoomAccountsEntities, getRoomAccountsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getRoomAccountById(id: string) {
  return (state: any) => state.RoomAccounts.entities[id];
}

export function getRoomAccountsById(ids: string[]) {
  return createSelector(getRoomAccountsEntities, (entities) => ids.map((id) => entities[id]));
}
