/*
The test server is an HTTP service allowing
front-end tests running in a browser to setup
a custom LoopBack instance and generate & access lb-services.js
*/

var express = require('express');
var loopback = require('loopback');
var generator = require('..');

var port = process.env.PORT || 3838;
var baseUrl;
var apiUrl;
var masterApp = express();

var lbApp;
var servicesScript;

// Enable all domains to access our server via AJAX
// This way the script running in Karma page can
// talk to our service running on a different host/port.
masterApp.use(require('cors')());
masterApp.use(express.json());

masterApp.use(express.logger('dev'));

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
  }
 */
masterApp.post('/setup', function(req, res, next) {
  var name = req.body.name;
  var models = req.body.models;

  if (!name)
    return next(new Error('"name" is a required parameter'));

  if (!models || typeof models !== 'object')
    return next(new Error('"models" must be a valid object'));

  lbApp = loopback();

  lbApp.dataSource('db', { connector: 'memory' });

  for (var m in models) {
    models[m].dataSource = 'db';
    lbApp.model(m, models[m]);
  }

  lbApp.set('restApiRoot', '/');
  lbApp.installMiddleware();

  servicesScript = generator.services(lbApp, name, apiUrl);

  res.send(200, { servicesUrl: baseUrl + 'services?' + name });
});

masterApp.get('/services', function(req, res, next) {
  res.set('Content-Type', 'application/javascript');
  res.send(200, servicesScript);
});

masterApp.use('/api', function(res, req, next) {
  if(!lbApp) return next(new Error('Call /setup first.'));
  lbApp(res, req, next);
});

masterApp.use(express.errorHandler());

masterApp.listen(port, function() {
  port = this.address().port;
  baseUrl = 'http://localhost:' + port + '/';
  console.log('Test server is listening on %s', baseUrl);
  apiUrl = baseUrl + 'api';
});
