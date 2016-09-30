import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { roomRouting } from './room.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    roomRouting
  ],
  declarations: [RoomComponent]
})
export class RoomModule { }
