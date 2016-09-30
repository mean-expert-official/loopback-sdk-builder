/* tslint:disable */

declare var Object: any;
export interface UserInterface {
  realm?: string;
  username?: string;
  password: string;
  challenges?: any;
  email: string;
  emailVerified?: boolean;
  verificationToken?: string;
  status?: string;
  created?: any;
  lastUpdated?: any;
  id?: number;
  accessTokens?: Array<any>;
}

export class User implements UserInterface {
  realm: string;
  username: string;
  password: string;
  challenges: any;
  email: string;
  emailVerified: boolean;
  verificationToken: string;
  status: string;
  created: any;
  lastUpdated: any;
  id: number;
  accessTokens: Array<any>;
  constructor(instance?: UserInterface) {
    Object.assign(this, instance);
  }
}
