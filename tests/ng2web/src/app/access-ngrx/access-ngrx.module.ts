import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessNgrxComponent } from './access-ngrx.component';
import { accessNgrxRouting } from './access-ngrx.routing';
import { FormsModule } from '@angular/forms';
import { LoopBackConfig } from '../shared/sdk/lb.config';
LoopBackConfig.setBaseURL('http://127.0.0.1:3002');

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    accessNgrxRouting
  ],
  declarations: [ AccessNgrxComponent ]
})
export class AccessNgrxModule {}
