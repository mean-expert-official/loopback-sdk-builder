/* tslint:disable */
import {
  Room
} from '../index';

export interface CategoryInterface {
  name?: string;
  id?: number;
  rooms?: Array<Room>;
}

export class Category implements CategoryInterface {
  name: string;
  id: number;
  rooms: Array<Room>;
  constructor(instance?: Category) {
    Object.assign(this, instance);
  }
}
