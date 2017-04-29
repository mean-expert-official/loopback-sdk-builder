import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { SDKBrowserModule, LoopbackEffects, LoopbackReducer } from './shared/sdk/index';
import { routing, appRoutingProviders } from './app.routing';

export function Reducer(state: any, action: any) {
  return combineReducers(LoopbackReducer);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SDKBrowserModule.forRoot(),
    StoreModule.provideStore(Reducer),
    ...LoopbackEffects,
    routing
  ],
  providers       : [ appRoutingProviders ],
  entryComponents : [ AppComponent ],
  bootstrap       : [ AppComponent ]
})
export class AppModule { }
