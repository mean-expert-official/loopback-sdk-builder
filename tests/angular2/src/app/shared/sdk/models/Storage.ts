/* tslint:disable */

export interface StorageInterface {
  id?: number;
}

export class Storage implements StorageInterface {
  id: number;
  constructor(instance?: Storage) {
    Object.assign(this, instance);
  }
}
