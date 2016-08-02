/* tslint:disable */
import {
  Room,
  Like
} from '../index';

export interface MessageInterface {
  text?: string;
  id: number;
  roomId: number;
  parentId: number;
  room?: Room;
  replies?: Array<Message>;
  parent?: Message;
  likes?: Array<Like>;
}

export class Message implements MessageInterface {
  text: string;
  id: number;
  roomId: number;
  parentId: number;
  room: Room;
  replies: Array<Message>;
  parent: Message;
  likes: Array<Like>;
  constructor(instance?: Message) {
    Object.assign(this, instance);
  }
}
