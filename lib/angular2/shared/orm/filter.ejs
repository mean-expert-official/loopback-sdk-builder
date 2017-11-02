/* tslint:disable */
import { map, publishReplay, combineLatest, withLatestFrom, auditTime, refCount } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import * as filterNodes from 'loopback-filters';

import * as models from '../models';

import { LoopBackFilter } from '../models';

export function applyFilter(state$: Observable<any>, filter: LoopBackFilter, store: any, model: any): Observable<any> {
  return include(
    state$.pipe(
        map((state: any) => {
          if (Array.isArray(state)) {
            return state;
          }

          return state ? [state]: [];
        }),
        map((data: any | any[]) => filterNodes(data, filter)),
        publishReplay(1),
        refCount()
      )
    , filter, store, model);
}

function include(state$: Observable<any>, filter: LoopBackFilter, store: any, model: any): Observable<any> {
  if (!filter.include) {
    return state$;
  }

  const normalizedInclude = normalizeInclude(filter.include);

  const stateEntities$ = state$.pipe(
    map((data) => {
      const entities: any = {};

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
        entities[item[model.getModelDefinition().idName]] = item;
      }

      return entities;
    }),
    publishReplay(1),
    refCount()
  );

  const includesArray: any[] = [];

  for (let include of normalizedInclude) {
    let relationSchema: any;
    if (isPlainObject(include)) {
      relationSchema = model.getModelDefinition().relations[include.relation];
    } else {
      relationSchema = model.getModelDefinition().relations[include];
    }

    if (!!relationSchema.model) {
      if (relationSchema.modelThrough) {
        if (include.scope && include.scope.fields) {
         include = Object.assign({}, include, {
            scope: Object.assign({}, include.scope, {
              fields: Array.isArray(include.scope.fields) ? [...include.scope.fields, '_through'] : [include.scope.fields, '_through']
            })
          })
        }

        includesArray.push(
          applyFilter(
            store.select(relationSchema.model + 's').pipe(
              map((state: any) => state.entities),
              combineLatest(store.select(relationSchema.modelThrough + 's').map((s) => removeDuplicates(s, relationSchema)),
                (includeState: any, throughState: any) => ({includeState, throughState})),
              auditTime(0),
              withLatestFrom(stateEntities$,
                ({includeState, throughState}, stateEntities: any) => ({includeState, throughState, stateEntities})),
              map(({includeState, throughState, stateEntities}) => {
                const entities: any = {};
                const data: any[] = [];

                for (const key in includeState) {
                  if (includeState.hasOwnProperty(key)) {
                    for (const keyThrough in throughState) {
                      if (throughState.hasOwnProperty(keyThrough)) {
                        if (stateEntities.hasOwnProperty(throughState[keyThrough][relationSchema.keyTo]) &&
                          throughState[keyThrough][relationSchema.keyThrough] === includeState[key][relationSchema.keyFrom]) {
                          if (!entities.hasOwnProperty(includeState[key][relationSchema.keyFrom])) {
                            entities[includeState[key][relationSchema.keyFrom]] = Object.assign({}, includeState[key], {
                              _through: [ throughState[keyThrough] ]
                            });
                          } else {
                            entities[includeState[key][relationSchema.keyFrom]] = Object.assign({}, includeState[key], {
                              _through: [ ...entities[includeState[key][relationSchema.keyFrom]]._through, throughState[keyThrough] ]
                            });
                          }
                        }
                      }
                    }
                  }
                }

                for (let key in entities) {
                  if (entities.hasOwnProperty(key)) {
                    data.push(entities[key]);
                  }
                }

                return data;
              }),
              publishReplay(1),
              refCount()
            )
          , include.scope || include, store, models[relationSchema.model])
        );
      } else {
        includesArray.push(
          applyFilter(
            store.select(relationSchema.model + 's').pipe(
              auditTime(0),
              map((state: any) => state.entities),
              withLatestFrom(stateEntities$,
                (includeState: any, stateEntities: any) => ({includeState, stateEntities})),
              map(({includeState, stateEntities}) => {
                let data: any[] = [];

                if (!Object.keys(stateEntities).length) {
                  return data;
                }

                if (relationSchema.relationType === 'belongsTo') {
                  for (const key in stateEntities) {
                    if (stateEntities.hasOwnProperty(key) &&
                      includeState.hasOwnProperty(stateEntities[key][relationSchema.keyFrom])) {
                      data.push(Object.assign({}, includeState[stateEntities[key][relationSchema.keyFrom]], {
                        relationParentId: key
                      }));
                    }
                  }
                } else if (relationSchema.relationType === 'hasOne') {
                  for (const key in includeState) {
                    if (includeState.hasOwnProperty(key) &&
                      stateEntities.hasOwnProperty(includeState[key][relationSchema.keyTo])) {
                      data.push(includeState[key]);
                    }
                  }
                } else {
                  for (const key in includeState) {
                    if (includeState.hasOwnProperty(key) &&
                      stateEntities.hasOwnProperty(includeState[key][relationSchema.keyTo])) {
                      data.push(includeState[key]);
                    }
                  }
                }

                return data;
              }),
              publishReplay(1),
              refCount()
            )
          , include.scope || include, store, models[relationSchema.model])
        );
      }
    }
  }

  return stateEntities$.pipe(
    combineLatest(...includesArray, (...args) => args),
    auditTime(0),
    map((args) => {
      const stateEntities: any = JSON.parse(JSON.stringify(args[0]));
      const data: any[] = [];

      for (let i = 1; i < args.length; ++i) {
        const includeString: string = normalizedInclude[i - 1].relation || normalizedInclude[i - 1];
        const relationSchema = model.getModelDefinition().relations[includeString];

        for (const item of args[i]) {
          if (relationSchema.modelThrough) {
            for (var z = 0; z < item._through.length; ++z) {
              if (typeof stateEntities[item._through[z][relationSchema.keyTo]] === 'undefined') { continue; }
              if (typeof stateEntities[item._through[z][relationSchema.keyTo]][includeString] === 'undefined') {
                stateEntities[item._through[z][relationSchema.keyTo]][includeString] =
                  relationSchema.type.indexOf('[]') !== -1 ? [] : null
              }

              stateEntities[item._through[z][relationSchema.keyTo]][includeString] = [
                ...stateEntities[item._through[z][relationSchema.keyTo]][includeString],
                item
              ];
            }
          } else {
            if (relationSchema.relationType === 'belongsTo') {
              for (const key in stateEntities) {
                if (stateEntities.hasOwnProperty(key) && item.relationParentId === key) {
                  stateEntities[key][includeString] = item;
                }
              }
            } else {
              if (stateEntities.hasOwnProperty(item[relationSchema.keyTo])) {
                if (relationSchema.relationType === 'hasOne') {
                  stateEntities[item[relationSchema.keyTo]][includeString] = item;
                } else {
                  if (typeof stateEntities[item[relationSchema.keyTo]][includeString] === 'undefined') {
                    stateEntities[item[relationSchema.keyTo]][includeString] =
                      relationSchema.type.indexOf('[]') !== -1 ? [] : null
                  }

                  stateEntities[item[relationSchema.keyTo]][includeString] = [
                    ...stateEntities[item[relationSchema.keyTo]][includeString],
                    item
                  ];
                }
              }
            }
          }
        }
      }

      for (let key in stateEntities) {
        if (stateEntities.hasOwnProperty(key)) {
          data.push(stateEntities[key]);
        }
      }

      return data;
    }),
    auditTime(0),
    publishReplay(1),
    refCount()
  );
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
  return state.ids.map((id: any) => (state.entities as any)[id]);
}

export function removeDuplicates(state: any, relationSchema: any): any[] {
  const entities = Object.assign({}, state.entities);

  for (const keyThrough in entities) {
    if (entities.hasOwnProperty(keyThrough)) {
      if (keyThrough.indexOf('-') !== -1) {
        const firstPart = keyThrough.substr(0, keyThrough.indexOf('-'));
        const secondPart = keyThrough.substr(keyThrough.indexOf('-') + 1, keyThrough.length - 1);
        if (entities.hasOwnProperty(secondPart + '-' + firstPart)) {
          delete entities[secondPart + '-' + firstPart];
        }
      } else {
        for (const key in entities) {
          if (key.indexOf('-') !== -1 && entities.hasOwnProperty(key) &&
            entities[key][relationSchema.keyTo] === entities[keyThrough][relationSchema.keyTo] &&
            entities[key][relationSchema.keyThrough] === entities[keyThrough][relationSchema.keyThrough]) {
            delete entities[key];
            break;
          }
        }
      }
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
