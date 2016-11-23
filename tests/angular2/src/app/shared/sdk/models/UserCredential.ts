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
          type: 'any'
        },
        {
          name: 'id',
          type: 'number'
        },
      ],
      relations: [
      ]
    }
  }
}
