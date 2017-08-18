import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';
import { AppComponent } from './app.component';
import { SDKBrowserModule, LoopbackEffects, LoopbackReducer } from './shared/sdk/index';
import { AppEffects } from './shared/app.effects';
import * as fromApp from './shared/app.reducer';
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SDKBrowserModule.forRoot(),
    StoreModule.provideStore(Object.assign({}, LoopbackReducer, {
      app: fromApp.reducer
    })),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    ...LoopbackEffects,
    EffectsModule.run(AppEffects),
    routing
  ],
  providers       : [ appRoutingProviders ],
  entryComponents : [ AppComponent ],
  bootstrap       : [ AppComponent ]
})
export class AppModule { }
