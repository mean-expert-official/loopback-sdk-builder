/* tslint:disable */
import {
  Like,
  Category,
  Account,
} from '../index';

export interface RoomInterface {
  name: string;
  id?: number;
  messages?: Array<any>;
  likes?: Array<Like>;
  categories?: Array<Category>;
  accounts?: Array<Account>;
  admins?: Array<Account>;
}

export class Room implements RoomInterface {
  name: string;
  id: number;
  messages: Array<any>;
  likes: Array<Like>;
  categories: Array<Category>;
  accounts: Array<Account>;
  admins: Array<Account>;
  constructor(instance?: Room) {
    Object.assign(this, instance);
  }
}
