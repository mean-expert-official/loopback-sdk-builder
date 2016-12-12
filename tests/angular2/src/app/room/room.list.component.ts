import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room, Account, FireLoopRef } from '../shared/sdk/models';
// import { AccountApi, RoomApi, LoggerService, RealTime } from '../shared/sdk/services';
import { AccountApi, RoomApi, LoggerService, RealTime, SDKModels } from '../shared/sdk/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoopBackConfig } from '../shared/sdk/lb.config';
LoopBackConfig.setBaseURL('http://127.0.0.1:3002');
@Component({
  selector: 'app-room',
  templateUrl: 'room.list.component.html'
})

export class RoomListComponent implements OnInit, OnDestroy {

  private logged: Account;
  private accountRef: FireLoopRef<Account>;
  private roomRef: FireLoopRef<Room>;
  private room: Room = new Room();
  private rooms: Room[];
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private accountApi: AccountApi,
    private roomApi: RoomApi,
    private router: Router,
    private logger: LoggerService,
    private realTime: RealTime,
    private models: SDKModels
  ) {
    this.logger.info('Room Module Loaded');
    this.logged     = this.accountApi.getCachedCurrent();
    this.accountRef = this.realTime.FireLoop.ref<Account>(Account);
    this.roomRef    = this.realTime.FireLoop.ref<Room>(Room);
    accountApi.getCurrent().subscribe((res: Account) => console.log(res));
  }

  ngOnInit() {
    console.log('here');
    this.subscriptions.push(this.roomRef.on('change').subscribe((rooms: Room[]) => this.rooms = rooms));
    this.subscriptions.push(this.roomRef.on('child_added').subscribe((child: Room) => {
      console.log('CHILD ADDED: ', child);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  logout(): void {
    this.accountApi.logout().subscribe(res => this.router.navigate(['/access']));
  }

  update(): void {
    this.accountRef.upsert(this.logged).subscribe(res => console.log(res));
  }

  create(): void {
    this.roomRef.create(this.room).subscribe((room: Room) => {
      this.room = new Room();
    });
  }

  join(_room): void {
    this.router.navigate(['/room', _room.id]);
  }
}
