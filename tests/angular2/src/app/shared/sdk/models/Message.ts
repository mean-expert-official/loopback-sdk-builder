/* tslint:disable */
import {
} from '../index';

export interface MessageInterface {
  
  text: string;    
  id?: number;    
  roomId?: number;  
  room?:any;
}

export class Message implements MessageInterface {
    
  text: string;  
  id: number;  
  roomId: number;  
  room:any;
  constructor(instance?: Message) {
    Object.assign(this, instance);
  }
}
