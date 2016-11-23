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
      properties: [
        {
          name: 'text',
          type: 'string'
        },
        {
          name: 'id',
          type: 'number'
        },
        {
          name: 'roomId',
          type: 'number'
        },
        {
          name: 'parentId',
          type: 'number'
        },
      ],
      relations: [
        {
          name: 'room',
          type: 'Room'
        },
        {
          name: 'replies',
          type: 'Array<Message>'
        },
        {
          name: 'parent',
          type: 'Message'
        },
        {
          name: 'likes',
          type: 'Array<any>'
        },
      ]
    }
  }
}
