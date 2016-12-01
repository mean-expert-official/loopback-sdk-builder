/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDKModule }      from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDKModule.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { JSONSearchParams } from './services/core/search.params';
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage } from './storage/internal.storage';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnections } from './sockets/socket.connections';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { RealTime } from './services/core/real.time';
import { UserApi } from './services/custom/User';
import { RoomApi } from './services/custom/Room';
import { MessageApi } from './services/custom/Message';
import { ApplicationCredentialApi } from './services/custom/ApplicationCredential';
import { UserCredentialApi } from './services/custom/UserCredential';
import { UserIdentityApi } from './services/custom/UserIdentity';
import { CategoryApi } from './services/custom/Category';
import { AccountApi } from './services/custom/Account';
import { RoomAccountApi } from './services/custom/RoomAccount';
import { StorageApi } from './services/custom/Storage';
import { CoreApi } from './services/custom/Core';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler,
    SocketConnections
  ]
})
export class SDKBrowserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        JSONSearchParams,
        SDKModels,
        RealTime,
        UserApi,
        RoomApi,
        MessageApi,
        ApplicationCredentialApi,
        UserCredentialApi,
        UserIdentityApi,
        CategoryApi,
        AccountApi,
        RoomAccountApi,
        StorageApi,
        CoreApi,
        { provide: InternalStorage, useClass: CookieBrowser },
        { provide: SocketDriver, useClass: SocketBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';

