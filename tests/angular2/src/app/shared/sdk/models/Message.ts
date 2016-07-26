/* tslint:disable */
import {
  Room,
  Like
} from '../index';

export interface MessageInterface {
  
  text: string;    
  id?: number;    
  roomId?: number;  
  room?: Room;
  likes?: Array<Like>;
  
}

export class Message implements MessageInterface {
    
  text: string;  
  id: number;  
  roomId: number;  
  room: Room;
  likes: Array<Like>;
  
  constructor(instance?: Message) {
    Object.assign(this, instance);
  }
}
