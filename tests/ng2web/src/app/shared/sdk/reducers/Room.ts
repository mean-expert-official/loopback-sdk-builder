/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Room } from '../models';
import { RoomActionTypes } from '../actions';

export interface RoomsState {
  ids: string[];
  entities: { [id: string]: Room };
};

const initialState: RoomsState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<RoomsState, Room>(RoomActionTypes);

/**
 * @module RoomsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Room reducer.
 */
export function RoomsReducer(state = initialState, action: Action): RoomsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getRoomsState = (state: any) => state.Rooms;
export const getRoomsEntities = (state: any) => state.Rooms.entities;
export const getRoomsIds = (state: any) => state.Rooms.ids;

export const getRooms =
  createSelector(getRoomsEntities, getRoomsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getRoomById(id: string) {
  return (state: any) => state.Rooms.entities[id];
}

export function getRoomsById(ids: string[]) {
  return createSelector(getRoomsEntities, (entities) => ids.map((id) => entities[id]));
}