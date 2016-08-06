/* tslint:disable */

export interface UserCredentialInterface {
  provider?: string;
  authScheme?: string;
  externalId?: string;
  profile?: any;
  credentials?: string;
  created?: any;
  modified?: any;
  userId?: any;
  id?: number;
}

export class UserCredential implements UserCredentialInterface {
  provider: string;
  authScheme: string;
  externalId: string;
  profile: any;
  credentials: string;
  created: any;
  modified: any;
  userId: any;
  id: number;
  constructor(instance?: UserCredential) {
    Object.assign(this, instance);
  }
}
