/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { RoomCategory, RoomCategoryInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { RoomCategoryActionTypes } from '../actions';

export interface RoomCategorysState extends EntityState<RoomCategory | RoomCategoryInterface> {};

export const RoomCategoryAdapter: EntityAdapter<RoomCategory | RoomCategoryInterface> = createEntityAdapter<RoomCategory | RoomCategoryInterface>();

const initialState: RoomCategorysState = RoomCategoryAdapter.getInitialState({});

const cases = BaseReducerFactory<RoomCategorysState, RoomCategory | RoomCategoryInterface>(RoomCategoryActionTypes, RoomCategoryAdapter);

/**
 * @module RoomCategorysReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible RoomCategory reducer.
 */
export function RoomCategorysReducer(state = initialState, action: LoopbackAction): RoomCategorysState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getRoomCategorysState = (state: any) => state.RoomCategorys;
export const getRoomCategorysEntities = (state: any) => state.RoomCategorys.entities;
export const getRoomCategorysIds = (state: any) => state.RoomCategorys.ids;

export const getRoomCategorys =
  createSelector(getRoomCategorysEntities, getRoomCategorysIds, (entities, ids) => ids.map((id) => entities[id]));

export function getRoomCategoryById(id: string) {
  return (state: any) => state.RoomCategorys.entities[id];
}

export function getRoomCategorysById(ids: string[]) {
  return createSelector(getRoomCategorysEntities, (entities) => ids.map((id) => entities[id]));
}
