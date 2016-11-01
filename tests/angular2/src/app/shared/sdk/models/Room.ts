/* tslint:disable */
import {
  Message,
  Category,
  Account
} from '../index';

declare var Object: any;
export interface RoomInterface {
  name: string;
  id?: number;
  messages?: Array<Message>;
  likes?: Array<any>;
  categories?: Array<Category>;
  accounts?: Array<Account>;
  admins?: Array<Account>;
}

export class Room implements RoomInterface {
  name: string;
  id: number;
  messages: Array<Message>;
  likes: Array<any>;
  categories: Array<Category>;
  accounts: Array<Account>;
  admins: Array<Account>;
  constructor(instance?: RoomInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Room`.
   */
  public static getModelName() {
    return "Room";
  }
}
