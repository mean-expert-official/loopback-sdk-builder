module.exports = function (Room) {

  Room.greetPost = function greet(a, b, c, next) {
    next(null, `${a}:${b}:${c}`);
  };

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

  Room.greetGet = function greet(a, b, c, next) {
    next(null, `${a}:${b}:${c}`);
  };

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
