import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room, Account, FireLoopRef } from '../shared/sdk/models';
// import { AccountApi, RoomApi, LoggerService, RealTime } from '../shared/sdk/services';
import { AccountApi, RoomApi, LoggerService, RealTime, SDKModels } from '../shared/sdk/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LoopBackConfig } from '../shared/sdk/lb.config';
LoopBackConfig.setBaseURL('http://127.0.0.1:3002');

import * as io from 'socket.io-client';

import { Orm } from '../shared/sdk/orm';

const i = 0;

@Component({
  selector: 'app-room',
  templateUrl: './room-ngrx.list.component.html'
})

export class RoomNgrxListComponent implements OnInit, OnDestroy {

  private logged: Account;
  private accountRef: FireLoopRef<Account>;
  private roomRef: FireLoopRef<Room>;
  private room: Room = new Room();
  private rooms: Room[];
  private connected = false;
  private subscriptions: Subscription[] = new Array<Subscription>();
  // private socket: any = io.connect(LoopBackConfig.getPath(), { secure: false });

  constructor(
    private accountApi: AccountApi,
    private roomApi: RoomApi,
    private router: Router,
    private logger: LoggerService,
    private realTime: RealTime,
    private models: SDKModels,
    private orm: Orm
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

    console.log(this.orm);
    /*this.subscriptions.push(
      this.orm.Room.find({
        order: 'id DESC',
        limit: 10
      }).subscribe((data) => console.log(data))
    );*/

    this.subscriptions.push(
      this.orm.Room.find({
        where: {
          // name: 'Testando'
          name: {like: 'Test'}
        },
        order: 'id DESC',
        limit: 10,
        // include: 'messages'
        include: [
          {
            relation: 'messages'
          },
          {
            relation: 'likes',
            scope: {
              limit: 1
            }
          }
        ]
      }, {io: true}).subscribe((data) => console.log(data))
    );

  }

  logout(): void {
    this.orm.Account.logout();
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
    this.orm.Room.create(this.room);
  }

  join(_room): void {
    this.router.navigate(['/room', _room.id]);
  }
}
