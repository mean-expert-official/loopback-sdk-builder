define(['angular', 'angularMocks', 'angularResource'], function(angular) {
  'use strict';

  var port = 3838;
  var backendUrl = 'http://localhost:' + port;

  var given = {};

  var currentSpec = null;
  beforeEach(function saveSpec() {
    currentSpec = this;
  });

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
   * @param {function.<Object, $injector>} cb
   *   Continuation. The second parameter is an initialized angular injector
   *   that can be used to resolve $resource objects provided by the loopback
   *   service.
   *
   *   Example:
   *
   *   ```js
   *   $injector.invoke(function(Customer) {
   *     Customer.get({ id: 10 }, // etc.
   *   });
   *   ```
   */
  given.servicesForLoopBackApp = function(options, cb) {
    options.name = generateUniqueServiceName(options.name);

    if (cb)
      return setupAndLoadServices(cb);
    else
      return setupAndLoadServices;

    function setupAndLoadServices(cb) {
      callSetup(options, function(err, config) {
        if (err) return cb(err);
        return loadServices(config);
      });
    }

    function loadServices(config) {
      return injectScriptAtUrl(config.servicesUrl, function(err) {
        if (err) return cb(err);

        var $injector = angular.injector(['ng', 'ngMockE2E', options.name]);
        return $injector.invoke(function($httpBackend) {
          $httpBackend.whenGET(/.*/).passThrough();
          cb(null, $injector);
        }, this);
      });
    }
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
    var spec = currentSpec.currentTest || currentSpec.test;

    if (spec.ctx && spec.ctx.currentTest) {
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

  function callSetup(options, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', backendUrl + '/setup');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(options));
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        return cb(new Error('Cannot build LB App: ' + xhr.status));
      }
      cb(null, JSON.parse(xhr.responseText));
    };
  }

  function injectScriptAtUrl(url, cb) {
    // we can't use requirejs to load lb-services.js file
    // because Karma is redirecting all requirejs URLs
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = function() {
      cb();
    };
    script.onerror = function() {
      cb(new Error('Cannot load script ' + url));
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  return given;
});
