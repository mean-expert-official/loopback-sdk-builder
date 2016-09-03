import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SDKModule } from './shared/sdk/sdk.module';
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SDKModule.forRoot(),
    routing
  ],
  providers       : [ appRoutingProviders ],
  entryComponents : [ AppComponent ],
  bootstrap       : [ AppComponent ]
})

export class AppModule {

}
