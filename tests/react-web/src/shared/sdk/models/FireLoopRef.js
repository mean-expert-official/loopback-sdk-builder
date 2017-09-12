import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { LoopBackFilter, StatFilter } from './index';
import { SocketConnection } from '../sockets/socket.connections';
/**
 * @class FireLoopRef
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * This class allows to create FireLoop References which will be in sync with
 * Server. It also allows to create FireLoop Reference Childs, that allows to
 * persist data according the generic model relationships.
 **/
export class FireLoopRef {
  // Reference ID
  id = this.buildId();
  // Model Instance (For child references, empty on root references)
  instance;
  // Model Childs
  childs = {};
  // Disposable Events
  disposable = {};
  /**
  * @method constructor
  * @param {any} model The model we want to create a reference
  * @param {SocketConnection} socket Socket connection to handle events
  * @param {FireLoopRef<any>} parent Parent FireLoop model reference
  * @param {string} relationship The defined model relationship
  * @description
  * The constructor will receive the required parameters and then will register this reference
  * into the server, needed to allow multiple references for the same model.
  * This ids are referenced into this specific client connection and won't have issues
  * with other client ids.
  **/
  constructor(
    model,
    socket,
    parent = null,
    relationship = null
  ) {
    this.socket.emit(
      `Subscribe.${!parent ? model.getModelName() : parent.model.getModelName()}`,
      { id: this.id, scope: model.getModelName(), relationship: relationship }
    );
    return this;
  }
  /**
  * @method dispose
  * @return {void}
  * @description
  * This method is super important to avoid memory leaks in the server.
  * This method requires to be called on components destroy
  *
  * ngOnDestroy() {
  *  this.someRef.dispose() 
  * }
  **/
  dispose() {
    const subscription = this.operation('dispose', {}).subscribe(() => {
      Object.keys(this.disposable).forEach((channel) => {
        this.socket.removeListener(channel, this.disposable[channel]);
        this.socket.removeAllListeners(channel);
      });
      subscription.unsubscribe();
    });
  }
  /**
  * @method upsert
  * @param {T} data Persisted model instance
  * @return {Observable}
  * @description
  * Operation wrapper for upsert function.
  **/
  upsert(data) {
    return this.operation('upsert', data);
  }
  /**
  * @method create
  * @param {T} data Persisted model instance
  * @return {Observable}
  * @description
  * Operation wrapper for create function.
  **/
  create(data) {
    return this.operation('create', data);
  }
  /**
  * @method remove
  * @param {T} data Persisted model instance
  * @return {Observable}
  * @description
  * Operation wrapper for remove function.
  **/
  remove(data) {
    return this.operation('remove', data);
  }
  /**
  * @method remote
  * @param {string} method Remote method name
  * @param {any[]=} params Parameters to be applied into the remote method
  * @param {boolean} broadcast Flag to define if the method results should be broadcasted
  * @return {Observable<any>}
  * @description
  * This method calls for any remote method. It is flexible enough to
  * allow you call either built-in or custom remote methods.
  *
  * FireLoop provides this interface to enable calling remote methods
  * but also to optionally send any defined accept params that will be
  * applied within the server.
  **/
  remote(method, params, broadcast) {
    return this.operation('remote', { method, params, broadcast });
  }
  /**
  * @method onRemote
  * @param {string} method Remote method name
  * @return {Observable<any>}
  * @description
  * This method listen fo
  broadcasted remote method results. If the remote method
  * execution is no
  only the owner will receive the result data.
  **/
  onRemote(method) {
    let event = 'remote';
    if (!this.relationship) {
      event = `${this.model.getModelName()}.${event}`;
    } else {
      event = `${this.parent.model.getModelName()}.${this.relationship}.${event}`;
    }
    return this.broadcasts(event, {});
  }
  /**
  * @method on
  * @param {string} event Event name
  * @param {LoopBackFilter} filter LoopBack query filter
  * @return {Observable}
  * @description
  * Listener for different type of events. Valid events are:
  *   - change (Triggers on any model change -create, update, remove-)
  *   - value (Triggers on new entries)
  *   - child_added (Triggers when a child is added)
  *   - child_updated (Triggers when a child is updated)
  *   - child_removed (Triggers when a child is removed)
  **/
  on(event, filter = { limit: 100, order: 'id DESC' }) {
    if (event === 'remote') {
      throw new Error('The "remote" event is not allowed using "on()" method, use "onRemote()" instead');
    }
    let request;
    if (!this.relationship) {
      event = `${this.model.getModelName()}.${event}`;
      request = { filter };
    } else {
      event = `${this.parent.model.getModelName()}.${this.relationship}.${event}`;
      request = { filter, parent: this.parent.instance };
    }
    if (event.match(/(value|change|stats)/)) {
      return Observable.merge(
        this.pull(event, request),
        this.broadcasts(event, request)
      );
    } else {
      return this.broadcasts(event, request);
    }
  }
  /**
  * @method stats
  * @param {LoopBackFilter=} filter LoopBack query filter
  * @return {Observable}
  * @description
  * Listener for real-time statistics, will trigger on every
  * statistic modification.
  * TIP: You can improve performance by adding memcached to LoopBack models.
  **/
  stats(filter) {
    return this.on('stats', filter);
  }
  /**
  * @method make
  * @param {any} instance Persisted model instance reference
  * @return {Observable}
  * @description
  * This method will set a model instance into this a new FireLoop Reference.
  * This allows to persiste parentship when creating related instances.
  *
  * It also allows to have multiple different persisted instance references to same model.
  * otherwise if using singleton will replace a previous instance for a new instance, when
  * we actually want to have more than 1 instance of same model.
  **/
  make(instance) {
    let reference = new FireLoopRef(this.model, this.socket);
    reference.instance = instance;
    return reference;
  }
  /**
  * @method child
  * @param {string} relationship A defined model relationship
  * @return {FireLoopRef}
  * @description
  * This method creates child references, which will persist related model
  * instances. e.g. Room.messages, where messages belongs to a specific Room.
  **/
  child(relationship) {
    // Return singleton instance
    if (this.childs[relationship]) { return this.childs[relationship]; }
    // Try to get relation settings from current model
    let settings = this.model.getModelDefinition().relations[relationship];
    // Verify the relationship actually exists
    if (!settings) {
      throw new Error(`Invalid model relationship ${this.model.getModelName()} <-> ${relationship}, verify your model settings.`);
    }
    // Verify if the relationship model i
        if (settings.model === '') {
      throw new Error(`Relationship model is   cam't use ${relationship} unless you set your model a
      `);
    }
    // Lets get a model reference and add a reference for all of the models
    let model = this.model.models.get(settings.model);
    model.models = this.model.models;
    // If everything goes well, we will store a child reference and return it.
    this.childs[relationship] = new FireLoopRef(model, this.socket, this, relationship);
    return this.childs[relationship];
  }
  /**
  * @method pull
  * @param {string} event Event name
  * @param {any} request Type of request, can be LB-only filter or FL+LB filter
  * @return {Observable}
  * @description
  * This method will pull initial data from server
  **/
  pull(event, request) {
    let sbj = new Subject();
    let that = this;
    let nowEvent = `${event}.pull.requested.${this.id}`;
    this.socket.emit(`${event}.pull.request.${this.id}`, request);
    function pullNow(data) {
      if (that.socket.removeListener) {
        that.socket.removeListener(nowEvent, pullNow);
      }
      sbj.next(data);
    };
    this.socket.on(nowEvent, pullNow);
    return sbj.asObservable();
  }
  /**
  * @method broadcasts
  * @param {string} event Event name
  * @param {any} request Type of request, can be LB-only filter or FL+LB filter
  * @return {Observable}
  * @description
  * This will listen fo
  broadcasts announces and then request
  * for data according a specific client request, not shared with other clients.
  **/
  broadcasts(event, request) {
    let sbj = new Subject();
    let channels = {
      announce: `${event}.broadcast.announce.${this.id}`,
      broadcast: `${event}.broadcast.${this.id}`
    };
    let that = this;
    // Announces Handler
    this.disposable[channels.announce] = function (res) {
      that.socket.emit(`${event}.broadcast.request.${that.id}`, request)
    };
    // Broadcasts Handler
    this.disposable[channels.broadcast] = function (data) {
      sbj.next(data);
    };
    this.socket.on(channels.announce, this.disposable[channels.announce]);
    this.socket.on(channels.broadcast, this.disposable[channels.broadcast]);
    return sbj.asObservable();
  }
  /**
  * @method operation
  * @param {string} event Event name
  * @param {any} data Any type of data sent to the server
  * @return {Observable}
  * @description
  * This internal method will run operations depending on current context 
  **/
  operation(event, data) {
    if (!this.relationship) {
      event = `${this.model.getModelName()}.${event}.${this.id}`;
    } else {
      event = `${this.parent.model.getModelName()}.${this.relationship}.${event}.${this.id}`;
    }
    let subject = new Subject();
    let config = {
      data,
      parent: this.parent && this.parent.instance ? this.parent.instance : null
    };
    this.socket.emit(event, config);
    let resultEvent = '';
    if (!this.relationship) {
      resultEvent = `${this.model.getModelName()}.value.result.${this.id}`;
    } else {
      resultEvent = `${this.parent.model.getModelName()}.${this.relationship}.value.result.${this.id}`;
    }
    this.socket.on(resultEvent, (res) => {
      if (res.error) {
        subject.error(res);
      } else {
        subject.next(res);
      }
    });
    if (event.match('dispose')) {
      setTimeout(() => subject.next());
    }
    // This event listener will be wiped within socket.connections
    this.socket.sharedObservables.sharedOnDisconnect.subscribe(() => subject.complete());
    return subject.asObservable().catch((error) => Observable.throw(error));
  }
  /**
  * @method buildId
  * @return {number}
  * @description
  * This internal method build an ID for this reference, this allows to have
  * multiple references for the same model or relationships.
  **/
  buildId() {
    return Date.now() + Math.floor(Math.random() * 100800) *
      Math.floor(Math.random() * 100700) *
      Math.floor(Math.random() * 198500);
  }
}
