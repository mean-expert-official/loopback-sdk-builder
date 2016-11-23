/* tslint:disable */

declare var Object: any;
export interface UserCredentialInterface {
  provider?: string;
  authScheme?: string;
  externalId?: string;
  profile?: any;
  credentials?: string;
  created?: Date;
  modified?: Date;
  userId?: any;
  id?: number;
}

export class UserCredential implements UserCredentialInterface {
  provider: string;
  authScheme: string;
  externalId: string;
  profile: any;
  credentials: string;
  created: Date;
  modified: Date;
  userId: any;
  id: number;
  constructor(instance?: UserCredentialInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserCredential`.
   */
  public static getModelName() {
    return "UserCredential";
  }
  public static getModelDefinition() {
    return {
      name: 'UserCredential',
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
          type: 'any'
        },
        id: {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
