/* tslint:disable:no-unused-variable */
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/take';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './shared/app.effects';
import { SDKBrowserModule, LoopbackEffects, LoopbackStateInterface, RoomApi, CategoryApi, getRoomCategorysState } from './shared/sdk/index';
import { Room, Message, Category } from './shared/sdk/models';
import { IAppState, reducerToken, reducerProvider, effects, getApplicationState } from './shared/app.state';
import { OrmModule, Orm } from './shared/sdk/orm';

import * as fromApp from './shared/app.reducer';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

class RouterStub {
    navigate(url: String) { return url; }
}

describe('ORM: Room', () => {
  let store: Store<IAppState>;
  let orm: Orm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        StoreModule.forRoot(reducerToken, {}),
        EffectsModule.forRoot(effects),
        OrmModule.forRoot()
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        reducerProvider
      ]
    });

    store = TestBed.get(Store);
    orm = TestBed.get(Orm);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create a new room instance', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    orm.Room.create(room);
    orm.Room.find({ where: {name: room.name}})
      .auditTime(2000)
      .subscribe((rooms: Room[]) => {
        expect(rooms).toContain(jasmine.objectContaining({name: room.name}));
      });
  });

  it('should find room instance by id', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    orm.Room.create(room);
    orm.Room.findOne({ where: {name: room.name}})
      .auditTime(2000)
      .subscribe((createdRoom: Room) => {
        orm.Room.findById(createdRoom.id)
          .auditTime(2000)
          .subscribe((foundRoom: Room) => {
            expect(foundRoom.name).toBe(room.name);
          });
      });
  });

  it('should update room attributes', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    orm.Room.create(room);
    orm.Room.findOne({ where: {name: room.name}})
      .auditTime(2000)
      .subscribe((createdRoom: Room) => {
        orm.Room.updateAttributes(createdRoom.id, Object.assign({}, createdRoom, { name: 'updated!!!'}));

        orm.Room.findById(createdRoom.id)
          .auditTime(2000)
          .subscribe((updatedRoom: Room) => {
            expect(updatedRoom.id).toBe(createdRoom.id);
            expect(updatedRoom.name).toBe('updated!!!');
          });
      });
  });

  it('should patch room attributes', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    orm.Room.create(room);
    orm.Room.findOne({ where: {name: room.name}})
      .auditTime(2000)
      .subscribe((createdRoom: Room) => {
        orm.Room.patchAttributes(createdRoom.id, Object.assign({}, createdRoom, { name: 'patched!!!'}));

        orm.Room.findById(createdRoom.id)
          .auditTime(2000)
          .subscribe((updatedRoom: Room) => {
            expect(updatedRoom.id).toBe(createdRoom.id);
            expect(updatedRoom.name).toBe('patched!!!');
          });
      });
  });

  it('should create a room message', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    orm.Room.create(room);
    orm.Room.findOne({ where: {name: room.name}})
      .auditTime(2000)
      .subscribe((createdRoom: Room) => {

        orm.Room.createMessages(createdRoom.id, { text: 'HelloRoom'});

        orm.Room.findById(createdRoom.id, { include: 'messages' })
          .auditTime(2000)
          .subscribe((roomWithMessages: Room) => {
            expect(roomWithMessages.messages).toContain(jasmine.objectContaining({roomId: createdRoom.id, text: 'HelloRoom'}));
          });
      });
  });

  // TODO: Fix
  xit('should reset room state', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    orm.Room.create(room);
    orm.Room.find({ where: {name: room.name}})
      .auditTime(2000)
      .take(1)
      .subscribe((rooms: Room[]) => {
        expect(rooms).toContain(jasmine.objectContaining({name: room.name}));
        orm.Room.resetState();
        orm.Room.find({}, {justCache: true})
          .auditTime(1000)
          .subscribe((roomsFromCache: Room[]) => {
            expect(roomsFromCache.length).toBe(0);
          });
      });
  });
  // TODO: Fix
  xit('should find and sync', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    orm.Room.find({ limit: 5}, {io: true})
      .auditTime(3000)
      .subscribe((rooms: Room[]) => {
        expect(rooms).toContain(jasmine.objectContaining({name: room.name}));
      });

    setTimeout(() => {
      orm.Room.create(room);
    }, 1000);
  });
  // TODO: Fix
  xit('should find and sync includes', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    orm.Room.find({
      include: ['messages'],
      limit: 5
    }, {io: true})
      .auditTime(3000)
      .subscribe((rooms: Room[]) => {
        const roomWithMessages = rooms.filter((r) => r.name === room.name)[0];
        expect(rooms).toContain(jasmine.objectContaining({name: room.name}));
        expect(roomWithMessages.messages).toContain(jasmine.objectContaining({roomId: roomWithMessages.id, text: 'HelloRoom'}));
      });

    orm.Room.create(room);
    orm.Room.findOne({ where: {name: room.name}})
      .auditTime(1000)
      .subscribe((createdRoom: Room) => {
        orm.Room.createMessages(createdRoom.id, { text: 'HelloRoom'});
      });
  });

  it('should include linked categories (hasAndBelongsToMany)',
    async(inject([CategoryApi, RoomApi], (categoryApi: CategoryApi, roomApi: RoomApi) => {
      const category: Category = new Category();
      const room: Room = new Room();
      room.name = Date.now().toString();
      category.name = Date.now().toString();

      return roomApi.create(room)
        .take(1)
        .subscribe((roomInstance: Room) => categoryApi.create(category)
        .take(1)
        .subscribe((categoryInstance: Category) => categoryApi.linkRooms(categoryInstance.id, roomInstance.id)
        .take(1)
        .subscribe((result: any) => {
          orm.Room.findOne({
            where: {name: room.name},
            include: ['categories']
          })
            .auditTime(3000)
            .subscribe((roomWithCategories: Room) => {
              expect(roomWithCategories.name).toBe(room.name);
              console.log(roomWithCategories);
              expect(roomWithCategories.categories).toContain(jasmine.objectContaining({name: category.name}));
            });
        })))
    })
  ));
});
