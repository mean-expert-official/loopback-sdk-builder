var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var ejs = require('ejs');
var utils = require('../utils');

ejs.filters.q = function(obj) {
  return JSON.stringify(obj, null, 2 );
};

/**
 * Generate Angularjs $resource services for the given loopback application.
 *
 * ```js
 * var generateServices = require('loopback-sdk-builder').angularjs;
 * var app = require('./server/server');
 *
 * generateServices(app, 'lbServices', '/api', 'path/to/client/sdk/folder');
 * ```
 *
 * @param {Object} app The loopback application created via `app = loopback()`.
 * @param {string=} ngModuleName A name for the generated Angulajs module.
 *   Default: `lbServices`.
 * @param {string=} apiUrl The URL where the client can access the LoopBack
 *   server app. Default: `/`.
 * @param {string=} framework Client's framework. Default: `angularjs`.
 * @param {string=} Folder for client output.
 * @returns {string} The generated javascript code.
 * @header generateServices
 */
module.exports = function generate(app, ngModuleName, apiUrl, outputFolder) {
  ngModuleName = ngModuleName || 'lbServices';
  apiUrl = apiUrl || '/';

  var models = utils.describeModels(app);
  var templateName = './services.ejs';

  mkdirp.sync(outputFolder);

  try {
    fs.accessSync(require.resolve(templateName), fs.F_OK);
  }
  catch (e) {
    console.error('\033[31mTemplate for "%s" not found\033[0m', 'angular');
    process.exit(1);
  }

  var servicesTemplate = fs.readFileSync(
    require.resolve(templateName),
    { encoding: 'utf-8' }
  );

  var result = ejs.render(servicesTemplate, {
    moduleName: ngModuleName,
    models: models,
    urlBase: apiUrl.replace(/\/+$/, '')
  });

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    console.error('Saving the generated services source to %j', outputFolder);
    fs.writeFileSync(outputFolder + '/' + ngModuleName + '.js', result);
  }

  return result;
};