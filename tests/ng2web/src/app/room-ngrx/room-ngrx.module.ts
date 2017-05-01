import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomNgrxListComponent } from './room-ngrx.list.component';
import { RoomNgrxComponent } from './room-ngrx.component';
import { roomNgrxRouting } from './room-ngrx.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    roomNgrxRouting
  ],
  declarations: [ RoomNgrxListComponent, RoomNgrxComponent ]
})
export class RoomNgrxModule { }
