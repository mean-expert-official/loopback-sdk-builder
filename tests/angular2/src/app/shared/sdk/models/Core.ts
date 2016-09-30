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
}
