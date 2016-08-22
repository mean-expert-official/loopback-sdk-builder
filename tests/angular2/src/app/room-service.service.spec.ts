import { addProviders, async, inject } from '@angular/core/testing';
import {
  Room,
  LoopBackConfig,
  API_PROVIDERS
} from './shared/sdk';

import { RoomApi } from './shared/sdk/services';

LoopBackConfig.setBaseURL('http://127.0.0.1:3000');
LoopBackConfig.setApiVersion('api');

describe('RoomService Tests', () => {
  beforeEach(() => {
    addProviders([ API_PROVIDERS ]);
  });

  it('should contain persisted model methods',
    async(inject([RoomApi], (service: RoomApi) => {
      expect(service).toBeTruthy();
      expect(service.create).toBeTruthy();
      expect(service.updateAll).toBeTruthy();
      expect(service.updateAttributes).toBeTruthy();
      expect(service.find).toBeTruthy();
      expect(service.findById).toBeTruthy();
      expect(service.findOne).toBeTruthy();
    })
  ));

  it('should create a new room instance',
    async(inject([RoomApi], (roomApi: RoomApi) => {

      let room: Room = new Room();
      room.name = Date.now().toString();

      return roomApi.create(room)
        .subscribe((instance: Room) => expect(instance.id).toBeTruthy());
    })
  ));

  it('should find room instance by id',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let room: Room = new Room();
      room.name = Date.now().toString();
      return roomApi.create(room)
        .subscribe((createdRoom: Room) => {
          expect(createdRoom.id).toBeTruthy();
          roomApi.findById(createdRoom.id)
            .subscribe((foundRoom: Room) => expect(foundRoom.id).toBe(createdRoom.id));
        });
    })
  ));

  it('should create a room message',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let room: Room = new Room();
      room.name = Date.now().toString();
      return roomApi.create(room).subscribe((instance: Room) =>
        roomApi.createMessages(instance.id, {
            text: 'HelloRoom'
        }).subscribe(message => {
            expect(message.id).toBeTruthy();
            expect(message.roomId).toBe(instance.id);
          })
        );
    })
  ));

  it('should create and find a room message using loopback query filter (Interface Test)',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let room: Room = new Room();
      room.name = Date.now().toString();
      let message = { text: 'Hello Room with Query' };
      return roomApi.create(room)
        .subscribe((instance: Room) => roomApi.createMessages(instance.id, message)
        .subscribe(messageInstance => roomApi.getMessages(instance.id, { where: message })
        .subscribe(messages => {
            expect(messages.length).toBe(1);
            let msg = messages.pop();
            expect(msg.text).toBe(messageInstance.text);
        })));
    })
  ));

  it('should fetch greetings from route params',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let params = ['Hi', 'My Name Is', 'What'];
      return roomApi.greetRoute(params[0], params[1], params[2])
        .subscribe((result: {greeting: string}) => {
            expect(result.greeting).toBe(params.join(':'));
        });
    })
  ));

  it('should fetch greetings from get method',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let params = ['Hi', 'My Name Is', 'Who'];
      return roomApi.greetGet(params[0], params[1], params[2])
        .subscribe((result: {greeting: string}) => {
            expect(result.greeting).toBe(params.join(':'));
        });
    })
  ));

  it('should fetch greetings from post method',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let params = ['Hi', 'My Name Is', 'Slim Shady!!'];
      return roomApi.greetPost(params[0], params[1], params[2])
        .subscribe((result: {greeting: string}) => {
            expect(result.greeting).toBe(params.join(':'));
        });
    })
  ));
});
