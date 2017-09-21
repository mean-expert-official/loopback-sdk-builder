
import {
  Room
} from '../index';


export class Category {
  "name";
  "id";
  "createdAt";
  "updatedAt";
  rooms;
  constructor(data) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Category`.
   */
  static getModelName() {
    return "Category";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Category for dynamic purposes.
  **/
  static factory(data) {
    return new Category(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  static getModelDefinition() {
    return {
      name: 'Category',
      plural: 'categories',
      path: 'categories',
      properties: {
        "name": {
          name: 'name',
          type: 'string',
          default: 'test'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
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
