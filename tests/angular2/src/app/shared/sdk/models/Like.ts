/* tslint:disable */
import {
  Room
} from '../index';

export interface LikeInterface {
  set: boolean;
  id?: number;
  roomId?: number;
  messageId?: number;
  room?: Room;
  message?: any;
}

export class Like implements LikeInterface {
  set: boolean;
  id: number;
  roomId: number;
  messageId: number;
  room: Room;
  message: any;
  constructor(instance?: Like) {
    Object.assign(this, instance);
  }
}
