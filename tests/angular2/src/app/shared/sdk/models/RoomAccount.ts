/* tslint:disable */
import {
  Account,
  Room
} from '../index';

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
  constructor(instance?: RoomAccount) {
    Object.assign(this, instance);
  }
}
