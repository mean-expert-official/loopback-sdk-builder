import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessComponent } from './access.component';
import { accessRouting } from './access.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    accessRouting
  ],
  declarations: [ AccessComponent ]
})
export class AccessModule { }
