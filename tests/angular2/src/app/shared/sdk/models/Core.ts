/* tslint:disable */

declare var Object: any;
export interface CoreInterface {
  id?: number;
}

export class Core implements CoreInterface {
  id: number;
  constructor(instance?: CoreInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Core`.
   */
  public static getModelName() {
    return "Core";
  }
  public static getModelDefinition() {
    return {
      name: 'Core',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
