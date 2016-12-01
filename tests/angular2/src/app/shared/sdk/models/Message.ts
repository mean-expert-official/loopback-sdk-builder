/* tslint:disable */
import {
  Room
} from '../index';

declare var Object: any;
export interface MessageInterface {
  text: string;
  id?: number;
  roomId?: number;
  parentId?: number;
  room?: Room;
  replies?: Array<Message>;
  parent?: Message;
  likes?: Array<any>;
}

export class Message implements MessageInterface {
  text: string = '';
  id: number = 0;
  roomId: number = 0;
  parentId: number = 0;
  room: Room = null;
  replies: Array<Message> = [];
  parent: Message = null;
  likes: Array<any> = [];
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
        roomId: {
          name: 'roomId',
          type: 'number'
        },
        parentId: {
          name: 'parentId',
          type: 'number'
        },
      },
      relations: {
        room: {
          name: 'room',
          type: 'Room',
          model: 'Room'
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
        likes: {
          name: 'likes',
          type: 'Array<any>',
          model: ''
        },
      }
    }
  }
}
