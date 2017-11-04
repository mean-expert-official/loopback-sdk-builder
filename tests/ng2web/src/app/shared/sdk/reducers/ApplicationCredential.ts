/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { ApplicationCredential, ApplicationCredentialInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { ApplicationCredentialActionTypes } from '../actions';

export interface ApplicationCredentialsState extends EntityState<ApplicationCredential | ApplicationCredentialInterface> {};

export const ApplicationCredentialAdapter: EntityAdapter<ApplicationCredential | ApplicationCredentialInterface> = createEntityAdapter<ApplicationCredential | ApplicationCredentialInterface>();

const initialState: ApplicationCredentialsState = ApplicationCredentialAdapter.getInitialState({});

const cases = BaseReducerFactory<ApplicationCredentialsState, ApplicationCredential | ApplicationCredentialInterface>(ApplicationCredentialActionTypes, ApplicationCredentialAdapter);

/**
 * @module ApplicationCredentialsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible ApplicationCredential reducer.
 */
export function ApplicationCredentialsReducer(state = initialState, action: LoopbackAction): ApplicationCredentialsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getApplicationCredentialsState = (state: any) => state.ApplicationCredentials;
export const getApplicationCredentialsEntities = (state: any) => state.ApplicationCredentials.entities;
export const getApplicationCredentialsIds = (state: any) => state.ApplicationCredentials.ids;

export const getApplicationCredentials =
  createSelector(getApplicationCredentialsEntities, getApplicationCredentialsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getApplicationCredentialById(id: string) {
  return (state: any) => state.ApplicationCredentials.entities[id];
}

export function getApplicationCredentialsById(ids: string[]) {
  return createSelector(getApplicationCredentialsEntities, (entities) => ids.map((id) => entities[id]));
}
