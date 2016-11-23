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
  realm: string = '';
  username: string = '';
  password: string = '';
  challenges: any = null;
  email: string = '';
  emailVerified: boolean = false;
  verificationToken: string = '';
  status: string = '';
  created: Date = new Date(0);
  lastUpdated: Date = new Date(0);
  id: number = 0;
  accessTokens: Array<any> = [];
  rooms: Array<Room> = [];
  administrations: Array<Room> = [];
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
  public static getModelDefinition() {
    return {
      name: 'Account',
      properties: {
        realm: {
          name: 'realm',
          type: 'string'
        },
        username: {
          name: 'username',
          type: 'string'
        },
        password: {
          name: 'password',
          type: 'string'
        },
        credentials: {
          name: 'credentials',
          type: 'any'
        },
        challenges: {
          name: 'challenges',
          type: 'any'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        emailVerified: {
          name: 'emailVerified',
          type: 'boolean'
        },
        verificationToken: {
          name: 'verificationToken',
          type: 'string'
        },
        status: {
          name: 'status',
          type: 'string'
        },
        created: {
          name: 'created',
          type: 'Date'
        },
        lastUpdated: {
          name: 'lastUpdated',
          type: 'Date'
        },
        id: {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'Array<any>'
        },
        rooms: {
          name: 'rooms',
          type: 'Array<Room>'
        },
        administrations: {
          name: 'administrations',
          type: 'Array<Room>'
        },
      }
    }
  }
}
