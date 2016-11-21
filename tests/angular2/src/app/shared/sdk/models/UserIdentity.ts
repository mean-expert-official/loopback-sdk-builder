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
      properties: {
        provider: {
          name: 'provider',
          type: 'string',
          default: 'authScheme'
        },
        authScheme: {
          name: 'authScheme',
          type: 'string'
        },
        externalId: {
          name: 'externalId',
          type: 'string',
          default: ''
        },
        profile: {
          name: 'profile',
          type: 'any'
        },
        credentials: {
          name: 'credentials',
          type: 'string'
        },
        created: {
          name: 'created',
          type: 'Date'
        },
        modified: {
          name: 'modified',
          type: 'Date'
        },
        userId: {
          name: 'userId',
          type: 'number'
        },
        id: {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        user: {
          name: 'user',
          type: 'User'
        },
      }
    }
  }
}
