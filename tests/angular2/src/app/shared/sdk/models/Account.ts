/* tslint:disable */
import {
  Room,
} from '../index';

declare var Object: any;
export interface AccountInterface {
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
  rooms?: Array<Room>;
  administrations?: Array<Room>;
}

export class Account implements AccountInterface {
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
  rooms: Array<Room>;
  administrations: Array<Room>;
  constructor(instance?: AccountInterface) {
    Object.assign(this, instance);
  }
}
