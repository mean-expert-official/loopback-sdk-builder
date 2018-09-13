import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessComponent } from './access.component';
import { accessRouting } from './access.routing';
import { FormsModule } from '@angular/forms';
import { LoopBackConfig } from '../shared/sdk/lb.config';
LoopBackConfig.setBaseURL('http://localhost:3000');

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    accessRouting
  ],
  declarations: [ AccessComponent ]
})
export class AccessModule {}
