import { Component } from '@angular/core';
import { Room } from './shared/sdk/models';
import { RoomApi } from './shared/sdk/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  title = 'app works!';
  /*
  constructor(private roomApi: RoomApi) {
    let room: Room = new Room();
        room.name = 'My Room';
    this.roomApi.create(room).subscribe((instance: Room) => {
      console.log(instance);
    });
  }
  */
}
