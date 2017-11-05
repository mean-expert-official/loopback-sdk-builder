/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Room, RoomInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { RoomActionTypes } from '../actions';

export interface RoomsState extends EntityState<Room | RoomInterface> {};

export const RoomAdapter: EntityAdapter<Room | RoomInterface> = createEntityAdapter<Room | RoomInterface>();

const initialState: RoomsState = RoomAdapter.getInitialState({});

const cases = BaseReducerFactory<RoomsState, Room | RoomInterface>(RoomActionTypes, RoomAdapter);

/**
 * @module RoomsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Room reducer.
 */
export function RoomsReducer(state = initialState, action: LoopbackAction): RoomsState {
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
