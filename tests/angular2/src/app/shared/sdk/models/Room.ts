/* tslint:disable */
import {
} from '../index';

export interface RoomInterface {
  
  name: string;    
  id?: number;  
  messages?: Array<any>;
}

export class Room implements RoomInterface {
    
  name: string;  
  id: number;  
  messages: Array<any>;
  constructor(instance?: Room) {
    Object.assign(this, instance);
  }
}
