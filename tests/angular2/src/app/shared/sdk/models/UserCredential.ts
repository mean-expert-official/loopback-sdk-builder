/* tslint:disable */

declare var Object: any;
export interface UserCredentialInterface {
  provider?: string;
  authScheme?: string;
  externalId?: string;
  profile?: any;
  credentials?: string;
  created?: Date;
  modified?: Date;
  userId?: any;
  id?: number;
}

export class UserCredential implements UserCredentialInterface {
  provider: string;
  authScheme: string;
  externalId: string;
  profile: any;
  credentials: string;
  created: Date;
  modified: Date;
  userId: any;
  id: number;
  constructor(instance?: UserCredentialInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserCredential`.
   */
  public static getModelName() {
    return "UserCredential";
  }
}
