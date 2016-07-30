module.exports = function (Room) {

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
      http: { path: '/sayhi', verb: 'post' }
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
      http: { path: '/sayhi', verb: 'get' }
    }
  );
};

function greet(a, b, c, next) { next(null, `${a}:${b}:${c}`); }