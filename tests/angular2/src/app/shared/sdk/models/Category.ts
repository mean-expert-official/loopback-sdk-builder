/* tslint:disable */
import {
  Room
} from '../index';

declare var Object: any;
export interface CategoryInterface {
  name?: string;
  id?: number;
  rooms?: Array<Room>;
}

export class Category implements CategoryInterface {
  name: string;
  id: number;
  rooms: Array<Room>;
  constructor(instance?: CategoryInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Category`.
   */
  public static getModelName() {
    return "Category";
  }
}
