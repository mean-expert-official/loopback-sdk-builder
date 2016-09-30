import { Component } from '@angular/core';
import { LoggerService } from './shared/sdk/services';
import { RealTime } from './shared/sdk/services';
import { Room } from './shared/sdk/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'LoopBack SDK Builder Test Application';

  constructor(
    private logger: LoggerService,
    private realTime: RealTime
  ) {
    this.logger.info('LoopBack SDK Builder - Test Application');
    // Simple IO Test
    //this.realTime.IO.emit('hello', 'world');
    //this.realTime.IO.on('hello').subscribe((msg: any) => this.logger.info('REALTIME: ', msg));
    // Simple FireLoop set and get examples.
    let RoomReference = this.realTime.FireLoop.ref('Room');
    // This will get the list of results and fire every time there is new data.
//    RoomReference.on('value', { limit: 2 }).subscribe((rooms: Array<Room>) => this.logger.info(rooms));
  /*  RoomReference.on('child_added', {
      limit: 2,
      order: 'id DESC'
    }).subscribe((room: Room) => this.logger.info(room));
    RoomReference.on('child_changed', {
      limit: 2,
      order: 'id DESC'
    }).subscribe((room: Room) => this.logger.info(room));*/
    // This will set a new value into the reference
    [
      new Room({ name: 'Room 1' }),
//      new Room({ name: 'Room 2' }),
//      new Room({ name: 'Room 3' }),
//      new Room({ name: 'Room 4' })
    ].forEach((room: Room) => RoomReference.upsert(room).subscribe((instance: Room) => {
      console.log('ROOM IS CREATED');
      // Child Feature
     let MessageReference = RoomReference.make(instance).child('messages');
      MessageReference.on('child_changed').subscribe(
        (messages: Array<{ text: string }>) => this.logger.info(messages)
      );
      MessageReference.upsert({  text : 'Hello Child Reference' }).subscribe((res: any) => console.log(res.text));
    }));
  }
}
