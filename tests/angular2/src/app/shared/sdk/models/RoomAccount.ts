/* tslint:disable */
import {
  Account,
  Room
} from '../index';

declare var Object: any;
export interface RoomAccountInterface {
  id?: number;
  accountId?: number;
  roomId?: number;
  account?: Account;
  room?: Room;
}

export class RoomAccount implements RoomAccountInterface {
  id: number = 0;
  accountId: number = 0;
  roomId: number = 0;
  account: Account = null;
  room: Room = null;
  constructor(instance?: RoomAccountInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoomAccount`.
   */
  public static getModelName() {
    return "RoomAccount";
  }
}
