/* tslint:disable:no-unused-variable */
import 'rxjs/add/operator/auditTime';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './shared/app.effects';
import { SDKBrowserModule, LoopbackStateInterface } from './shared/sdk/index';
import { Room, Message, AccessToken } from './shared/sdk/models';
import { getLoopbackAuthState, SDKToken, RoomActions, getRooms, getMessages, getRoomById } from './shared/sdk';
import { IAppState, reducerToken, reducerProvider, effects, getApplicationState } from './shared/app.state';

class RouterStub {
    navigate(url: String) { return url; }
}

describe('Ngrx: Room', () => {
  let store: Store<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        StoreModule.forRoot(reducerToken, {}),
        EffectsModule.forRoot(effects)
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        reducerProvider
      ]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create a new room instance', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    store.dispatch(new RoomActions.create(room));
    store.select(getRooms)
      .auditTime(2000)
      .subscribe((rooms: Room[]) => {
        expect(rooms).toContain(jasmine.objectContaining({name: room.name}));
      });
  });

  it('should find room instance by id', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    store.dispatch(new RoomActions.create(room));
    store.select(getRooms)
      .auditTime(2000)
      .subscribe((rooms: Room[]) => {
        store.select(getRoomById(rooms.filter((r) => r.name === room.name)[0].id))
          .subscribe((foundRoom: Room) => {
            expect(foundRoom.name).toBe(room.name);
          });
      });
  });

  it('should update room attributes', () => {
    const room: Room = new Room();
    room.name = Date.now().toString();

    store.dispatch(new RoomActions.create(room));
    store.select(getRooms)
      .auditTime(2000)
      .subscribe((rooms: Room[]) => {
        const createdRoom = rooms.filter((r) => r.name === room.name)[0];

        store.dispatch(new RoomActions.updateAttributes(createdRoom.id, { name: 'updated!!!'}));

        store.select(getRoomById(createdRoom.id))
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

    store.dispatch(new RoomActions.create(room));
    store.select(getRooms)
      .auditTime(2000)
      .subscribe((rooms: Room[]) => {
        const createdRoom = rooms.filter((r) => r.name === room.name)[0];

        store.dispatch(new RoomActions.patchAttributes(createdRoom.id, { name: 'patched!!!'}));

        store.select(getRoomById(createdRoom.id))
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

    store.dispatch(new RoomActions.create(room));
    store.select(getRooms)
      .auditTime(2000)
      .subscribe((rooms: Room[]) => {
        const createdRoom = rooms.filter((r) => r.name === room.name)[0];

        store.dispatch(new RoomActions.createMessages(createdRoom.id, { text: 'HelloRoom'}));

        store.select(getMessages)
          .auditTime(2000)
          .subscribe((messages: Message[]) => {
            expect(messages).toContain(jasmine.objectContaining({roomId: createdRoom.id, text: 'HelloRoom'}));
          });
      });
  });
});
