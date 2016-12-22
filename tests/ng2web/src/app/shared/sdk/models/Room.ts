/* tslint:disable */
import {
  Message,
  Like,
  Category,
  Account
} from '../index';

declare var Object: any;
export interface RoomInterface {
  name: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: Array<Message>;
  likes?: Array<Like>;
  categories?: Array<Category>;
  accounts?: Array<Account>;
  admins?: Array<Account>;
}

export class Room implements RoomInterface {
  name: string = '';
  id: number = 0;
  createdAt: Date = new Date(0);
  updatedAt: Date = new Date(0);
  messages: Array<Message> = [];
  likes: Array<Like> = [];
  categories: Array<Category> = [];
  accounts: Array<Account> = [];
  admins: Array<Account> = [];
  constructor(data?: RoomInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Room`.
   */
  public static getModelName() {
    return "Room";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Room for dynamic purposes.
  **/
  public static factory(data: RoomInterface): Room{
    return new Room(data);
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
      name: 'Room',
      plural: 'rooms',
      properties: {
        name: {
          name: 'name',
          type: 'string',
          default: ''
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
        messages: {
          name: 'messages',
          type: 'Array<Message>',
          model: 'Message'
        },
        likes: {
          name: 'likes',
          type: 'Array<Like>',
          model: 'Like'
        },
        categories: {
          name: 'categories',
          type: 'Array<Category>',
          model: 'Category'
        },
        accounts: {
          name: 'accounts',
          type: 'Array<Account>',
          model: 'Account'
        },
        admins: {
          name: 'admins',
          type: 'Array<Account>',
          model: 'Account'
        },
      }
    }
  }
}
