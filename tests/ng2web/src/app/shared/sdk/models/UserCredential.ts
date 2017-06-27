/* tslint:disable */

declare var Object: any;
export interface UserCredentialInterface {
  "provider"?: string;
  "authScheme"?: string;
  "externalId"?: string;
  "profile"?: any;
  "credentials"?: string;
  "created"?: Date;
  "modified"?: Date;
  "userId"?: any;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
}

export class UserCredential implements UserCredentialInterface {
  "provider": string;
  "authScheme": string;
  "externalId": string;
  "profile": any;
  "credentials": string;
  "created": Date;
  "modified": Date;
  "userId": any;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
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
          type: 'string',
          default: 'authScheme'
        },
        "authScheme": {
          name: 'authScheme',
          type: 'string',
          default: ''
        },
        "externalId": {
          name: 'externalId',
          type: 'string',
          default: ''
        },
        "profile": {
          name: 'profile',
          type: 'any',
          default: <any>null
        },
        "credentials": {
          name: 'credentials',
          type: 'string',
          default: ''
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date',
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
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }

  /**
  * @method emptyInstanceFactory
  * @author Michal Fraczkiewicz <bonaventoora@gmail.com>
  * @license MIT
  * This method returns an object instance with attributes initialised with default values
  * (to insert it into angular's FormBuilder for example).
  *
  * @example
  * // creates form group with fields from model definition
  * this.form = this._formBuilder.group(MeanModel.emptyInstanceFactory());
  **/
  public static emptyInstanceFactory() {
    let instance = {
       provider: 'authScheme',
       authScheme: '',
       externalId: '',
       profile: <any>null,
       credentials: '',
       created: new Date(0),
       modified: new Date(0),
       userId: <any>null,
       id: <any>null,
       createdAt: new Date(0),
       updatedAt: new Date(0),
     };
    return UserCredential.factory(instance);
  }
}
