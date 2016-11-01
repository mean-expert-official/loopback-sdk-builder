/* tslint:disable */
import {
  Room
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
  created?: Date;
  lastUpdated?: Date;
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
  created: Date;
  lastUpdated: Date;
  id: number;
  accessTokens: Array<any>;
  rooms: Array<Room>;
  administrations: Array<Room>;
  constructor(instance?: AccountInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
}
