/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Like } from '../models';
import { LikeActionTypes } from '../actions';

export interface LikesState {
  ids: string[];
  entities: { [id: string]: Like };
};

const initialState: LikesState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<LikesState, Like>(LikeActionTypes);

/**
 * @module LikesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Like reducer.
 */
export function LikesReducer(state = initialState, action: Action): LikesState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getLikesState = (state: any) => state.Likes;
export const getLikesEntities = (state: any) => state.Likes.entities;
export const getLikesIds = (state: any) => state.Likes.ids;

export const getLikes =
  createSelector(getLikesEntities, getLikesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getLikeById(id: string) {
  return (state: any) => state.Likes.entities[id];
}

export function getLikesById(ids: string[]) {
  return createSelector(getLikesEntities, (entities) => ids.map((id) => entities[id]));
}