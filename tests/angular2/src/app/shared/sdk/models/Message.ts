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
  text: string;
  id: number;
  roomId: number;
  parentId: number;
  room: Room;
  replies: Array<Message>;
  parent: Message;
  likes: Array<any>;
  constructor(instance?: MessageInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  public static getModelDefinition() {
    return {
      name: 'Message',
      properties: {
        text: {
          name: 'text',
          type: 'string'
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
          type: 'Room'
        },
        replies: {
          name: 'replies',
          type: 'Array<Message>'
        },
        parent: {
          name: 'parent',
          type: 'Message'
        },
        likes: {
          name: 'likes',
          type: 'Array<any>'
        },
      }
    }
  }
}
