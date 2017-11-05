/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Category, CategoryInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { CategoryActionTypes } from '../actions';

export interface CategorysState extends EntityState<Category | CategoryInterface> {};

export const CategoryAdapter: EntityAdapter<Category | CategoryInterface> = createEntityAdapter<Category | CategoryInterface>();

const initialState: CategorysState = CategoryAdapter.getInitialState({});

const cases = BaseReducerFactory<CategorysState, Category | CategoryInterface>(CategoryActionTypes, CategoryAdapter);

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
