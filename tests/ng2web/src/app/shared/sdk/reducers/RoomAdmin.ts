import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { RoomAdmin } from '../models';
import { RoomAdminActionTypes } from '../actions';

export interface RoomAdminState {
  ids: string[];
  entities: { [id: string]: RoomAdmin };
};

const initialState: RoomAdminState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<RoomAdminState, RoomAdmin>(RoomAdminActionTypes);

/**
 * @module RoomAdminsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible RoomAdmin reducer.
 */
export function RoomAdminsReducer(state = initialState, action: Action): RoomAdminState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getRoomAdminsState = (state: any) => state.RoomAdmin;
export const getRoomAdminsEntities = (state: any) => state.RoomAdmin.entities;
export const getRoomAdminsIds = (state: any) => state.RoomAdmin.ids;

export const getRoomAdmins =
  createSelector(getRoomAdminsEntities, getRoomAdminsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getRoomAdminById(id: string) {
  return (state: any) => state.RoomAdmin.entities[id];
}

export function getRoomAdminsById(ids: string[]) {
  return createSelector(getRoomAdminsEntities, (entities) => ids.map((id) => entities[id]));
}