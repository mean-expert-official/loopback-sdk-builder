/* tslint:disable */
import {
  Message,
  Room
} from '../index';

declare var Object: any;
export interface LikeInterface {
  set: boolean;
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  messageId?: number;
  roomId?: number;
  message?: Message;
  room?: Room;
}

export class Like implements LikeInterface {
  set: boolean = true;
  id: number = 0;
  createdAt: Date = new Date(0);
  updatedAt: Date = new Date(0);
  messageId: number = 0;
  roomId: number = 0;
  message: Message = null;
  room: Room = null;
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
        set: {
          name: 'set',
          type: 'boolean',
          default: true
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
        messageId: {
          name: 'messageId',
          type: 'number'
        },
        roomId: {
          name: 'roomId',
          type: 'number'
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
