import { Room, Category, Message, FireLoopRef } from './../app/shared/sdk/models';
import { RoomApi, CategoryApi, MessageApi, RealTime } from './../app/shared/sdk/services';
let roomApi;
describe('Service Service', () => {
  beforeEach(() => {
    roomApi = new RoomApi();
  });

  it('should contain persisted model methods', () => {
    expect(roomApi).toBeTruthy();
    expect(roomApi.create).toBeTruthy();
    expect(roomApi.exists).toBeTruthy();
    expect(roomApi.updateAll).toBeTruthy();
    expect(roomApi.updateAttributes).toBeTruthy();
    expect(roomApi.find).toBeTruthy();
    expect(roomApi.findById).toBeTruthy();
    expect(roomApi.findOne).toBeTruthy();
    })
  });

  it('should create a new room instance', async() => {
    let room = new Room();
    room.name = Date.now().toString();
    await roomApi.create(room)
      .subscribe((instance) => expect(instance.id).toBeTruthy());
  });

  it('should find room instance by id', async() => {
    let room = new Room();
    room.name = Date.now().toString();
    await roomApi.create(room)
      .subscribe((createdRoom) => {
        expect(createdRoom.id).toBeTruthy();
        console.log('CREATED:', createdRoom);
        roomApi.findById(createdRoom.id)
          .subscribe((foundRoom) => {
            console.log('FOUND:', foundRoom);
            expect(foundRoom.id).toBe(createdRoom.id);
          });
  });

  it('should update room attributes', async () => {
    let room = new Room();
    room.name = Date.now().toString();
    await roomApi.create(room)
      .subscribe((createdRoom) => {
        expect(createdRoom.id).toBeTruthy();
        roomApi.updateAttributes(createdRoom.id, { name: 'updated!!!'})
          .subscribe((updatedRoom) => {
            expect(updatedRoom.id).toBe(createdRoom.id);
            expect(updatedRoom.name).toBe('updated!!!');
        });
    });
  });

  it('should patch room attributes', async () => {
    let room = new Room();
    room.name = Date.now().toString();
    await roomApi.create(room)
      .subscribe((createdRoom) => {
        expect(createdRoom.id).toBeTruthy();
        roomApi.updateAttributes(createdRoom.id, { name: 'patched!!!'})
          .subscribe((patchedRoom) => {
            expect(patchedRoom.id).toBe(createdRoom.id);
            expect(patchedRoom.name).toBe('patched!!!');
          });
      });
  });

  it('should create a room message', async() => {
    let room = new Room();
    room.name = Date.now().toString();
    await roomApi.create(room).subscribe((instance) =>
      roomApi.createMessages(instance.id, {
        text: 'HelloRoom'
      }).subscribe(message => {
        expect(message.id).toBeTruthy();
        expect(message.roomId).toBe(instance.id);
      })
    );
  });

  it('should create and find a room message using loopback query filter (Interface Test)', async () => {
    let room = new Room();
    room.name = Date.now().toString();
    let message = { text: 'Hello Room with Query' };
    await roomApi.create(room)
      .subscribe((instance) => roomApi.createMessages(instance.id, message)
      .subscribe(messageInstance => roomApi.getMessages(instance.id, { where })
      .subscribe(messages => {
        expect(messages.length).toBe(1);
        let msg = messages.pop();
        expect(msg.text).toBe(messageInstance.text);
      })));
  });

  it('should property and filter params', async() => {
    let filter = { where: 'Yo' };
    await roomApi.getPropertyValues('newfilter', filter)
      .subscribe((result) => {
        expect(filter.where).toBe(result.newfilter.where);
      });
  });

  it('should fetch greetings from route params', async() => {
    let params = ['Hi', 'My Name Is', 'What'];
    await roomApi.greetRoute(params[0], params[1], params[2])
      .subscribe((result) => {
        expect(result.greeting).toBe(params.join(':'));
      });
  });

  it('should fetch greetings from get method', async() => {
    let params = ['Hi', 'My Name Is', 'Who'];
    await roomApi.greetGet(params[0], params[1], params[2])
      .subscribe((result) => {
        expect(result.greeting).toBe(params.join(':'));
      });
  });

  it('should fetch greetings from post method', async() => {
    let params = ['Hi', 'My Name Is', 'Slim Shady!!'];
    await roomApi.greetPost(params[0], params[1], params[2])
      .subscribe((result) => {
        expect(result.greeting).toBe(params.join(':'));
      });
  });

  it('should find by mock room to test custom remote method', async() => {
      let room = new Room({ id: 42, name: 'my awesome room' });
      await roomApi.findByRoom(room)
        .subscribe((instance) => {
          expect(room.id).toBe(instance.id);
        });
    });

  it('should fetch filter as object from single-param post method', async() => {
    let param = { child: 'filtered' };
    await roomApi.singleParamPost(param).subscribe((result) => {
      expect(result.param).toBe(undefined);
      expect(result.child).toBe(param.child);
    });
  });

  it('should create and link rooms with categories', async() => {
    let category = new Category();
    let room = new Room();
    room.name = Date.now().toString();
    category.name = Date.now().toString();

    await roomApi.create(room)
      .subscribe((roomInstance) => categoryApi.create(category)
      .subscribe((categoryInstance) => categoryApi.linkRooms(categoryInstance.id, roomInstance.id)
      .subscribe((result) => {
        expect(result.id).toBeTruthy();
      })));
  });

  it('should include multiple layers', async() => {
    let room = new Room({ name: Date.now().toString() });
    let message = new Message({ text: 'Hello Room' });
    let reply = new Message({ text: 'Hello Reply' });
    await roomApi.create(room)
      .subscribe((instance) => roomApi.createMessages(instance.id, message)
      .subscribe((messageInstance) => messageApi.createReplies(messageInstance.id, reply)
      .subscribe((replyInstance) => messageApi.createLikes(replyInstance.id, { set: true })
      .subscribe((likeInstance) => roomApi.find({
        where: { id: instance.id },
        include: {
          relation: 'messages',
          scope: {
            include: {
              relation: 'replies',
              scope: {
                include: {
                  relation: 'likes'
                }
              }
            }
          }
        }
      }).subscribe((result) => {
        expect(result.length).toBe(1);
        expect(result[0].messages.length).toBe(1);
        expect(result[0].messages[0].replies.length).toBe(1);
        expect(result[0].messages[0].replies[0].likes.length).toBe(1);
      })))));
  });

  /**
   * This test is to validate that contexts support is working
   * i modify the name of the room appending the host to the name if it works
   * if it doesn't work i set room.id = -1 and the name to blank
   */
   
  it('should find by mock room to test custom remote method with context enabled', async() => {
    let room = new Room({ id: 42, name: 'my awesome room' });
    return roomApi.findByRoomContext(room).subscribe( (instance) => {
        expect(room.id).toBe(Number.parseInt(instance.id));
        // I append the host onto the instance name so it shouldn't match now
        expect(room.name).not.toBe(instance.name);
      });
  });

  it('should return correct response if the room does not exist', async() => {
    await roomApi.exists(42)
      .subscribe((result) => {
        expect(result.exists).toBe(false);
      });
  });

  it('should return correct response if the room does not exist', async() => {
    let room = new Room();
    room.name = Date.now().toString();
    return roomApi
      .create(room)
      .switchMap((instance) => roomApi.exists(instance.id))
      .subscribe((result) => {
        expect(result.exists).toBe(true);
      });
  });
});
