/* tslint:disable */
import {
  Room,
  Message
} from '../index';

export interface LikeInterface {
  set?: boolean;
  id: number;
  roomId: number;
  messageId: number;
  room?: Room;
  message?: Message;
}

export class Like implements LikeInterface {
  set: boolean;
  id: number;
  roomId: number;
  messageId: number;
  room: Room;
  message: Message;
  constructor(instance?: Like) {
    Object.assign(this, instance);
  }
}
