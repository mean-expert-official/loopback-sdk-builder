/* tslint:disable */
import {
  User
} from '../index';

declare var Object: any;
export interface UserIdentityInterface {
  provider?: string;
  authScheme?: string;
  externalId?: string;
  profile?: any;
  credentials?: string;
  created?: Date;
  modified?: Date;
  userId?: number;
  id?: number;
  user?: User;
}

export class UserIdentity implements UserIdentityInterface {
  provider: string;
  authScheme: string;
  externalId: string;
  profile: any;
  credentials: string;
  created: Date;
  modified: Date;
  userId: number;
  id: number;
  user: User;
  constructor(instance?: UserIdentityInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserIdentity`.
   */
  public static getModelName() {
    return "UserIdentity";
  }
}
