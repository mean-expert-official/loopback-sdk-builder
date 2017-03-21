/* tslint:disable */
import {
  Message,
  Room
} from '../index';

declare var Object: any;
export interface LikeInterface {
  "set": any;
  "id"?: any;
  "createdAt": any;
  "updatedAt": any;
  "messageId"?: any;
  "roomId"?: any;
  message?: Message;
  room?: Room;
}

export class Like implements LikeInterface {
  "set": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  "messageId": any;
  "roomId": any;
  message: Message;
  room: Room;
  constructor(data?: LikeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Like`.
   */
  public static getModelName() {
    return "Like";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Like for dynamic purposes.
  **/
  public static factory(data: LikeInterface): Like{
    return new Like(data);
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
      name: 'Like',
      plural: 'likes',
      properties: {
        "set": {
          name: 'set',
          type: 'any',
          default: true
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
