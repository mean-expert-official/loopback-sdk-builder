
import {
  Account,
  Room
} from '../index';


export class RoomAdmin {
  "id";
  "adminId";
  "administrationId";
  "createdAt";
  "updatedAt";
  account;
  room;
  constructor(data) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoomAdmin`.
   */
  static getModelName() {
    return "RoomAdmin";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoomAdmin for dynamic purposes.
  **/
  static factory(data) {
    return new RoomAdmin(data);
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
      name: 'RoomAdmin',
      plural: 'room-admins',
      path: 'room-admins',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "adminId": {
          name: 'adminId',
          type: 'any'
        },
        "administrationId": {
          name: 'administrationId',
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
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account'
        },
        room: {
          name: 'room',
          type: 'Room',
          model: 'Room'
        },
      }
    }
  }
}
