import { Model } from '@mean-expert/model';
/**
 * @module Room
 * @description
 * Write a useful Room Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {},
  remotes: {

    greetRoute: {
      accepts: [
        { arg: 'a', type: 'string', http: { source: 'path' }},
        { arg: 'b', type: 'string', http: { source: 'path' }},
        { arg: 'c', type: 'string', http: { source: 'path' }}
      ],
      returns: { arg: 'greeting', type: 'string' },
      http: { path: '/what/:a/:b/:c', verb: 'get' }
    },

    greetGet: {
      accepts: [
        { arg: 'a', type: 'string' },
        { arg: 'b', type: 'string' },
        { arg: 'c', type: 'string' }
      ],
      returns: { arg: 'greeting', type: 'string' },
      http: { path: '/slimshady', verb: 'get' }
    },

    greetPost: {
      accepts: [
        { arg: 'a', type: 'object', http: { source: 'body' }},
        { arg: 'b', type: 'object', http: { source: 'body' }},
        { arg: 'c', type: 'object', http: { source: 'body' }}
      ],
      returns: { arg: 'greeting', type: 'object' },
      http: { path: '/who', verb: 'post' }
    },

    findByRoom: {
      accepts: [
        { arg: 'room', type: 'object', http: { source: 'body' }}
      ],
      returns: { arg: 'room', type: 'object', root: true },
      http: { path: '/findByRoom', verb: 'post' }
    },

    findByRoomContext: {
      accepts: [
        { arg: 'room', type: 'object'},
        { arg: 'remoteCtx', description: '**Do not implement in clients**.', type: 'object', injectCtx: true, http: { source: 'context' }}
      ],
      returns: { arg: 'room', type: 'object', root: true },
      http: { path: '/findByRoomContext', verb: 'post' }
    },

    singleParamPost: {
      accepts: {
        arg: 'param',
        type: 'object',
        http: { source: 'body' }
      },
      returns: { arg: 'param', type: 'object', root: true },
      http: { path: '/single-param-post', verb: 'post' }
    },

    getPropertyValues: {
      accepts: [
        {
          arg: 'property',
          type: 'string',
          required: true,
          description: 'Property name to lookup values for.'
        },
        {
          arg: 'filter',
          type: 'object',
          description: 'Filter defining fields, where, include, order, offset, and limit'
        }
      ],
      returns: { type: [ 'String' ], root: true },
      description: 'Gets list of all unique values used for a given property.',
      http: { path: '/propertyValues', verb: 'get' }
    }
  }
})

class Room {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  getPropertyValues(property: any, filter: any, next: Function) {
    let obj: any = {};
    obj[property] = filter;
    next(null, obj);
  };

  findByRoom(room: any, next: Function) {
    next(null, room);
  };

  greetRoute(b1: any, b2: any, b3: any, next: Function) {
    this.greet(b1, b2, b3, next);
  }

  greetGet(b1: any, b2: any, b3: any, next: Function) {
    this.greet(b1, b2, b3, next);
  }

  greetPost(b1: any, b2: any, b3: any, next: Function) {
    next(null, `${b1.a}:${b2.b}:${b3.c}`);
  }

  singleParamPost(body: any, next: Function) {
    next(null, body);
  }

  findByRoomContext(room: any, context: any, next: Function) {
    var host = (typeof(context.req) !== 'undefined' && typeof(context.req.hostname) !== 'undefined' ? context.req.hostname : false);

    if(host) {
      room.name += host;
    } else {
      room = {id: -1, name: ""};
    }
    next(null, room);
  }

  greet(a: any, b: any, c: any, next: Function) { next(null, `${a}:${b}:${c}`); }
}

module.exports = Room;
