/* tslint:disable */

declare var Object: any;
export interface UserInterface {
  "realm"?: any;
  "username"?: any;
  "password": any;
  "email": any;
  "emailVerified"?: any;
  "verificationToken"?: any;
  "id"?: any;
  accessTokens?: any[];
}

export class User implements UserInterface {
  "realm": any;
  "username": any;
  "password": any;
  "email": any;
  "emailVerified": any;
  "verificationToken": any;
  "id": any;
  accessTokens: any[];
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
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
      }
    }
  }
}
