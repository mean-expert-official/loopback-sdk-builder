/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Account, AccountInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { AccountActionTypes } from '../actions';

export interface AccountsState extends EntityState<Account | AccountInterface> {};

export const AccountAdapter: EntityAdapter<Account | AccountInterface> = createEntityAdapter<Account | AccountInterface>();

const initialState: AccountsState = AccountAdapter.getInitialState({});

const cases = BaseReducerFactory<AccountsState, Account | AccountInterface>(AccountActionTypes, AccountAdapter);

/**
 * @module AccountsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Account reducer.
 */
export function AccountsReducer(state = initialState, action: LoopbackAction): AccountsState {
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
