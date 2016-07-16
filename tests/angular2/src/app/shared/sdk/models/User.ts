/* tslint:disable */
import {
  AccessToken
} from '../index';

export interface UserInterface {
  
  realm?: string;    
  username?: string;    
  password: string;    
  credentials?: any;    
  challenges?: any;    
  email: string;    
  emailVerified?: boolean;    
  verificationToken?: string;    
  status?: string;    
  created?: any;    
  lastUpdated?: any;    
  id?: number;  
  accessTokens?: Array<AccessToken>;
  
}

export class User implements UserInterface {
    
  realm: string;  
  username: string;  
  password: string;  
  credentials: any;  
  challenges: any;  
  email: string;  
  emailVerified: boolean;  
  verificationToken: string;  
  status: string;  
  created: any;  
  lastUpdated: any;  
  id: number;  
  accessTokens: Array<AccessToken>;
  
  constructor(instance?: User) {
    Object.assign(this, instance);
  }
}
