LoopBack SDK Buider 2.0.0 (Angular 2 Documentation)
==================

The LoopBack SDK Builder provides you with a set of tools, services and declaration files; making beyond easy to integrate our LoopBack API with any Angular 2 Application (web or mobile).

## Setup

You need to install and configure the `loopback-sdk-builder` as stated in the [README](https://www.npmjs.com/package/loopback-sdk-builder) File in order to generate the SDK Barrel.

#### Client Requirements
Once you have the `SDK Barrel` generated, the following package needs to be installed in your client application.

````sh
$ npm install --save @angular/http
````
 
##### Optional Requirements
If you are working in a real-time application, you are using the [loopback-component-pubsub](https://www.npmjs.com/package/loopback-component-pubsub) and you want to have built in support within your generated sdk; then one of the following packages needs to be installed in your client application.

**When using the SDK for Web(View)**
````sh
$ npm install --save socket.io-client
````

**When using the SDK for NativeScript**
````sh
$ npm install --save nativescript-socket.io
````

## Configure Angular 2 Application

Once you have everything installed, you need to configure your `Angular 2 Application`. 

`angular-web/app/main.ts`
````js
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { API_PROVIDERS, LoggerConfig } from './shared';
LoggerConfig.enabled = true;
bootstrap(AppComponent, [...API_PROVIDERS]);
````

### or

`native-script/app/main.ts`
````js
import { nativeScriptBootstrap } from "nativescript-angular/application";
import { AppComponent } from "./app.component";
import { API_PROVIDERS, LoggerConfig } from "./shared";
LoggerConfig.enabled = true;
nativeScriptBootstrap(AppComponent, [ ...API_PROVIDERS ]);
````

Basically the only difference is the bootstrap component that is different between these platforms.

## First Steps

The very first thing you need to do after everything is installed within your Angular 2 Application, is to import and configure the sdk in the components you will be using it.

````js
import { LoopBackConfig } from './shared';
@Component(...)
export class AppComponent {
  constructor() {
    LoopBackConfig.setBaseURL('http://127.0.0.1:3000');
    LoopBackConfig.setApiVersion('api');
  }
}
````

This basic configuration needs to be done in every componente that will be implementing the SDK provided services.

I know some of you may be asking your self; *Why do I need to configure this in every single component?* And the answer is because we want to decouple our components as possible, so each of these will have their own configuration, therefore you will be able to point your components to different API instances and versions.

For instance, having a SSO will require you to point `+signin/up` component to a different API than the rest of the components.

Also, it will be easier to move components between api versions.

If none of these are your case, then you may want to create a base.url.ts file inside the `./shared` directory with the following content:

````js
export const BASE_URL = 'http://127.0.0.1:3000';
export const API_VERSION = 'api';
````

And then just update your configuration as follows:

````js
import { LoopBackConfig, BASE_URL, API_VERSION } from './shared';
@Component(...)
export class AppComponent {
  constructor() {
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
}
````

**IMPORTANT:** If you don't understand what barrels and the shared directory stands for, please read the [following link](https://angular.io/styleguide#-a-id-04-10-a-create-and-import-barrels)

## Services, Interfaces and Models (SIM)
When generating your SDK; The LoopBack SDK Builder will create a SIM set for each Model you have defined in your LoopBack Application.

#### Services
Services are regular Angular 2 `@Injectable()` Services that allows you to interact with your API either through standard RESTful communication or over WebSockets.

#### Interfaces
Will declare all of the model properties defined in your LoopBack Application, it will even set these as optional or required according your model configuration.

#### Models
Models are regular classes that will implement only the required properties from the implemented Interface.

Models and Interfaces are a set of [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html).

## Naming Convention
While generating your SDK; the LoopBack SDK Builder will create each of these components for each Model you have defined in your LoopBack Application.

- Services.- Adds an `Api` postfix to the Model name.
- Interfaces.- Adds an `Interface` postfix to the Model name.
- Model.- Is just the Model name.

## Basic Example
In order to show you what the provided *SIMs* can do for you; let me put an example code as easy as pie.

````js
import { Component } from '@angular/core';
// Basically everything you need is provided by the SDK Barrel
import {
    Account,
    AccountApi,
    TokenInterface,
    BASE_URL,
    API_VERSION,
    LoopBackConfig
} from '../shared'; 

@Component(...)

export class SignComponent {

    // Create model instances and set the right type effortless
    private account: Account = new Account();
    
    // Configure LoopBack Once or Individualy by Component
    constructor(private accountApi: AccountApi) {
        LoopBackConfig.setBaseURL(BASE_URL);
        LoopBackConfig.setApiVersion(API_VERSION);
    }
    
    // Start making API calls right away
    private signup(): void {
        this.accountApi.create(this.account).subscribe((acount: Account) => this.signin());
    }

    // Built-in LoopBack Authentication and Typings like Account and TokenInterface
    private signin(): void {
        this.accountApi.login(this.account).subscribe((token: TokenInterface) => alert('Fake Redirect'));
    }
}
````

As you can see, using the LoopBack SDK for Angular 2 is nice and easy... Now lets make an example of how to subscribe to published events by the server.

## Real-Time Application Example

````js
import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import {
  Room,
  RoomApi,
  RoomInterface,
  AccountApi,
  Message,
  MessageInterface,
  BASE_URL,
  API_VERSION,
  LoopBackConfig,
} from '../../shared';

@Component(...)

export class RoomComponent {
  // All the types you need already there
  private room    : RoomInterface = new Room();
  private message : MessageInterface = new Message();
  private messages: Array<Message>;
  // All the services you need already there
  constructor(
    private accountApi: AccountApi,
    private roomApi   : RoomApi,
    private params    : RouteParams
  ) {
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
    this.getRoom(this.params.get('id'));
  }
  // Built in support for the LoopBack Query Language (Include, Where, Order, Limit, Offset, Etc...)
  // Built in support for the LoopBack Component Pubsub (roomApi.onCreateMessages(id: RoomId))
  getRoom(id: any): void {
      this.roomApi.findById(id, {
        include: [
          {
            relation: 'accounts',
            scope: { order: 'id DESC' }
          },
          {
            relation: 'messages',
            scope: { order: 'id DESC' }
          }
        ]
      }).subscribe((room: Room) => {
        this.room = room;
        this.roomApi.onCreateMessages(this.room.id)
                    .subscribe((message: Message) => this.messages.unshift(message))
      });
  }

  // Built in logged account functionality
  sendMessage(): void {
    this.message.accountId = this.accountApi.getCurrentId();
    this.roomApi.createMessages(this.room.id, this.message)
                .subscribe(() => this.message = new Message());
  }
}
````

## Logger Service

The LoggerService is a tool that wraps the `console` methods (log, info, warn, error, count, group, profile, etc.) but allowing you to disable/enable your logs for development/production mode.

````js
import { LoggerService } from './shared';
...
class MyComponent {
  constructor(private loggerService: LoggerService) {
    this.loggerServicer.info('Component is Loaded');
  }
}
````

**How to disable the LoggerService**

`main.ts`
````js
import { LoggerConfig } from './shared';
LoggerConfig.enabled = false;
````

## Tutorials

- [The Ultimate Guide for Building Real Time Applications](http://mean.expert/2016/06/09/angular-2-ultimate-real-time/)
- [The Ultimate Guide for Building Native Applications](https://t.co/7YobnH5Iil)

## Contact

Discuss features and ask questions on [Twitter](https://twitter.com/johncasarrubias).
