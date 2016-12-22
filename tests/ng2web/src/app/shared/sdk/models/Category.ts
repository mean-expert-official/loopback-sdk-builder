/* tslint:disable */
import {
  Room
} from '../index';

declare var Object: any;
export interface CategoryInterface {
  name?: string;
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  rooms?: Array<Room>;
}

export class Category implements CategoryInterface {
  name: string = 'test';
  id: number = 0;
  createdAt: Date = new Date(0);
  updatedAt: Date = new Date(0);
  rooms: Array<Room> = [];
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
        name: {
          name: 'name',
          type: 'string',
          default: 'test'
        },
        id: {
          name: 'id',
          type: 'number'
        },
        createdAt: {
          name: 'createdAt',
          type: 'Date'
        },
        updatedAt: {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        rooms: {
          name: 'rooms',
          type: 'Array<Room>',
          model: 'Room'
        },
      }
    }
  }
}
