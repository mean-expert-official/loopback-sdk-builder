/* tslint:disable */
import {
  Like,
  Category
} from '../index';

export interface RoomInterface {
  name: string;
  id?: number;
  messages?: Array<any>;
  likes?: Array<Like>;
  categories?: Array<Category>;
}

export class Room implements RoomInterface {
  name: string;
  id: number;
  messages: Array<any>;
  likes: Array<Like>;
  categories: Array<Category>;
  constructor(instance?: Room) {
    Object.assign(this, instance);
  }
}
