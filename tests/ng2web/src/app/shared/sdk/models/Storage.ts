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

  /**
  * @method emptyInstanceFactory
  * @author Michal Fraczkiewicz <bonaventoora@gmail.com>
  * @license MIT
  * This method returns an object instance with attributes initialised with default values
  * (to insert it into angular's FormBuilder for example).
  *
  * @example
  * // creates form group with fields from model definition
  * this.form = this._formBuilder.group(MeanModel.emptyInstanceFactory());
  **/
  public static emptyInstanceFactory() {
    let instance = {
       id: 0,
       createdAt: new Date(0),
       updatedAt: new Date(0),
     };
    return Storage.factory(instance);
  }
}
