/* tslint:disable */

declare var Object: any;
export interface UserCredentialInterface {
  "provider"?: any;
  "authScheme"?: any;
  "externalId"?: any;
  "profile"?: any;
  "credentials"?: any;
  "created"?: any;
  "modified"?: any;
  "userId"?: any;
  "id"?: any;
  "createdAt": any;
  "updatedAt": any;
}

export class UserCredential implements UserCredentialInterface {
  "provider": any;
  "authScheme": any;
  "externalId": any;
  "profile": any;
  "credentials": any;
  "created": any;
  "modified": any;
  "userId": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  constructor(data?: UserCredentialInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserCredential`.
   */
  public static getModelName() {
    return "UserCredential";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserCredential for dynamic purposes.
  **/
  public static factory(data: UserCredentialInterface): UserCredential{
    return new UserCredential(data);
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
      name: 'UserCredential',
      plural: 'user-credentials',
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
        "externalId": {
          name: 'externalId',
          type: 'any',
          default: ''
        },
        "profile": {
          name: 'profile',
          type: 'any',
          default: <any>null
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
          type: 'any',
          default: new Date(0)
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
