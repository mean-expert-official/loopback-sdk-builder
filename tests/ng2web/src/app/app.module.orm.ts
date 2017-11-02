import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { SDKBrowserModule, LoopbackEffects, LoopbackReducer } from './shared/sdk/index';
import { reducerToken, reducerProvider, effects } from './shared/app.state';
import { routing, appRoutingProviders } from './app.routing.orm';

import { OrmModule } from './shared/sdk/orm';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SDKBrowserModule.forRoot(),
    StoreModule.forRoot(reducerToken, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    }),
    EffectsModule.forRoot(effects),
    routing,
    OrmModule.forRoot()
  ],
  providers       : [
    appRoutingProviders,
    reducerProvider
  ],
  entryComponents : [ AppComponent ],
  bootstrap       : [ AppComponent ]
})
export class AppModule { }
