/* tslint:disable */
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Category } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { CategoryActionTypes } from '../actions';

export interface CategorysState {
  ids: string[];
  entities: { [id: string]: Category };
};

const initialState: CategorysState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<CategorysState, Category>(CategoryActionTypes);

/**
 * @module CategorysReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Category reducer.
 */
export function CategorysReducer(state = initialState, action: LoopbackAction): CategorysState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getCategorysState = (state: any) => state.Categorys;
export const getCategorysEntities = (state: any) => state.Categorys.entities;
export const getCategorysIds = (state: any) => state.Categorys.ids;

export const getCategorys =
  createSelector(getCategorysEntities, getCategorysIds, (entities, ids) => ids.map((id) => entities[id]));

export function getCategoryById(id: string) {
  return (state: any) => state.Categorys.entities[id];
}

export function getCategorysById(ids: string[]) {
  return createSelector(getCategorysEntities, (entities) => ids.map((id) => entities[id]));
}