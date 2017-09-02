/* tslint:disable */
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Message } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { MessageActionTypes } from '../actions';

export interface MessagesState {
  ids: string[];
  entities: { [id: string]: Message };
};

const initialState: MessagesState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<MessagesState, Message>(MessageActionTypes);

/**
 * @module MessagesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Message reducer.
 */
export function MessagesReducer(state = initialState, action: LoopbackAction): MessagesState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getMessagesState = (state: any) => state.Messages;
export const getMessagesEntities = (state: any) => state.Messages.entities;
export const getMessagesIds = (state: any) => state.Messages.ids;

export const getMessages =
  createSelector(getMessagesEntities, getMessagesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getMessageById(id: string) {
  return (state: any) => state.Messages.entities[id];
}

export function getMessagesById(ids: string[]) {
  return createSelector(getMessagesEntities, (entities) => ids.map((id) => entities[id]));
}