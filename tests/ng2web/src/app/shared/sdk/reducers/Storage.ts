import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Storage } from '../models';
import { StorageActionTypes } from '../actions';

export interface StorageState {
  ids: string[];
  entities: { [id: string]: Storage };
};

const initialState: StorageState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<StorageState, Storage>(StorageActionTypes);

/**
 * @module StoragesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Storage reducer.
 */
export function StoragesReducer(state = initialState, action: Action): StorageState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getStoragesState = (state: any) => state.Storage;
export const getStoragesEntities = (state: any) => state.Storage.entities;
export const getStoragesIds = (state: any) => state.Storage.ids;

export const getStorages =
  createSelector(getStoragesEntities, getStoragesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getStorageById(id: string) {
  return (state: any) => state.Storage.entities[id];
}

export function getStoragesById(ids: string[]) {
  return createSelector(getStoragesEntities, (entities) => ids.map((id) => entities[id]));
}