/* tslint:disable */
import {
  Like,
  Room
} from '../index';

declare var Object: any;
export interface MessageInterface {
  "text": string;
  "id"?: any;
  "parentId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "roomId"?: any;
  likes?: Like[];
  replies?: Message[];
  parent?: Message;
  room?: Room;
}

export class Message implements MessageInterface {
  "text": string;
  "id": any;
  "parentId": any;
  "createdAt": Date;
  "updatedAt": Date;
  "roomId": any;
  likes: Like[];
  replies: Message[];
  parent: Message;
  room: Room;
  constructor(data?: MessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Message for dynamic purposes.
  **/
  public static factory(data: MessageInterface): Message{
    return new Message(data);
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
      name: 'Message',
      plural: 'messages',
      path: 'messages',
      idName: 'id',
      properties: {
        "text": {
          name: 'text',
          type: 'string',
          default: ''
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "parentId": {
          name: 'parentId',
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
        "roomId": {
          name: 'roomId',
          type: 'any'
        },
      },
      relations: {
        likes: {
          name: 'likes',
          type: 'Like[]',
          model: 'Like',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'messageId'
        },
        replies: {
          name: 'replies',
          type: 'Message[]',
          model: 'Message',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'parentId'
        },
        parent: {
          name: 'parent',
          type: 'Message',
          model: 'Message',
          relationType: 'belongsTo',
                  keyFrom: 'parentId',
          keyTo: 'id'
        },
        room: {
          name: 'room',
          type: 'Room',
          model: 'Room',
          relationType: 'belongsTo',
                  keyFrom: 'roomId',
          keyTo: 'id'
        },
      }
    }
  }
}
