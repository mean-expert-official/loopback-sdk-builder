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
      properties: [
        {
          name: 'realm',
          type: 'string'
        },
        {
          name: 'username',
          type: 'string'
        },
        {
          name: 'password',
          type: 'string'
        },
        {
          name: 'credentials',
          type: 'any'
        },
        {
          name: 'challenges',
          type: 'any'
        },
        {
          name: 'email',
          type: 'string'
        },
        {
          name: 'emailVerified',
          type: 'boolean'
        },
        {
          name: 'verificationToken',
          type: 'string'
        },
        {
          name: 'status',
          type: 'string'
        },
        {
          name: 'created',
          type: 'Date'
        },
        {
          name: 'lastUpdated',
          type: 'Date'
        },
        {
          name: 'id',
          type: 'number'
        },
      ],
      relations: [
        {
          name: 'accessTokens',
          type: 'Array<any>'
        },
        {
          name: 'rooms',
          type: 'Array<Room>'
        },
        {
          name: 'administrations',
          type: 'Array<Room>'
        },
      ]
    }
  }
}
