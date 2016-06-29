import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject,
  injectAsync
} from '@angular/core/testing';

import { 
  Room,
  RoomApi,
  RoomInterface,
  Message,
  MessageInterface,
  API_PROVIDERS,
  LoopBackConfig,
  TokenInterface
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

  let room: RoomInterface = new Room();
      room.name           = Date.now().toString();

  it('should create a new room instance',
    injectAsync([RoomApi], (roomApi: RoomApi) => {
      return roomApi.create(room)
                    .subscribe((room: RoomInterface) => expect(room.id).toBeTruthy());
    })
  );

  it('should find room instance',
    injectAsync([RoomApi], (roomApi: RoomApi) => {
      return roomApi.findOne({ where: room })
                    .subscribe((room: RoomInterface) => expect(room.id).toBeTruthy());
    })
  );

});
