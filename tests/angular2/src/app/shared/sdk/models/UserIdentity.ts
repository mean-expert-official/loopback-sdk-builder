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
  provider: string = 'authScheme';
  authScheme: string = '';
  externalId: string = '';
  profile: any = null;
  credentials: string = '';
  created: Date = new Date(0);
  modified: Date = new Date(0);
  userId: number = 0;
  id: number = 0;
  user: User = null;
  constructor(data?: UserIdentityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserIdentity`.
   */
  public static getModelName() {
    return "UserIdentity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserIdentity for dynamic purposes.
  **/
  public static factory(data: UserIdentityInterface): UserIdentity{
    return new UserIdentity(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'UserIdentity',
      plural: 'UserIdentities',
      properties: {
        provider: {
          name: 'provider',
          type: 'string',
          default: 'authScheme'
        },
        authScheme: {
          name: 'authScheme',
          type: 'string',
          default: ''
        },
        externalId: {
          name: 'externalId',
          type: 'string',
          default: ''
        },
        profile: {
          name: 'profile',
          type: 'any',
          default: null
        },
        credentials: {
          name: 'credentials',
          type: 'string',
          default: ''
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
