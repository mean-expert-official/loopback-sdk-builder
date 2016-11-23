/* tslint:disable */

declare var Object: any;
export interface ApplicationCredentialInterface {
  provider?: string;
  authScheme?: string;
  credentials?: string;
  created?: Date;
  modified?: Date;
  userId?: any;
  id?: number;
}

export class ApplicationCredential implements ApplicationCredentialInterface {
  provider: string = 'authScheme';
  authScheme: string = '';
  credentials: string = '';
  created: Date = new Date(0);
  modified: Date = new Date(0);
  userId: any = null;
  id: number = 0;
  constructor(instance?: ApplicationCredentialInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ApplicationCredential`.
   */
  public static getModelName() {
    return "ApplicationCredential";
  }
  public static getModelDefinition() {
    return {
      name: 'ApplicationCredential',
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
