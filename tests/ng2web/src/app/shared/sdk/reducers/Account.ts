import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Account } from '../models';
import { AccountActionTypes } from '../actions';

export interface AccountState {
  ids: string[];
  entities: { [id: string]: Account };
};

const initialState: AccountState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<AccountState, Account>(AccountActionTypes);

/**
 * @module AccountsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Account reducer.
 */
export function AccountsReducer(state = initialState, action: Action): AccountState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAccountsState = (state: any) => state.Account;
export const getAccountsEntities = (state: any) => state.Account.entities;
export const getAccountsIds = (state: any) => state.Account.ids;

export const getAccounts =
  createSelector(getAccountsEntities, getAccountsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAccountById(id: string) {
  return (state: any) => state.Account.entities[id];
}

export function getAccountsById(ids: string[]) {
  return createSelector(getAccountsEntities, (entities) => ids.map((id) => entities[id]));
}