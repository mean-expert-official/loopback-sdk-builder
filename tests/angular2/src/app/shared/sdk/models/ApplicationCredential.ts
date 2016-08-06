/* tslint:disable */

export interface ApplicationCredentialInterface {
  provider?: string;
  authScheme?: string;
  credentials?: string;
  created?: any;
  modified?: any;
  userId?: any;
  id?: number;
}

export class ApplicationCredential implements ApplicationCredentialInterface {
  provider: string;
  authScheme: string;
  credentials: string;
  created: any;
  modified: any;
  userId: any;
  id: number;
  constructor(instance?: ApplicationCredential) {
    Object.assign(this, instance);
  }
}
