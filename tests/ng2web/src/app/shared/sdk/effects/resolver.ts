/* tslint:disable */
import * as models from '../models';
import * as actions from '../actions';

export function resolver(payload: any, model: string, action: string): any[] {
  const modelDefinition: any = models[model].getModelDefinition();
  const relations: any = modelDefinition.relations;
  const isArray = Array.isArray(payload.data);

  let dispatches: any[] = [];
  let data: any;
  const relationsDataMap: any = {};

  if (!isArray) {
    data = [payload.data];
  } else {
    data = payload.data;
  }

  for ( const item of data ) {
    for ( const key in relations ) {
      if (relations.hasOwnProperty(key) && relations[key].model && item.hasOwnProperty(key)) {
        if (!relationsDataMap.hasOwnProperty(key)) {
          relationsDataMap[key] = [];
        }
        relationsDataMap[key] = [...relationsDataMap[key], ...item[key]];
        delete item[key];
      }
    }
  }

  if (payload.hasOwnProperty('id')) {
    dispatches.push(new actions[model + 'Actions'][action](payload.id, data, payload.meta));
  } else {
    dispatches.push(new actions[model + 'Actions'][action](data, payload.meta));
  }

  for ( const key in relationsDataMap ) {
    if (relations.hasOwnProperty(key) && relationsDataMap.hasOwnProperty(key) && relationsDataMap[key].length) {
      dispatches = [...dispatches, ...resolver({data: relationsDataMap[key]}, relations[key].model, action)];
    }
  }

  return dispatches;
}
