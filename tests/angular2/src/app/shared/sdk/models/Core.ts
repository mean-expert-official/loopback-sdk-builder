/* tslint:disable */

export interface CoreInterface {
  id?: number;
}

export class Core implements CoreInterface {
  id: number;
  constructor(instance?: Core) {
    Object.assign(this, instance);
  }
}
