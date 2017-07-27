/* tslint:disable */

declare var Object: any;
export interface StorageInterface {
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
}

export class Storage implements StorageInterface {
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: StorageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Storage`.
   */
  public static getModelName() {
    return "Storage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Storage for dynamic purposes.
  **/
  public static factory(data: StorageInterface): Storage{
    return new Storage(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Storage',
      plural: 'storages',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
