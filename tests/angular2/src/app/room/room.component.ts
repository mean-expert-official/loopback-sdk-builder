import { Component, OnInit } from '@angular/core';
import { Room, Account, FireLoopRef } from '../shared/sdk/models';
import { AccountApi, RoomApi, LoggerService, RealTime } from '../shared/sdk/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-room',
  templateUrl: 'room.component.html'
})

export class RoomComponent implements OnInit {

  private logged: Account;
  private accountRef: FireLoopRef<Account>;
  private room: Room = new Room();
  private subscription: Subscription;

  constructor(
    private accountApi: AccountApi,
    private roomApi: RoomApi,
    private router: Router,
    private logger: LoggerService,
    private realTime: RealTime
  ) {
    this.logger.info('Room Module Loaded');
    this.logged = this.accountApi.getCachedCurrent();
    this.accountRef = this.realTime.FireLoop.ref<Account>(Account);
  }

  ngOnInit() {}

  logout(): void {
    this.accountApi.logout().subscribe(res => this.router.navigate(['/access']));
  }

  update(): void {
    this.accountRef.upsert(this.logged).subscribe(res => console.log(res));
  }

  create(): void {
    this.roomApi.create(this.room).subscribe((room: Room) => {
      this.room = room;
      this.listen();
    });
  }

  join(): void {
    this.roomApi.findOne({
      where: { name: this.room.name },
      include: 'messages'
    }).subscribe((room: Room) => {
      this.room = room;
      this.listen();
    }, err => alert(err.message));
  }
  // We usually would use a Message model, but for testing purposes... The Message model
  // is private, therefore is not exposed to the SDK, that is expected in this test app
  // to address that use case. I don't recommend to follow the below as an example as I 
  // would normally use the Message model exposed, like we did with Room. (JC)'
  send(message: string): void {
    this.roomApi.createMessages(this.room.id, {
      text: message
    }).subscribe(instance => this.logger.info('Message stored'));
  }

  listen() {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.subscription = this.roomApi.onCreateMessages(this.room.id).subscribe((message: any) => {
      this.room.messages = Array.isArray(this.room.messages) ? this.room.messages : [];
      this.room.messages.push(message);
    });
  }
}
