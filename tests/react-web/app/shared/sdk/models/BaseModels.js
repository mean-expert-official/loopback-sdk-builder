

export class AccessToken {
  "id";
  "ttl";
  "scopes";
  "created";
  "userId";
  "user";
  constructor(data) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AccessToken`.
   */
  static getModelName() {
    return "AccessToken";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AccessToken for dynamic purposes.
  **/
  static factory(data) {
    return new AccessToken(data);
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
      name: 'AccessToken',
      plural: 'AccessTokens',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "ttl": {
          name: 'ttl',
          type: 'number',
          default: 1209600
        },
        "scopes": {
          name: 'scopes',
          type: '["string"]'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
      },
      relations: {
        user: {
          name: 'user',
          type: 'User',
          model: 'User'
        },
      }
    }
  }
}

export class SDKToken {
  id = null;
  ttl = null;
  scopes = null;
  created = null;
  userId = null;
  user = null;
  rememberMe = null;
  constructor(data) {
    Object.assign(this, data);
  }
}

