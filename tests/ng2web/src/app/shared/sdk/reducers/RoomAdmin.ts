/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { RoomAdmin } from '../models';
import { RoomAdminActionTypes } from '../actions';

export interface RoomAdminsState {
  ids: string[];
  entities: { [id: string]: RoomAdmin };
};

const initialState: RoomAdminsState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<RoomAdminsState, RoomAdmin>(RoomAdminActionTypes);

/**
 * @module RoomAdminsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible RoomAdmin reducer.
 */
export function RoomAdminsReducer(state = initialState, action: Action): RoomAdminsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getRoomAdminsState = (state: any) => state.RoomAdmins;
export const getRoomAdminsEntities = (state: any) => state.RoomAdmins.entities;
export const getRoomAdminsIds = (state: any) => state.RoomAdmins.ids;

export const getRoomAdmins =
  createSelector(getRoomAdminsEntities, getRoomAdminsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getRoomAdminById(id: string) {
  return (state: any) => state.RoomAdmins.entities[id];
}

export function getRoomAdminsById(ids: string[]) {
  return createSelector(getRoomAdminsEntities, (entities) => ids.map((id) => entities[id]));
}