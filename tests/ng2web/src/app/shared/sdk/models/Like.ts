/* tslint:disable */
import {
  Message,
  Room
} from '../index';

declare var Object: any;
export interface LikeInterface {
  "set": boolean;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "messageId"?: any;
  "roomId"?: any;
  message?: Message;
  room?: Room;
}

export class Like implements LikeInterface {
  "set": boolean;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
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
      path: 'likes',
      idName: 'id',
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
          model: 'Message',
          relationType: 'belongsTo',
                  keyFrom: 'messageId',
          keyTo: 'id'
        },
        room: {
          name: 'room',
          type: 'Room',
          model: 'Room',
          relationType: 'belongsTo',
                  keyFrom: 'roomId',
          keyTo: 'id'
        },
      }
    }
  }
}
