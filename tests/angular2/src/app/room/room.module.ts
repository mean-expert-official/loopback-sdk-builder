import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './room.list.component';
import { RoomComponent } from './room.component';
import { roomRouting } from './room.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    roomRouting
  ],
  declarations: [ RoomListComponent, RoomComponent ]
})
export class RoomModule { }
