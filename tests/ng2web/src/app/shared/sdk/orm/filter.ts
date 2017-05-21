/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';
import * as filterNodes from 'loopback-filters';

import * as models from '../models';

import { LoopBackFilter } from '../models';

export function applyFilter(state$: Observable<any>, filter: LoopBackFilter, store: any, model: any): Observable<any> {
  return include(
    state$
      .map((state: any) => {
        if (Array.isArray(state)) {
          return state;
        }

        const data: any[] = [];

        for (const key in state) {
          if (state.hasOwnProperty(key)) {
            data.push(state[key]);
          }
        }

        return data;
      })
      .map((data: any | any[]) => filterNodes(data, filter))
      .publishReplay(1).refCount()
    , filter, store, model);
}

function include(state$: Observable<any>, filter: LoopBackFilter, store: any, model: any) {
  if (!filter.include) {
    return state$;
  }

  const stateWithEntities$ = state$.map((data) => {
    const state: any = {
      entities: {},
      data: data
    };

    for (const item of data) {
      state.entities[model.getModelDefinition().idName] = item;
    }

    return state;
  })
  .publishReplay(1).refCount();

  const normalizedInclude = normalizeInclude(filter.include);
  const includesArray: any[] = [];

  for (const include of normalizedInclude) {
    let relationSchema: any;
    if (isPlainObject(include)) {
      relationSchema = model.getModelDefinition().relations[include.relation];
    } else {
      relationSchema = model.getModelDefinition().relations[include];
    }

    includesArray.push(
      applyFilter(
        store.select(relationSchema.model + 's')
          .map((state: any) => state.entities)
          .withLatestFrom(stateWithEntities$, // not sure if should use combineLatest
            (includeState: any, stateWithEntities: any) => ({includeState, stateWithEntities}))
          .map(({includeState, stateWithEntities}) => {
            const data: any[] = [];

            for (const key in includeState) {
              if (includeState.hasOwnProperty(key) &&
                stateWithEntities.entities.hasOwnProperty(includeState[key][relationSchema.keyTo])) {
                data.push(includeState[key]);
              }
            }

            return data;
          })
          .publishReplay(1).refCount()
        , include.scope || include, store, models[relationSchema.model])
    );
  }

  return stateWithEntities$.combineLatest(...includesArray, (...args) => {
    const stateWithEntities: any = args[0];

    for (let i = 0; i < args.length; ++i) {
      for (const item of args[i]) {
        const includeString: string = normalizedInclude[i - 1].relation || normalizedInclude[i - 1];
        const relationSchema = model.getModelDefinition().relations[includeString];

        if (stateWithEntities.entities.hasOwnProperty(item[relationSchema.keyTo])) {
          if (!stateWithEntities.entities[item[relationSchema.keyTo]].hasOwnProperty(includeString)) {
            stateWithEntities.entities[item[relationSchema.keyTo]][includeString] = [];
          }
          stateWithEntities.entities[item[relationSchema.keyTo]][includeString].push(item);
        }
      }
    }

    return stateWithEntities.data;
  })
  .publishReplay(1).refCount();
}

/*!
 * Normalize the include to be an array
 * @param include
 * @returns {*}
 */
function normalizeInclude(include) {
  let newInclude;
  if (typeof include === 'string') {
    return [include];
  } else if (isPlainObject(include)) {
    return [include];
  } else if (Array.isArray(include)) {
    newInclude = [];
    let i: number;
    let n: number;
    for (i = 0, n = include.length; i < n; i++) {
      const subIncludes = normalizeInclude(include[i]);
      newInclude = newInclude.concat(subIncludes);
    }
    return newInclude;
  } else {
    return include;
  }
}

function isPlainObject(obj: any): boolean {
  return (typeof obj === 'object') && (obj !== null) &&
    (obj.constructor === Object);
}
