/* tslint:disable */

declare var Object: any;
export interface CoreInterface {
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
}

export class Core implements CoreInterface {
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: CoreInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Core`.
   */
  public static getModelName() {
    return "Core";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Core for dynamic purposes.
  **/
  public static factory(data: CoreInterface): Core{
    return new Core(data);
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
      name: 'Core',
      plural: 'cores',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
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
       id: <any>null,
       createdAt: new Date(0),
       updatedAt: new Date(0),
     };
    return Core.factory(instance);
  }
}
