/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Storage, StorageInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { StorageActionTypes } from '../actions';

export interface StoragesState extends EntityState<Storage | StorageInterface> {};

export const StorageAdapter: EntityAdapter<Storage | StorageInterface> = createEntityAdapter<Storage | StorageInterface>();

const initialState: StoragesState = StorageAdapter.getInitialState({});

const cases = BaseReducerFactory<StoragesState, Storage | StorageInterface>(StorageActionTypes, StorageAdapter);

/**
 * @module StoragesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Storage reducer.
 */
export function StoragesReducer(state = initialState, action: LoopbackAction): StoragesState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getStoragesState = (state: any) => state.Storages;
export const getStoragesEntities = (state: any) => state.Storages.entities;
export const getStoragesIds = (state: any) => state.Storages.ids;

export const getStorages =
  createSelector(getStoragesEntities, getStoragesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getStorageById(id: string) {
  return (state: any) => state.Storages.entities[id];
}

export function getStoragesById(ids: string[]) {
  return createSelector(getStoragesEntities, (entities) => ids.map((id) => entities[id]));
}
