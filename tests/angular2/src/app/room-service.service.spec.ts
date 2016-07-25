import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';

import {
  Room,
  RoomApi,
  Message,
  MessageInterface,
  API_PROVIDERS,
  LoopBackConfig
} from './shared';

LoopBackConfig.setBaseURL('http://127.0.0.1:3000');
LoopBackConfig.setApiVersion('api');

describe('UserService Service', () => {
  beforeEachProviders(() => [API_PROVIDERS]);

  it('should contain persisted model methods',
    inject([RoomApi], (service: RoomApi) => {
      expect(service).toBeTruthy();
      expect(service.create).toBeTruthy();
      expect(service.updateAll).toBeTruthy();
      expect(service.updateAttributes).toBeTruthy();
      expect(service.find).toBeTruthy();
      expect(service.findById).toBeTruthy();
      expect(service.findOne).toBeTruthy();
    })
  );

  it('should create a new room instance',
    inject([RoomApi], (roomApi: RoomApi) => {

      let room: Room = new Room();
      room.name = Date.now().toString();

      return roomApi.create(room)
        .subscribe((room: Room) => expect(room.id).toBeTruthy());
    })
  );

  it('should find room instance by id',
    inject([RoomApi], (roomApi: RoomApi) => {
      let room: Room = new Room();
      room.name = Date.now().toString();
      return roomApi.create(room)
        .subscribe((createdRoom: Room) => {
          expect(createdRoom.id).toBeTruthy();
          roomApi.findById(createdRoom.id)
            .subscribe((foundRoom: Room) => expect(foundRoom.id).toBe(createdRoom.id))
        });
    })
  );

  it('should create a room message',
    inject([RoomApi], (roomApi: RoomApi) => {
      let room: Room = new Room();
      room.name = Date.now().toString();
      let message: MessageInterface = new Message();
      message.text = 'Hello Room';
      return roomApi.create(room)
        .subscribe((room: Room) => roomApi.createMessages(room.id, message)
          .subscribe((message: MessageInterface) => {
            expect(message.id).toBeTruthy();
            expect(message.roomId).toBe(room.id)
          }));
    })
  );

});
