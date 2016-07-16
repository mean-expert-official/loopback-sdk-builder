/* tslint:disable */
import {
  Message
} from '../index';

export interface RoomInterface {
  
  name: string;    
  id?: number;  
  messages?: Array<Message>;
  
}

export class Room implements RoomInterface {
    
  name: string;  
  id: number;  
  messages: Array<Message>;
  
  constructor(instance?: Room) {
    Object.assign(this, instance);
  }
}
