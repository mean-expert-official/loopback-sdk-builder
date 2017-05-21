import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { ApplicationCredential } from '../models';
import { ApplicationCredentialActionTypes } from '../actions';

export interface ApplicationCredentialState {
  ids: string[];
  entities: { [id: string]: ApplicationCredential };
};

const initialState: ApplicationCredentialState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<ApplicationCredentialState, ApplicationCredential>(ApplicationCredentialActionTypes);

/**
 * @module ApplicationCredentialsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible ApplicationCredential reducer.
 */
export function ApplicationCredentialsReducer(state = initialState, action: Action): ApplicationCredentialState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getApplicationCredentialsState = (state: any) => state.ApplicationCredential;
export const getApplicationCredentialsEntities = (state: any) => state.ApplicationCredential.entities;
export const getApplicationCredentialsIds = (state: any) => state.ApplicationCredential.ids;

export const getApplicationCredentials =
  createSelector(getApplicationCredentialsEntities, getApplicationCredentialsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getApplicationCredentialById(id: string) {
  return (state: any) => state.ApplicationCredential.entities[id];
}

export function getApplicationCredentialsById(ids: string[]) {
  return createSelector(getApplicationCredentialsEntities, (entities) => ids.map((id) => entities[id]));
}