/* tslint:disable */
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
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

        return state ? [state]: [];
      })
      .map((data: any | any[]) => filterNodes(data, filter))
      .publishReplay(1).refCount()
    , filter, store, model);
}

function include(state$: Observable<any>, filter: LoopBackFilter, store: any, model: any): Observable<any> {
  if (!filter.include) {
    return state$;
  }

  const normalizedInclude = normalizeInclude(filter.include);

  const stateWithEntities$ = state$.map((data) => {
    const state: any = {
      entities: {},
      data: data
    };

    for (const include of normalizedInclude) {
      let relationSchema: any;
      if (isPlainObject(include)) {
        relationSchema = model.getModelDefinition().relations[include.relation];
      } else {
        relationSchema = model.getModelDefinition().relations[include];
      }

      for (var i = 0; i < data.length; ++i) {
        data[i] = Object.assign({}, data[i], {
          [relationSchema.name]: relationSchema.type.indexOf('[]') !== -1 ? [] : null
        });
      }
    }

    for (const item of data) {
      state.entities[item[model.getModelDefinition().idName]] = item;
    }

    return state;
  })
  .publishReplay(1).refCount();

  const includesArray: any[] = [];

  for (const include of normalizedInclude) {
    let relationSchema: any;
    if (isPlainObject(include)) {
      relationSchema = model.getModelDefinition().relations[include.relation];
    } else {
      relationSchema = model.getModelDefinition().relations[include];
    }

    if (!!relationSchema.model) {
      if (relationSchema.modelThrough) {
        /*includesArray.push(
          applyFilter(
            store.select(relationSchema.model + 's')
              .map((state: any) => state.entities)
              .combineLatest(store.select(relationSchema.modelThrough + 's'),
                (includeState: any, thoughState: any) => ({includeState, thoughState}))
              .withLatestFrom(stateWithEntities$,
                ({includeState, thoughState}, stateWithEntities: any) => ({includeState, thoughState, stateWithEntities}))
              .map(({includeState, thoughState, stateWithEntities}) => {
                let data: any | any[];
                console.log(includeState, thoughState, stateWithEntities);
                // TODO
                return data;
              })
              .map((data: any | any[]) => {
                if (!data || !Array.isArray(data) || !include.scope) {
                  return data;
                }

                return filterNodes(data, include.scope)
              })
              .publishReplay(1).refCount()
          , include.scope || include, store, models[relationSchema.model])
        );*/
      } else {
        includesArray.push(
          applyFilter(
            store.select(relationSchema.model + 's')
              .map((state: any) => state.entities)
              .withLatestFrom(stateWithEntities$,
                (includeState: any, stateWithEntities: any) => ({includeState, stateWithEntities}))
              .map(({includeState, stateWithEntities}) => {
                let data: any | any[];

                if (!stateWithEntities.data.length) {
                  return data;
                }

                if (relationSchema.relationType === 'belongsTo') {
                  for (const key in stateWithEntities.entities) {
                    if (stateWithEntities.entities.hasOwnProperty(key) &&
                      includeState.hasOwnProperty(stateWithEntities.entities[key][relationSchema.keyFrom])) {
                      data = Object.assign({}, includeState[stateWithEntities.entities[key][relationSchema.keyFrom]], {
                        relationParentId: key
                      });
                    }
                  }
                } else if (relationSchema.relationType === 'hasOne') {
                  for (const key in includeState) {
                    if (includeState.hasOwnProperty(key) &&
                      stateWithEntities.entities.hasOwnProperty(includeState[key][relationSchema.keyTo])) {
                      data = includeState[key];
                    }
                  }
                } else {
                  data = [];

                  for (const key in includeState) {
                    if (includeState.hasOwnProperty(key) &&
                      stateWithEntities.entities.hasOwnProperty(includeState[key][relationSchema.keyTo])) {
                      data.push(includeState[key]);
                    }
                  }
                }

                return data;
              })
              .map((data: any | any[]) => {
                if (!data || !Array.isArray(data) || !include.scope) {
                  return data;
                }

                return filterNodes(data, include.scope)
              })
              .publishReplay(1).refCount()
          , include.scope || include, store, models[relationSchema.model])
        );
      }
    }
  }

  return stateWithEntities$.combineLatest(...includesArray, (...args) => {
    const stateWithEntities: any = args[0];

    for (let i = 1; i < args.length; ++i) {
      for (const item of args[i]) {
        const includeString: string = normalizedInclude[i - 1].relation || normalizedInclude[i - 1];
        const relationSchema = model.getModelDefinition().relations[includeString];

        if (relationSchema.relationType === 'belongsTo') {
          for (const key in stateWithEntities.entities) {
            if (stateWithEntities.entities.hasOwnProperty(key) && item.relationParentId === key) {
              stateWithEntities.entities[key][includeString] = item;
            }
          }
        } else {
          if (stateWithEntities.entities.hasOwnProperty(item[relationSchema.keyTo])) {
            if (relationSchema.relationType === 'hasOne') {
              stateWithEntities.entities[item[relationSchema.keyTo]][includeString] = item;
            } else {
              stateWithEntities.entities[item[relationSchema.keyTo]][includeString].push(item);
            }
          }
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

export function toArray(state: any): any[] {
  const entities = [];
  
  for (let key in state.entities) {
    if (state.entities.hasOwnProperty(key)) {
      entities.push(state.entities[key]);
    }
  }

  return entities;
}

export function filterById(state: any[], id: any, relation: string, model: any): any[] {
  if (model.getModelDefinition().relations[relation].modelThrough) {
    return state
      .filter((item: any) => item[model.getModelDefinition().relations[relation].modelThrough] &&
        item[model.getModelDefinition().relations[relation].modelThrough][model.getModelDefinition().relations[relation].keyTo] === id);
  } else {
    return state.filter((item: any) => item[model.getModelDefinition().relations[relation].keyTo] === id);
  }
}
