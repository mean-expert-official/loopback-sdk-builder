/* tslint:disable */
import {
  Room
} from '../index';

declare var Object: any;
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
  constructor(instance?: LikeInterface) {
    Object.assign(this, instance);
  }
}
