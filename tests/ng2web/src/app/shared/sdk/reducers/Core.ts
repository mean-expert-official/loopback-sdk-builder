import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Core } from '../models';
import { CoreActionTypes } from '../actions';

export interface CoreState {
  ids: string[];
  entities: { [id: string]: Core };
};

const initialState: CoreState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<CoreState, Core>(CoreActionTypes);

/**
 * @module CoresReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Core reducer.
 */
export function CoresReducer(state = initialState, action: Action): CoreState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getCoresState = (state: any) => state.Core;
export const getCoresEntities = (state: any) => state.Core.entities;
export const getCoresIds = (state: any) => state.Core.ids;

export const getCores =
  createSelector(getCoresEntities, getCoresIds, (entities, ids) => ids.map((id) => entities[id]));

export function getCoreById(id: string) {
  return (state: any) => state.Core.entities[id];
}

export function getCoresById(ids: string[]) {
  return createSelector(getCoresEntities, (entities) => ids.map((id) => entities[id]));
}