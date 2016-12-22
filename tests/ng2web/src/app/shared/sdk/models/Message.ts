/* tslint:disable */
import {
  Like,
  Room
} from '../index';

declare var Object: any;
export interface MessageInterface {
  text: string;
  id?: number;
  parentId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  roomId?: number;
  likes?: Array<Like>;
  replies?: Array<Message>;
  parent?: Message;
  room?: Room;
}

export class Message implements MessageInterface {
  text: string = '';
  id: number = 0;
  parentId: number = 0;
  createdAt: Date = new Date(0);
  updatedAt: Date = new Date(0);
  roomId: number = 0;
  likes: Array<Like> = [];
  replies: Array<Message> = [];
  parent: Message = null;
  room: Room = null;
  constructor(data?: MessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Message for dynamic purposes.
  **/
  public static factory(data: MessageInterface): Message{
    return new Message(data);
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
      name: 'Message',
      plural: 'messages',
      properties: {
        text: {
          name: 'text',
          type: 'string',
          default: ''
        },
        id: {
          name: 'id',
          type: 'number'
        },
        parentId: {
          name: 'parentId',
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
        roomId: {
          name: 'roomId',
          type: 'number'
        },
      },
      relations: {
        likes: {
          name: 'likes',
          type: 'Array<Like>',
          model: 'Like'
        },
        replies: {
          name: 'replies',
          type: 'Array<Message>',
          model: 'Message'
        },
        parent: {
          name: 'parent',
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
