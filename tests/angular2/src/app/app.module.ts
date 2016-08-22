import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SDKModule } from './shared/sdk/sdk.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SDKModule.forRoot()
  ],
  providers       : [ ],
  entryComponents : [ AppComponent ],
  bootstrap       : [ AppComponent ]
})

export class AppModule {

}
