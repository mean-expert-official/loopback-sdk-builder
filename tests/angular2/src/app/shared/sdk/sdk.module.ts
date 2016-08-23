/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MTI 2016 Jonathan Casarrubias
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
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { LoopBackAuth } from './services/core/auth.service';
import { ErrorHandler } from './services/core/error.service';
import { LoggerService } from './services/core/logger.service';
import { JSONSearchParams } from './services/core/search.params';
import { UserApi } from './services/custom/User';
import { RoomApi } from './services/custom/Room';
import { LikeApi } from './services/custom/Like';
import { ApplicationCredentialApi } from './services/custom/ApplicationCredential';
import { UserCredentialApi } from './services/custom/UserCredential';
import { UserIdentityApi } from './services/custom/UserIdentity';
import { CategoryApi } from './services/custom/Category';
import { AccountApi } from './services/custom/Account';
import { RoomAccountApi } from './services/custom/RoomAccount';
import { StorageApi } from './services/custom/Storage';

import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [ ]
})

export class SDKModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SDKModule,
      providers: [
      LoopBackAuth,
      ErrorHandler,
      LoggerService,
      JSONSearchParams,
      UserApi,
      RoomApi,
      LikeApi,
      ApplicationCredentialApi,
      UserCredentialApi,
      UserIdentityApi,
      CategoryApi,
      AccountApi,
      RoomAccountApi,
      StorageApi
      ]
    };
  }
}
