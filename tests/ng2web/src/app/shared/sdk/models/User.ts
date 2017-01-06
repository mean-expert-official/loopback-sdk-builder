/* tslint:disable */
import {
  AccessToken
} from '../index';

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
  created?: Date;
  lastUpdated?: Date;
  id?: number;
  accessTokens?: Array<AccessToken>;
}

export class User implements UserInterface {
  realm: string = '';
  username: string = '';
  password: string = '';
  challenges: any = <any>null;
  email: string = '';
  emailVerified: boolean = false;
  verificationToken: string = '';
  status: string = '';
  created: Date = new Date(0);
  lastUpdated: Date = new Date(0);
  id: number = 0;
  accessTokens: Array<AccessToken> = [];
  constructor(data?: UserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of User for dynamic purposes.
  **/
  public static factory(data: UserInterface): User{
    return new User(data);
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
      name: 'User',
      plural: 'Users',
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
          type: 'Array<AccessToken>',
          model: 'AccessToken'
        },
      }
    }
  }
}
