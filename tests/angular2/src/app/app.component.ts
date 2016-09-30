import { Component } from '@angular/core';
import { LoggerService } from './shared/sdk/services';
import { RealTime } from './shared/sdk/services';
import { Room, FireLoopRef } from './shared/sdk/models';
// Hardcoded Message interface, this because Messge models
// Is private, this is only for testing purposes, in real life
// the Message should not be private -if needed in front end-
interface Message { text: string; }

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
    this.realTime.IO.emit('hello', 'world');
    this.realTime.IO.on('hello').subscribe((msg: any) => this.logger.info('REALTIME: ', msg));
    // Simple FireLoop set and get examples.
    let RoomReference: FireLoopRef<Room> = this.realTime.FireLoop.ref<Room>(Room);
    // This will get the list of results and fire every time there is new data.
    RoomReference.on('value', { limit: 2 }).subscribe((rooms: Array<Room>) => this.logger.info(rooms));
    RoomReference.on('child_added', {
      limit: 2,
      order: 'id DESC'
    }).subscribe((room: Room) => this.logger.info(room.name));
    RoomReference.on('child_changed', {
      limit: 2,
      order: 'id DESC'
    }).subscribe((room: Room) => this.logger.info(room.name));
    // This will set a new value into the reference
    [
      new Room({ name: 'Room 1' }),
      new Room({ name: 'Room 2' }),
      new Room({ name: 'Room 3' }),
      new Room({ name: 'Room 4' })
    ].forEach((room: Room) => RoomReference.upsert(room).subscribe((instance: Room) => {
      console.log('ROOM IS CREATED');
      // Child Feature
     let MessageReference: FireLoopRef<Message> = RoomReference.make(instance).child<Message>('messages');
      MessageReference.on('child_created').subscribe(
        (messages: Array<Message>) => this.logger.info(messages)
      );
      MessageReference.upsert({  text : 'Hello Child Reference' }).subscribe((res: Message) => console.log(res.text));
    }));
  }
}
