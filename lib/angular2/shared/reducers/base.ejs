/* tslint:disable */
import { Action } from '@ngrx/store';

/**
* @module BaseReducerFactory
* @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
* @license MIT
* @description
* Factory function that will be implemented in every custom reducer automatically built
* by the sdk builder.
* It provides the core reducer methods for each model to interact with API
**/
export function BaseReducerFactory<S, T>(actionTypes: any): any {
  let cases = {};

  cases[actionTypes.CREATE_SUCCESS] =
  cases[actionTypes.REPLACE_OR_CREATE_SUCCESS] =
  cases[actionTypes.UPDATE_ATTRIBUTES_SUCCESS] =
  cases[actionTypes.UPSERT_SUCCESS] =
  cases[actionTypes.UPSERT_WITH_WHERE_SUCCESS] =
  cases[actionTypes.REPLACE_BY_ID_SUCCESS] =
  cases[actionTypes.PATCH_OR_CREATE_SUCCESS] =
  cases[actionTypes.PATCH_ATTRIBUTES_SUCCESS] =
  cases[actionTypes.FIND_BY_ID_SUCCESS] =
  cases[actionTypes.FIND_ONE_SUCCESS] =
  (state: any, action: Action) => {
    return Object.assign({}, state, {
      ids: Array.from(new Set([ ...state.ids, action.payload.id ])),
      entities: Object.assign({}, state.entities, {
        [action.payload.id]: action.payload
      }),
      selectedIds: action.payload.id
    });
  };

  cases[actionTypes.CREATE_MANY_SUCCESS] =
  (state: any, action: Action) => {
    // TODO: check what is the response for this...
  };

  cases[actionTypes.FIND_SUCCESS] =
  (state: any, action: Action) => {
    let resultIds: string[] = [];
    for (let value of action.payload) {
      resultIds = [ ...resultIds, value.id ];
      state.ids = [ ...state.ids, value.id ];
      state.entities[value.id] = Object.assign({}, state.entities[value.id], value);
    }

    return Object.assign({}, state, {
      ids: Array.from(new Set(state.ids)),
      entities: Object.assign({}, state.entities),
      selectedIds: resultIds
    });
  };

  cases[actionTypes.UPDATE_ALL_SUCCESS] =
  (state: any, action: Action) => {
    // TODO: figure out how to do this...
  };

  cases[actionTypes.DELETE_BY_ID_SUCCESS] =
  (state: any, action: Action) => {
    delete state.entities[action.payload];
    
    let ids: Set<{}> = new Set(state.ids);
    ids.delete(action.payload);

    return Object.assign({}, state, {
      ids: Array.from(ids),
      entities: Object.assign({}, state.entities),
      selectedIds: state.selectedIds
    });
  };

  return cases;
}
