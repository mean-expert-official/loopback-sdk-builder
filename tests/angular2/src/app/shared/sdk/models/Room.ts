/* tslint:disable */
import {
  Message,
  Like
} from '../index';

export interface RoomInterface {
  
  name: string;    
  id?: number;  
  messages?: Array<Message>;
  likes?: Array<Like>;
  
}

export class Room implements RoomInterface {
    
  name: string;  
  id: number;  
  messages: Array<Message>;
  likes: Array<Like>;
  
  constructor(instance?: Room) {
    Object.assign(this, instance);
  }
}
