import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject,
  async
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
        .subscribe((room: Room) => expect(room.id).toBeTruthy());
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
            .subscribe((foundRoom: Room) => expect(foundRoom.id).toBe(createdRoom.id))
        });
    })
  ));

  it('should create a room message',
    async(inject([RoomApi], (roomApi: RoomApi) => {
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
  ));

  it('should create and find a room message using loopback query filter (Interface Test)',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let room: Room = new Room();
      room.name = Date.now().toString();
      let message: MessageInterface = new Message();
      message.text = 'Hello Room with Query';
      return roomApi.create(room)
        .subscribe((room: Room) => roomApi.createMessages(room.id, message)
        .subscribe((message: MessageInterface) => roomApi.getMessages(room.id, { where: { text: message.text }})
        .subscribe((messages: Array<Message>) => {
            expect(messages.length).toBe(1);
            let msg = messages.pop();
            expect(msg.text).toBe(message.text);
        })));
    })
  ));

  it('should fetch greetings from get method',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let params = ['Hi', 'My Name Is', 'What?'];
      return roomApi.greetGet(params[0], params[1], params[2])
        .subscribe((result: {greeting: string}) => {
            expect(result.greeting).toBe(params.join(':'))
        });
    })
  ));

  it('should fetch greetings from post method',
    async(inject([RoomApi], (roomApi: RoomApi) => {
      let params = ['Hi', 'My Name Is', 'What?'];
      return roomApi.greetPost(params[0], params[1], params[2])
        .subscribe((result: {greeting: string}) => {
            expect(result.greeting).toBe(params.join(':'))
        });
    })
  ));

});
