import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Message } from '../models';
import { MessageActionTypes } from '../actions';

export interface MessageState {
  ids: string[];
  entities: { [id: string]: Message };
};

const initialState: MessageState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<MessageState, Message>(MessageActionTypes);

/**
 * @module MessagesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Message reducer.
 */
export function MessagesReducer(state = initialState, action: Action): MessageState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getMessagesState = (state: any) => state.Message;
export const getMessagesEntities = (state: any) => state.Message.entities;
export const getMessagesIds = (state: any) => state.Message.ids;

export const getMessages =
  createSelector(getMessagesEntities, getMessagesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getMessageById(id: string) {
  return (state: any) => state.Message.entities[id];
}

export function getMessagesById(ids: string[]) {
  return createSelector(getMessagesEntities, (entities) => ids.map((id) => entities[id]));
}