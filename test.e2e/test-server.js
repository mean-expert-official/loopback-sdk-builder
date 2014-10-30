/*
The test server is an HTTP service allowing
front-end tests running in a browser to setup
a custom LoopBack instance and generate & access lb-services.js
*/

var express = require('express');
var loopback = require('loopback');
var generator = require('..');
var extend = require('util')._extend;
var bodyParser = require('body-parser');
var morgan = require('morgan');
var errorHandler = require('errorhandler');

var port = process.env.PORT || 3838;
var baseUrl;
var apiUrl;
var masterApp = express();

var lbApp;
var servicesScript;

// Speed up the password hashing algorithm
// for tests using the built-in User model
loopback.User.settings.saltWorkFactor = 4;

// Save the pre-build models so that we can restore them before every test
var initialModels = loopback.Model.modelBuilder.models;
var initialDefinitions = loopback.Model.modelBuilder.definitions;

// Enable all domains to access our server via AJAX
// This way the script running in Karma page can
// talk to our service running on a different host/port.
masterApp.use(require('cors')());
masterApp.use(bodyParser.json());

masterApp.use(morgan('dev'));

/*!
Sample request
{
  name: 'lbServices',
  models: {
    Customer: {
      properties: {
        name: 'string',
        // other properties
      },
      options: {
      }
    }
    // other model objects
  },
  setupFn: (function(app, cb) {
    Customer.create(
      { name: 'a-customer' },
      function(err, customer) {
        if (err) return cb(err);
        cb(null, { customer: customer });
      });
  }).toString()
}
*/
masterApp.post('/setup', function(req, res, next) {
  var opts = req.body;
  var name = opts.name;
  var models = opts.models;
  var enableAuth = opts.enableAuth;
  var setupFn = compileSetupFn(name, opts.setupFn);

  if (!name)
    return next(new Error('"name" is a required parameter'));

  if (!models || typeof models !== 'object')
    return next(new Error('"models" must be a valid object'));

  // hack: clear the static model registry populated by previous test apps
  loopback.Model.modelBuilder.models = extend({}, initialModels);
  loopback.Model.modelBuilder.definitions = extend({}, initialDefinitions);

  lbApp = loopback();

  lbApp.dataSource('db', { connector: 'memory', defaultForType: 'db' });
  lbApp.dataSource('mail', { connector: 'mail', defaultForType: 'mail' });

  for (var m in models) {
    models[m].dataSource = 'db';
    var model = initialModels[m];
    lbApp.model(model || m, models[m]);
  }

  loopback.autoAttach();

  if (enableAuth)
    lbApp.enableAuth();

  lbApp.set('restApiRoot', '/');
  lbApp.use(lbApp.get('restApiRoot'), loopback.rest());

  setupFn(lbApp, function(err, data) {
    if (err) {
      console.error('app setup function failed', err);
      res.send(500, err);
      return;
    }

    try {
      servicesScript = generator.services(lbApp, name, apiUrl);
    } catch (err) {
      console.error('Cannot generate services script:', err.stack);
      servicesScript = 'throw new Error("Error generating services script.");';
    }

    servicesScript += '\nangular.module(' + JSON.stringify(name) + ')' +
      '.value("testData", ' + JSON.stringify(data, null, 2) + ');\n';

    res.send(200, { servicesUrl: baseUrl + 'services?' + name });
  }.bind(this));

});

function compileSetupFn(name, source) {
  if (!source)
    return function(app, cb) { cb(); };

  var debug = require('debug')('test:' + name);
  /*jshint evil:true */
  return eval('(' + source + ')');
}

masterApp.get('/services', function(req, res, next) {
  res.set('Content-Type', 'application/javascript');
  res.send(200, servicesScript);
});

masterApp.use('/api', function(res, req, next) {
  if(!lbApp) return next(new Error('Call /setup first.'));
  lbApp(res, req, next);
});

masterApp.use(errorHandler());

masterApp.listen(port, function() {
  port = this.address().port;
  baseUrl = 'http://localhost:' + port + '/';
  console.log('Test server is listening on %s', baseUrl);
  apiUrl = baseUrl + 'api';

  if (process.argv.length > 2)
    runAndExit(process.argv[2], process.argv.slice(3));
});

function runAndExit(cmd, args) {
  console.log('Running %s %s', cmd, args.join(' '));
  var child = require('child_process').spawn(cmd, args, { stdio: 'inherit' });
  child.on('error', function(err) {
    console.log('child_process.spawn failed', err);
    process.exit(1);
  });
  child.on('exit', function(code) {
    process.exit(code);
  });
}
