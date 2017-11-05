/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Core, CoreInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { CoreActionTypes } from '../actions';

export interface CoresState extends EntityState<Core | CoreInterface> {};

export const CoreAdapter: EntityAdapter<Core | CoreInterface> = createEntityAdapter<Core | CoreInterface>();

const initialState: CoresState = CoreAdapter.getInitialState({});

const cases = BaseReducerFactory<CoresState, Core | CoreInterface>(CoreActionTypes, CoreAdapter);

/**
 * @module CoresReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Core reducer.
 */
export function CoresReducer(state = initialState, action: LoopbackAction): CoresState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getCoresState = (state: any) => state.Cores;
export const getCoresEntities = (state: any) => state.Cores.entities;
export const getCoresIds = (state: any) => state.Cores.ids;

export const getCores =
  createSelector(getCoresEntities, getCoresIds, (entities, ids) => ids.map((id) => entities[id]));

export function getCoreById(id: string) {
  return (state: any) => state.Cores.entities[id];
}

export function getCoresById(ids: string[]) {
  return createSelector(getCoresEntities, (entities) => ids.map((id) => entities[id]));
}
