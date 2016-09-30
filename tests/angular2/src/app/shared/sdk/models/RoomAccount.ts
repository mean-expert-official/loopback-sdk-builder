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
  id: number;
  accountId: number;
  roomId: number;
  account: Account;
  room: Room;
  constructor(instance?: RoomAccountInterface) {
    Object.assign(this, instance);
  }
}
