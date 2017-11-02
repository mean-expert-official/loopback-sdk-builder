/* tslint:disable */
import {
  Message,
  Like,
  Category,
  Account
} from '../index';

declare var Object: any;
export interface RoomInterface {
  "name": string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  messages?: Message[];
  likes?: Like[];
  categories?: Category[];
  accounts?: Account[];
  admins?: Account[];
}

export class Room implements RoomInterface {
  "name": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
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
      path: 'rooms',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string',
          default: ''
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
        messages: {
          name: 'messages',
          type: 'Message[]',
          model: 'Message',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'roomId'
        },
        likes: {
          name: 'likes',
          type: 'Like[]',
          model: 'Like',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'roomId'
        },
        categories: {
          name: 'categories',
          type: 'Category[]',
          model: 'Category',
          relationType: 'hasMany',
          modelThrough: 'RoomCategory',
          keyThrough: 'categoryId',
          keyFrom: 'id',
          keyTo: 'roomId'
        },
        accounts: {
          name: 'accounts',
          type: 'Account[]',
          model: 'Account',
          relationType: 'hasMany',
          modelThrough: 'RoomAccount',
          keyThrough: 'accountId',
          keyFrom: 'id',
          keyTo: 'roomId'
        },
        admins: {
          name: 'admins',
          type: 'Account[]',
          model: 'Account',
          relationType: 'hasMany',
          modelThrough: 'RoomAdmin',
          keyThrough: 'accountId',
          keyFrom: 'id',
          keyTo: 'adminId'
        },
      }
    }
  }
}
