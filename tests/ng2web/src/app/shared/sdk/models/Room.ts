/* tslint:disable */
import {
  Message,
  Like,
  Category,
  Account
} from '../index';

declare var Object: any;
export interface RoomInterface {
  "name": any;
  "id"?: any;
  "createdAt"?: any;
  "updatedAt"?: any;
  messages?: Message[];
  likes?: Like[];
  categories?: Category[];
  accounts?: Account[];
  admins?: Account[];
}

export class Room implements RoomInterface {
  "name": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  messages: Message[];
  likes: Like[];
  categories: Category[];
  accounts: Account[];
  admins: Account[];
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
        "name": {
          name: 'name',
          type: 'any',
          default: ''
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
        messages: {
          name: 'messages',
          type: 'Message[]',
          model: 'Message'
        },
        likes: {
          name: 'likes',
          type: 'Like[]',
          model: 'Like'
        },
        categories: {
          name: 'categories',
          type: 'Category[]',
          model: 'Category'
        },
        accounts: {
          name: 'accounts',
          type: 'Account[]',
          model: 'Account'
        },
        admins: {
          name: 'admins',
          type: 'Account[]',
          model: 'Account'
        },
      }
    }
  }
}
