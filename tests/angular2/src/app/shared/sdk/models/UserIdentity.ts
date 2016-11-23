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
  public static getModelDefinition() {
    return {
      name: 'UserIdentity',
      properties: [
        {
          name: 'provider',
          type: 'string',
          default: 'authScheme'
        },
        {
          name: 'authScheme',
          type: 'string'
        },
        {
          name: 'externalId',
          type: 'string',
          default: ''
        },
        {
          name: 'profile',
          type: 'any'
        },
        {
          name: 'credentials',
          type: 'string'
        },
        {
          name: 'created',
          type: 'Date'
        },
        {
          name: 'modified',
          type: 'Date'
        },
        {
          name: 'userId',
          type: 'number'
        },
        {
          name: 'id',
          type: 'number'
        },
      ],
      relations: [
        {
          name: 'user',
          type: 'User'
        },
      ]
    }
  }
}
