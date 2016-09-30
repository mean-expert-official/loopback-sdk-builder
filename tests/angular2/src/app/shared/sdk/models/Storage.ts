/* tslint:disable */

declare var Object: any;
export interface StorageInterface {
  id?: number;
}

export class Storage implements StorageInterface {
  id: number;
  constructor(instance?: StorageInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Storage`.
   */
  public static getModelName() {
    return "Storage";
  }
}
