/* tslint:disable */

declare var Object: any;
export interface ApplicationCredentialInterface {
  provider?: string;
  authScheme?: string;
  credentials?: string;
  created?: Date;
  modified?: Date;
  userId?: any;
  id?: number;
}

export class ApplicationCredential implements ApplicationCredentialInterface {
  provider: string;
  authScheme: string;
  credentials: string;
  created: Date;
  modified: Date;
  userId: any;
  id: number;
  constructor(instance?: ApplicationCredentialInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ApplicationCredential`.
   */
  public static getModelName() {
    return "ApplicationCredential";
  }
}
