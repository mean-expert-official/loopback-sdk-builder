
import {
  Message,
  Room
} from '../index';


export class Like {
  "set";
  "id";
  "createdAt";
  "updatedAt";
  "messageId";
  "roomId";
  message;
  room;
  constructor(data) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Like`.
   */
  static getModelName() {
    return "Like";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Like for dynamic purposes.
  **/
  static factory(data) {
    return new Like(data);
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
      name: 'Like',
      plural: 'likes',
      path: 'likes',
      properties: {
        "set": {
          name: 'set',
          type: 'boolean',
          default: true
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
        "messageId": {
          name: 'messageId',
          type: 'any'
        },
        "roomId": {
          name: 'roomId',
          type: 'any'
        },
      },
      relations: {
        message: {
          name: 'message',
          type: 'Message',
          model: 'Message'
        },
        room: {
          name: 'room',
          type: 'Room',
          model: 'Room'
        },
      }
    }
  }
}
