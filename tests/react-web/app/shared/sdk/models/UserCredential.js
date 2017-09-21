


export class UserCredential {
  "provider";
  "authScheme";
  "externalId";
  "profile";
  "credentials";
  "created";
  "modified";
  "userId";
  "id";
  "createdAt";
  "updatedAt";
  constructor(data) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserCredential`.
   */
  static getModelName() {
    return "UserCredential";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserCredential for dynamic purposes.
  **/
  static factory(data) {
    return new UserCredential(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  static getModelDefinition() {
    return {
      name: 'UserCredential',
      plural: 'user-credentials',
      path: 'user-credentials',
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
          default: null
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
}
