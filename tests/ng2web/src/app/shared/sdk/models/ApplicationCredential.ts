/* tslint:disable */

declare var Object: any;
export interface ApplicationCredentialInterface {
  "provider"?: any;
  "authScheme"?: any;
  "credentials"?: any;
  "created"?: any;
  "modified"?: any;
  "userId"?: any;
  "id"?: any;
  "createdAt": any;
  "updatedAt": any;
}

export class ApplicationCredential implements ApplicationCredentialInterface {
  "provider": any;
  "authScheme": any;
  "credentials": any;
  "created": any;
  "modified": any;
  "userId": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  constructor(data?: ApplicationCredentialInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ApplicationCredential`.
   */
  public static getModelName() {
    return "ApplicationCredential";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ApplicationCredential for dynamic purposes.
  **/
  public static factory(data: ApplicationCredentialInterface): ApplicationCredential{
    return new ApplicationCredential(data);
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
      name: 'ApplicationCredential',
      plural: 'application-credentials',
      properties: {
        "provider": {
          name: 'provider',
          type: 'any',
          default: 'authScheme'
        },
        "authScheme": {
          name: 'authScheme',
          type: 'any',
          default: ''
        },
        "credentials": {
          name: 'credentials',
          type: 'any',
          default: ''
        },
        "created": {
          name: 'created',
          type: 'any'
        },
        "modified": {
          name: 'modified',
          type: 'any'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'any'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
