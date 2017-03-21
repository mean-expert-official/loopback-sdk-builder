/* tslint:disable */

declare var Object: any;
export interface CoreInterface {
  "id"?: any;
  "createdAt": any;
  "updatedAt": any;
}

export class Core implements CoreInterface {
  "id": any;
  "createdAt": any;
  "updatedAt": any;
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
          type: 'any'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
