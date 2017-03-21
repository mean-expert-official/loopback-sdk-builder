/* tslint:disable */
import {
  Room
} from '../index';

declare var Object: any;
export interface CategoryInterface {
  "name"?: any;
  "id"?: any;
  "createdAt": any;
  "updatedAt": any;
  rooms?: Room[];
}

export class Category implements CategoryInterface {
  "name": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  rooms: Room[];
  constructor(data?: CategoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Category`.
   */
  public static getModelName() {
    return "Category";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Category for dynamic purposes.
  **/
  public static factory(data: CategoryInterface): Category{
    return new Category(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Category',
      plural: 'categories',
      properties: {
        "name": {
          name: 'name',
          type: 'any',
          default: 'test'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'any'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'any'
        },
      },
      relations: {
        rooms: {
          name: 'rooms',
          type: 'Room[]',
          model: 'Room'
        },
      }
    }
  }
}
