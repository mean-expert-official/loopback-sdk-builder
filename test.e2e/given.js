define(['angular', 'angularMocks', 'angularResource'], function(angular) {
  'use strict';

  var port = 3838;
  var backendUrl = 'http://localhost:' + port;

  var given = {};

  var currentSpec = null;
  beforeEach(function saveSpec() {
    currentSpec = this;
  });

  var $q = angular.injector(['ng']).get('$q');

  /**
   * Configures a loopback application with models defined by options,
   * generates the lb-services file and loads the services into the context
   * (document).
   *
   * @param {Object} options
   *
   *   - `name` - Optional: the name of the service. Must be unique, a name
   *      based on the test case is used by default.
   *
   *   - `models` - JSON structure defining models, it has the same format
   *      as models.json used by `app.boot()`.
   *
   * @param {function(Object=, Object=)} cb
   *   Optional continuation. The second parameter is an initialized angular
   *   injector that can be used to resolve $resource objects provided
   *   by the loopback service.
   *
   *   Example:
   *
   *   ```js
   *   $injector.invoke(function(Customer) {
   *     Customer.get({ id: 10 }, // etc.
   *   });
   *   ```
   *
   * @return $q Promise that is resolved with the $injector.
   *
   * Example:
   * ```js
   * given.servicesForLoopBackApp({
   *   models: // etc.
   * }).then(function($injector) {
   *   $injector.invoke(function(Customer) {
   *     // etc.
   *   });
   * });
   * ```
   */
  given.servicesForLoopBackApp = function(options, cb) {
    options.name = generateUniqueServiceName(options.name);

    var promise = callSetup(options)
      .then(function(config) { return config.servicesUrl; })
      .then(injectScriptAtUrl)
      .then(function() {
        return function createTestInjector() {
          var injector = angular.injector(['ng', 'ngMockE2E', options.name]);
          // Setup the mocked http provider to pass all $http requests
          // to our LoopBack server
          var $httpBackend = injector.get('$httpBackend');
          ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'].forEach(function(method) {
            $httpBackend.when(method).passThrough();
          });
          return injector;
        };
      });

    if (cb)
      promise.then(function($injector) { cb(null, $injector); }, cb);

    return promise;
  };

  var namesUsed = {};
  function generateUniqueServiceName(base) {
    if (!base) base = getFullSpecName() || 'lbServices';

    var candidate = base;
    var counter = 0;
    while (namesUsed[candidate]) {
      candidate = base + '-' + counter;
    }
    namesUsed[candidate] = true;
    return candidate;
  }

  function getFullSpecName() {
    var names = [];

    var spec = currentSpec ?
      currentSpec.currentTest || currentSpec.test :
      window.mocha.suite.ctx.test;

    if (spec && spec.ctx && spec.ctx.currentTest) {
      names.unshift(spec.ctx.currentTest.title);
      spec = spec.parent;
    }

    while (spec) {
      if (spec.title)
        names.unshift(spec.title);
      spec = spec.parent;
    }

    return names.join('::');
  }

  function callSetup(options) {
    var deferred = $q.defer();
    var xhr = new XMLHttpRequest();
    xhr.open('post', backendUrl + '/setup');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(options));
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        deferred.reject(new Error('Cannot build LB App: ' + xhr.status));
      }
      deferred.resolve(JSON.parse(xhr.responseText));
    };
    return deferred.promise;
  }

  function injectScriptAtUrl(url) {
    // we can't use requirejs to load lb-services.js file
    // because Karma is redirecting all requirejs URLs
    var deferred = $q.defer();
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = function() {
      deferred.resolve();
    };
    script.onerror = function() {
      deferred.reject(new Error('Cannot load script ' + url));
    };
    document.getElementsByTagName('head')[0].appendChild(script);
    return deferred.promise;
  }

  return given;
});
