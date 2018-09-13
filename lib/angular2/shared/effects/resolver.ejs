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

  for (const item of data) {
    for (const key in relations) {
      if (relations.hasOwnProperty(key) && relations[key].model && item.hasOwnProperty(key)) {
        if (!relationsDataMap.hasOwnProperty(key)) {
          relationsDataMap[key] = [];
        }
        /*if (key === 'users' && item[key].length) {
          console.log(item, relations);
          console.log(models);
        }*/
        if (relations[key].modelThrough && item[key].length) {
          if (!relationsDataMap.hasOwnProperty(relations[key].modelThrough)) {
            relationsDataMap[relations[key].modelThrough] = [];
          }

          for (const includedItem of item[key]) {
            // console.log(key, relations[key].modelThrough, includedItem);
            relationsDataMap[relations[key].modelThrough] = [
              ...relationsDataMap[relations[key].modelThrough],
              {
                id: item[relations[key].keyFrom] + '-' + includedItem[relations[key].keyFrom],
                [relations[key].keyTo]: item[relations[key].keyFrom],
                [relations[key].keyThrough]: includedItem[relations[key].keyFrom] // TODO: FIX: Should get proper key(id)
              }
            ];
          }
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

  for (const key in relationsDataMap) {
    if (relationsDataMap.hasOwnProperty(key) && relationsDataMap[key].length) {
      if (relations.hasOwnProperty(key)) {
        dispatches = [...dispatches, ...resolver({data: relationsDataMap[key]}, relations[key].model, action)];
      } else {
        dispatches.push(new actions[key + 'Actions'][action](relationsDataMap[key]));
      }
    }
  }

  return dispatches;
}

export function resolveThrough(action: any, response: any, model: string, relationModel: string, newAction: string): any[] {
  const modelDefinition: any = models[model].getModelDefinition();
  const relations: any = modelDefinition.relations;
  let relationsData: any = [];

  let data: any;
  if (!Array.isArray(response)) {
    data = [response];
  } else {
    data = response;
  }

  for (const key in relations) {
    if (relations.hasOwnProperty(key) && relations[key].modelThrough === relationModel) {
      for (const item of data) {
        relationsData = [...relationsData, {
          id: item[relations[key].keyFrom] + '-' + action.payload.id,
          [relations[key].keyTo]: item[relations[key].keyFrom],
          [relations[key].keyThrough]: action.payload.id
        }];
      }
    }
  }

  return [new actions[relationModel + 'Actions'][newAction](relationsData, action.meta)];
}

/*function uuidv4(): string {
  return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (window as any).crypto.getRandomValues(new (window as any).Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}*/
