/* tslint:disable */

declare var Object: any;
export interface UserInterface {
  realm?: string;
  username?: string;
  password: string;
  challenges?: any;
  email: string;
  emailVerified?: boolean;
  verificationToken?: string;
  status?: string;
  created?: Date;
  lastUpdated?: Date;
  id?: number;
  accessTokens?: Array<any>;
}

export class User implements UserInterface {
  realm: string = '';
  username: string = '';
  password: string = '';
  challenges: any = null;
  email: string = '';
  emailVerified: boolean = false;
  verificationToken: string = '';
  status: string = '';
  created: Date = new Date(0);
  lastUpdated: Date = new Date(0);
  id: number = 0;
  accessTokens: Array<any> = [];
  constructor(instance?: UserInterface) {
    Object.assign(this, instance);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  public static getModelDefinition() {
    return {
      name: 'User',
      properties: [
        {
          name: 'realm',
          type: 'string'
        },
        {
          name: 'username',
          type: 'string'
        },
        {
          name: 'password',
          type: 'string'
        },
        {
          name: 'credentials',
          type: 'any'
        },
        {
          name: 'challenges',
          type: 'any'
        },
        {
          name: 'email',
          type: 'string'
        },
        {
          name: 'emailVerified',
          type: 'boolean'
        },
        {
          name: 'verificationToken',
          type: 'string'
        },
        {
          name: 'status',
          type: 'string'
        },
        {
          name: 'created',
          type: 'Date'
        },
        {
          name: 'lastUpdated',
          type: 'Date'
        },
        {
          name: 'id',
          type: 'number'
        },
      ],
      relations: [
        {
          name: 'accessTokens',
          type: 'Array<any>'
        },
      ]
    }
  }
}
