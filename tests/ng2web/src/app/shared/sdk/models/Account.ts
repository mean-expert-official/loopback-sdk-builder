/* tslint:disable */
import {
  Room
} from '../index';

declare var Object: any;
export interface AccountInterface {
  "realm"?: any;
  "username"?: any;
  "password": any;
  "email": any;
  "emailVerified"?: any;
  "verificationToken"?: any;
  "id"?: any;
  "createdAt": any;
  "updatedAt": any;
  accessTokens?: any[];
  rooms?: Room[];
  administrations?: Room[];
}

export class Account implements AccountInterface {
  "realm": any;
  "username": any;
  "password": any;
  "email": any;
  "emailVerified": any;
  "verificationToken": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  accessTokens: any[];
  rooms: Room[];
  administrations: Room[];
  constructor(data?: AccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Account for dynamic purposes.
  **/
  public static factory(data: AccountInterface): Account{
    return new Account(data);
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
      name: 'Account',
      plural: 'accounts',
      properties: {
        "realm": {
          name: 'realm',
          type: 'any'
        },
        "username": {
          name: 'username',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'any'
        },
        "email": {
          name: 'email',
          type: 'any'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'any'
        },
        "verificationToken": {
          name: 'verificationToken',
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
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
        rooms: {
          name: 'rooms',
          type: 'Room[]',
          model: 'Room'
        },
        administrations: {
          name: 'administrations',
          type: 'Room[]',
          model: 'Room'
        },
      }
    }
  }
}
