/* tslint:disable */
import {
  Room
} from '../index';

export interface MessageInterface {
  
  text: string;    
  id?: number;    
  roomId?: number;  
  room?:Room;
  
}

export class Message implements MessageInterface {
    
  text: string;  
  id: number;  
  roomId: number;  
  room:Room;
  
  constructor(instance?: Message) {
    Object.assign(this, instance);
  }
}
