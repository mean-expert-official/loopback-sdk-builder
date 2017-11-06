/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Like, LikeInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { LikeActionTypes } from '../actions';

export interface LikesState extends EntityState<Like | LikeInterface> {};

export const LikeAdapter: EntityAdapter<Like | LikeInterface> = createEntityAdapter<Like | LikeInterface>();

const initialState: LikesState = LikeAdapter.getInitialState({});

const cases = BaseReducerFactory<LikesState, Like | LikeInterface>(LikeActionTypes, LikeAdapter);

/**
 * @module LikesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Like reducer.
 */
export function LikesReducer(state = initialState, action: LoopbackAction): LikesState {
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
