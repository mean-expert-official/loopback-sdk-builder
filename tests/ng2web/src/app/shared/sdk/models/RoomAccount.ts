/* tslint:disable */
import {
  Account,
  Room
} from '../index';

declare var Object: any;
export interface RoomAccountInterface {
  "id"?: any;
  "accountId"?: any;
  "roomId"?: any;
  "createdAt": any;
  "updatedAt": any;
  account?: Account;
  room?: Room;
}

export class RoomAccount implements RoomAccountInterface {
  "id": any;
  "accountId": any;
  "roomId": any;
  "createdAt": any;
  "updatedAt": any;
  account: Account;
  room: Room;
  constructor(data?: RoomAccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoomAccount`.
   */
  public static getModelName() {
    return "RoomAccount";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoomAccount for dynamic purposes.
  **/
  public static factory(data: RoomAccountInterface): RoomAccount{
    return new RoomAccount(data);
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
      name: 'RoomAccount',
      plural: 'room-accounts',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
        "roomId": {
          name: 'roomId',
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
