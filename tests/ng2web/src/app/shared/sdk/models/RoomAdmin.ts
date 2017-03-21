/* tslint:disable */
import {
  Account,
  Room
} from '../index';

declare var Object: any;
export interface RoomAdminInterface {
  "id"?: any;
  "adminId"?: any;
  "administrationId"?: any;
  "createdAt": any;
  "updatedAt": any;
  account?: Account;
  room?: Room;
}

export class RoomAdmin implements RoomAdminInterface {
  "id": any;
  "adminId": any;
  "administrationId": any;
  "createdAt": any;
  "updatedAt": any;
  account: Account;
  room: Room;
  constructor(data?: RoomAdminInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoomAdmin`.
   */
  public static getModelName() {
    return "RoomAdmin";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoomAdmin for dynamic purposes.
  **/
  public static factory(data: RoomAdminInterface): RoomAdmin{
    return new RoomAdmin(data);
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
      name: 'RoomAdmin',
      plural: 'room-admins',
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
          type: 'any'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'any'
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
