/* tslint:disable */
import {
  Message,
  Category,
  Account
} from '../index';

declare var Object: any;
export interface RoomInterface {
  name: string;
  id?: number;
  messages?: Array<Message>;
  likes?: Array<any>;
  categories?: Array<Category>;
  accounts?: Array<Account>;
  admins?: Array<Account>;
}

export class Room implements RoomInterface {
  name: string = '';
  id: number = 0;
  messages: Array<Message> = [];
  likes: Array<any> = [];
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
      },
      relations: {
        messages: {
          name: 'messages',
          type: 'Array<Message>',
          model: 'Message'
        },
        likes: {
          name: 'likes',
          type: 'Array<any>',
          model: ''
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
