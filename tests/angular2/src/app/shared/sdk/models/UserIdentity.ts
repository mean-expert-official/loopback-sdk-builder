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
  created?: any;
  modified?: any;
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
  created: any;
  modified: any;
  userId: number;
  id: number;
  user: User;
  constructor(instance?: UserIdentityInterface) {
    Object.assign(this, instance);
  }
}
