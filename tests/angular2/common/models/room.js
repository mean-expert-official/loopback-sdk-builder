module.exports = function (Room) {

  Room.greetRoute = greet;

  Room.remoteMethod(
    'greetRoute',
    {
      accepts: [
        { arg: 'a', type: 'string', http: { source: 'path' }},
        { arg: 'b', type: 'string', http: { source: 'path' }},
        { arg: 'c', type: 'string', http: { source: 'path' }}
      ],
      returns: { arg: 'greeting', type: 'string' },
      http: { path: '/what/:a/:b/:c', verb: 'get' }
    }
  );

  Room.findByRoom = (room, next) => {
    next(null, room);
  };
  
  Room.remoteMethod(
    'findByRoom',
    {
      accepts: [
        { arg: 'room', type: 'object', http: { source: 'body' }}
      ],
      returns: { arg: 'room', type: 'object', root: true },
      http: { path: '/findByRoom', verb: 'post' }
    }
  );

  // We receive 3 copies of the body from loopback, not sure why
  // I would expect body.a, body.b and body.c in 1 object param.
  Room.greetPost = (b1, b2, b3, next) => {
    next(null, `${b1.a}:${b2.b}:${b3.c}`);
  };
  
  Room.remoteMethod(
    'greetPost',
    {
      accepts: [
        { arg: 'a', type: 'object', http: { source: 'body' }},
        { arg: 'b', type: 'object', http: { source: 'body' }},
        { arg: 'c', type: 'object', http: { source: 'body' }}
      ],
      returns: { arg: 'greeting', type: 'object' },
      http: { path: '/who', verb: 'post' }
    }
  );

  Room.singleParamPost = function (body, next) {
    next(null, body);
  };

  Room.remoteMethod(
    'singleParamPost',
    {
      accepts: {
        arg: 'param',
        type: 'object',
        http: { source: 'body' }
      },
      returns: { arg: 'param', type: 'object', root: true },
      http: { path: '/single-param-post', verb: 'post' }
    }
  );

  Room.greetGet = greet;

  Room.remoteMethod(
    'greetGet',
    {
      accepts: [
        { arg: 'a', type: 'string' },
        { arg: 'b', type: 'string' },
        { arg: 'c', type: 'string' }
      ],
      returns: { arg: 'greeting', type: 'string' },
      http: { path: '/slimshady', verb: 'get' }
    }
  );
};

function greet(a, b, c, next) { next(null, `${a}:${b}:${c}`); }