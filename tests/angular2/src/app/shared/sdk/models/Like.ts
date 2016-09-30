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
  /**
   * The name of the model represented by this $resource,
   * i.e. `Like`.
   */
  public static getModelName() {
    return "Like";
  }
}
