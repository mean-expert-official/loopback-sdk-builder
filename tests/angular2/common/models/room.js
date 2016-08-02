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

  Room.greetPost = greet;

  Room.remoteMethod(
    'greetPost',
    {
      accepts: [
        { arg: 'a', type: 'string' },
        { arg: 'b', type: 'string' },
        { arg: 'c', type: 'string' }
      ],
      returns: { arg: 'greeting', type: 'string' },
      http: { path: '/who', verb: 'post' }
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