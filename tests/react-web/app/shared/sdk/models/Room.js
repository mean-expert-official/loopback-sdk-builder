
import {
  Message,
  Like,
  Category,
  Account
} from '../index';


export class Room {
  "name";
  "id";
  "createdAt";
  "updatedAt";
  messages;
  likes;
  categories;
  accounts;
  admins;
  constructor(data) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Room`.
   */
  static getModelName() {
    return "Room";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Room for dynamic purposes.
  **/
  static factory(data) {
    return new Room(data);
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
      name: 'Room',
      plural: 'rooms',
      path: 'rooms',
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
