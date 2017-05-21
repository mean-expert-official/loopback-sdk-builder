import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Category } from '../models';
import { CategoryActionTypes } from '../actions';

export interface CategoryState {
  ids: string[];
  entities: { [id: string]: Category };
};

const initialState: CategoryState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<CategoryState, Category>(CategoryActionTypes);

/**
 * @module CategorysReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Category reducer.
 */
export function CategorysReducer(state = initialState, action: Action): CategoryState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getCategorysState = (state: any) => state.Category;
export const getCategorysEntities = (state: any) => state.Category.entities;
export const getCategorysIds = (state: any) => state.Category.ids;

export const getCategorys =
  createSelector(getCategorysEntities, getCategorysIds, (entities, ids) => ids.map((id) => entities[id]));

export function getCategoryById(id: string) {
  return (state: any) => state.Category.entities[id];
}

export function getCategorysById(ids: string[]) {
  return createSelector(getCategorysEntities, (entities) => ids.map((id) => entities[id]));
}