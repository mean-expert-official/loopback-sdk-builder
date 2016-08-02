/* tslint:disable */
export interface LoopBackFilter {
  fields?: any;
  include?: any;
  limit?: any;
  order?: any;
  skip?: any;
  offset?: any;
  where?: any;
}

export interface AccessTokenInterface {
    id?: string;
    ttl?: number;
    created?: any;
    userId?: string;
    user?: any;
}

export class AccessToken implements AccessTokenInterface {
    id:string;
    ttl: number;
    created: any;
    userId: string;
    user: any;
    constructor(instance?: AccessToken) {
        Object.assign(this, instance);
    }
}
