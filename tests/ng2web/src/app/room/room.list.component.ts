import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room, Account, FireLoopRef } from '../shared/sdk/models';
// import { AccountApi, RoomApi, LoggerService, RealTime } from '../shared/sdk/services';
import { AccountApi, RoomApi, LoggerService, RealTime, SDKModels } from '../shared/sdk/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoopBackConfig } from '../shared/sdk/lb.config';
LoopBackConfig.setBaseURL('http://localhost:3000');

import * as io from 'socket.io-client';

var i = 0;

@Component({
  selector: 'app-room',
  templateUrl: './room.list.component.html'
})

export class RoomListComponent implements OnInit, OnDestroy {

  private logged: Account;
  private accountRef: FireLoopRef<Account>;
  private roomRef: FireLoopRef<Room>;
  public room: Room = new Room();
  public rooms: Room[];
  public connected: boolean = false;
  private subscriptions: Subscription[] = new Array<Subscription>();
  //private socket: any = io.connect(LoopBackConfig.getPath(), { secure: false });

  constructor(
    private accountApi: AccountApi,
    private roomApi: RoomApi,
    private router: Router,
    private logger: LoggerService,
    private realTime: RealTime,
    private models: SDKModels
  ) {
    this.logger.info('Room Module Loaded');
    this.logged = this.accountApi.getCachedCurrent();
  }

  ngOnInit() {
    this.subscriptions.push(this.realTime.onReady().subscribe((status: string) => {
      console.log('CONNECT STATUS: ', status);
      this.connected = true;
      this.accountRef = this.realTime.FireLoop.ref<Account>(Account);
      this.roomRef = this.realTime.FireLoop.ref<Room>(Room);
      this.subscriptions.push(
        this.roomRef.on('change').subscribe((rooms: Room[]) => this.rooms = rooms)
      );
      this.subscriptions.push(
        this.roomRef.on('child_added').subscribe((child: Room) => {})
      );
    }));
  }

  logout(): void {
    this.accountApi.logout().subscribe(() => {
      this.realTime.connection.disconnect();
      this.router.navigate(['/access']);
    });
  }

  ngOnDestroy() {
    this.roomRef.dispose();
    this.accountRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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
