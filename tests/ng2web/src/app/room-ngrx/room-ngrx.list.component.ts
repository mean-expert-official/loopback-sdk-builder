import 'rxjs/add/operator/auditTime';
import { Component, OnInit } from '@angular/core';
import { Room, RoomInterface, Account, FireLoopRef } from '../shared/sdk/models';
// import { AccountApi, RoomApi, LoggerService, RealTime } from '../shared/sdk/services';
import { AccountApi, RoomApi, LoggerService, RealTime, SDKModels } from '../shared/sdk/services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoopBackConfig } from '../shared/sdk/lb.config';
LoopBackConfig.setBaseURL('http://localhost:3000');

import * as io from 'socket.io-client';

import { Orm } from '../shared/sdk/orm';

const i = 0;

@Component({
  selector: 'app-room',
  templateUrl: './room-ngrx.list.component.html'
})

export class RoomNgrxListComponent implements OnInit {

  private logged: Account;
  private accountRef: FireLoopRef<Account>;
  private roomRef: FireLoopRef<Room>;
  private room: Room = new Room();
  private rooms$: Observable<RoomInterface[]>;
  private rooms: Room[];

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
    this.rooms$ = this.orm.Room.find({
        where: {
          // name: '1506504652342'
          // name: {like: 'Test'}
        },
        order: 'id DESC',
        limit: 100,
        // include: 'messages'
        include: [
          {
            relation: 'categories'
          },
          {
            relation: 'accounts'
          },
          {
            relation: 'messages'
          },
          {
            relation: 'likes'
          }
        ]
    }, {io: true})
      .auditTime(20)
      .do((a) => console.log(a));

      // setTimeout(() => {
      //   // this.orm.Room.updateAll({
      //   //   name: 'test3'
      //   // },
      //   // {
      //   //   name: 'test1'
      //   // }, {resetStore: true})

      //   // this.orm.Room.create({
      //   //   name: 'test3'
      //   // }, {resetStore: true})

      //   // this.orm.Room.resetState()
      // }, 4000);

    // this.orm.Category.find({}).subscribe((a) => console.log(a));
  }

  logout(): void {
    this.orm.Account.logout();
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
