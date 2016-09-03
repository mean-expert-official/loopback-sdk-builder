import { Component, OnInit } from '@angular/core';
import { Room } from '../shared/sdk/models';
import { AccountApi, RoomApi, LoggerService } from '../shared/sdk/services';
import { Router } from '@angular/router';
@Component({
  selector: 'room',
  templateUrl: 'room.component.html'
})

export class RoomComponent implements OnInit {

  private room: Room = new Room();

  constructor(
    private accountApi: AccountApi,
    private roomApi: RoomApi,
    private router: Router,
    private logger: LoggerService
  ) {
    this.logger.info('Room Module Loaded');
  }

  ngOnInit() { }

  logout(): void {
    this.accountApi.logout().subscribe(res => this.router.navigate(['/access']));
  }

  create(): void {
    this.roomApi.create(this.room).subscribe((room: Room) => {
      this.room = room;
    });
  }

  join(): void {
    this.roomApi.findOne({
      where: { name: this.room.name },
      include: 'messages'
    }).subscribe((room: Room) => this.room = room, err => alert(err.message));
  }
  // We usually would use a Message model, but for testing purposes... The Message model
  // is private, therefore is not exposed to the SDK, that is expected in this test app
  // to address that use case. I don't recommend to follow the below as an example as I 
  // would normally use the Message model exposed, like we did with Room. (JC)'
  send(message: string): void {
    this.roomApi.createMessages(this.room.id, {
      text: message
    }).subscribe(instance => {
      message = '';
      this.room.messages = Array.isArray(this.room.messages) ? this.room.messages : [];
      this.room.messages.push(instance);
    });
  }
}