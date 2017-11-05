/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { RoomAdmin, RoomAdminInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { RoomAdminActionTypes } from '../actions';

export interface RoomAdminsState extends EntityState<RoomAdmin | RoomAdminInterface> {};

export const RoomAdminAdapter: EntityAdapter<RoomAdmin | RoomAdminInterface> = createEntityAdapter<RoomAdmin | RoomAdminInterface>();

const initialState: RoomAdminsState = RoomAdminAdapter.getInitialState({});

const cases = BaseReducerFactory<RoomAdminsState, RoomAdmin | RoomAdminInterface>(RoomAdminActionTypes, RoomAdminAdapter);

/**
 * @module RoomAdminsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible RoomAdmin reducer.
 */
export function RoomAdminsReducer(state = initialState, action: LoopbackAction): RoomAdminsState {
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
