/* tslint:disable */
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { RoomCategory } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { RoomCategoryActionTypes } from '../actions';

export interface RoomCategorysState {
  ids: string[];
  entities: { [id: string]: RoomCategory };
};

const initialState: RoomCategorysState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<RoomCategorysState, RoomCategory>(RoomCategoryActionTypes);

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