/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Account } from '../models';
import { AccountActionTypes } from '../actions';

export interface AccountsState {
  ids: string[];
  entities: { [id: string]: Account };
};

const initialState: AccountsState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<AccountsState, Account>(AccountActionTypes);

/**
 * @module AccountsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Account reducer.
 */
export function AccountsReducer(state = initialState, action: Action): AccountsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAccountsState = (state: any) => state.Accounts;
export const getAccountsEntities = (state: any) => state.Accounts.entities;
export const getAccountsIds = (state: any) => state.Accounts.ids;

export const getAccounts =
  createSelector(getAccountsEntities, getAccountsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAccountById(id: string) {
  return (state: any) => state.Accounts.entities[id];
}

export function getAccountsById(ids: string[]) {
  return createSelector(getAccountsEntities, (entities) => ids.map((id) => entities[id]));
}