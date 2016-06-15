var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var ejs = require('ejs');
var utils = require('../utils');

ejs.filters.q = function(obj) {
  return JSON.stringify(obj, null, 2 );
};

/**
 * Generate Angular $resource services for the given loopback application.
 *
 * ```js
 * var generateServices = require('loopback-sdk-builder').angular2;
 * var app = require('./server/server');
 *
 * generateServices(app, 'lbServices', '/api', 'path/to/client/sdk/folder');
 * ```
 *
 * @param {Object} app The loopback application created via `app = loopback()`.
 * @param {string=} ngModuleName A name for the generated Angular module.
 *   Default: `lbServices`.
 * @param {string=} apiUrl The URL where the client can access the LoopBack
 *   server app. Default: `/`.
 * @param {string=} framework Client's framework. Default: `angular`.
 * @param {string=} Folder for client output.
 * @returns {string} The generated javascript code.
 * @header generateServices
 */
module.exports = function generate(app, ngModuleName, apiUrl, outputFolder, isIo) {
  ngModuleName = ngModuleName || 'lbServices';
  apiUrl = apiUrl || '/';

  var models = utils.describeModels(app);

  var results = [];

  mkdirp.sync(outputFolder+'/models');
  if (isIo === 'enabled')
  mkdirp.sync(outputFolder+'/sockets');
  mkdirp.sync(outputFolder+'/services/api');

  results.push(generateModels(models, ngModuleName, apiUrl, outputFolder, isIo));
  results.push(generateApis(models, ngModuleName, apiUrl, outputFolder, isIo));
  results.push(generateHelperFiles(models, ngModuleName, apiUrl, outputFolder, isIo));

  return results;
};

function generateModels(models, ngModuleName, apiUrl, outputFolder, isIo) {
  var template = fs.readFileSync(
    require.resolve('../shared/model.ejs'),
    { encoding: 'utf-8' }
  );

  var indexTemplate = fs.readFileSync(
    require.resolve('../shared/models.ejs'),
    { encoding: 'utf-8' }
  );

  var results = [];
  var result;
  for (var modelName in models) {
    var meta = models[modelName];
    // capitalize the model name
    modelName = modelName[0].toUpperCase() + modelName.slice(1);

    result = ejs.render(template, {
      moduleName: ngModuleName,
      modelName: modelName,
      model: meta,
      urlBase: apiUrl.replace(/\/+$/, ''),
      getModelType: getModelType
    });

    if (outputFolder) {
      outputFolder = path.resolve(outputFolder);
      fs.writeFileSync(
        outputFolder + '/models/' + modelName + '.ts',
        result
      );
    }

    results.push(result);
  }

  result = ejs.render(indexTemplate, {
    moduleName: ngModuleName,
    models: models,
    urlBase: apiUrl.replace(/\/+$/, '')
  });

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    console.error('Saving the generated services source to %j', outputFolder);
    fs.writeFileSync(outputFolder + '/models/index.ts', result);
  }

  results.push(result);
  return results;
}

function generateApis(models, ngModuleName, apiUrl, outputFolder, isIo) {
  var template = fs.readFileSync(
    require.resolve('../shared/api.ejs'),
    { encoding: 'utf-8' }
  );

  var indexTemplate = fs.readFileSync(
    require.resolve('../shared/apis.ejs'),
    { encoding: 'utf-8' }
  );

  var results = [];
  var result;
  for (var modelName in models) {
    var meta = models[modelName];
    // capitalize the model name
    modelName = modelName[0].toUpperCase() + modelName.slice(1);

    result = ejs.render(template, {
      moduleName: ngModuleName,
      modelName: modelName,
      meta: meta,
      isIo: isIo,
      urlBase: apiUrl.replace(/\/+$/, '')
    });

    if (outputFolder) {
      outputFolder = path.resolve(outputFolder);
      fs.writeFileSync(
        outputFolder + '/services/api/' + modelName + '.ts',
        result
      );
    }

    results.push(result);
  }

  result = ejs.render(indexTemplate, {
    moduleName: ngModuleName,
    models: models,
    urlBase: apiUrl.replace(/\/+$/, '')
  });

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    fs.writeFileSync(outputFolder + '/services/api.service.ts', result);
  }

  results.push(result);
  return results;
}

function generateHelperFiles(models, ngModuleName, apiUrl, outputFolder, isIo) {
  var results = [];
  var result;

  /**
   * Generate services/api.d.ts
   */
  var template = fs.readFileSync(
    require.resolve('../shared/typings.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template);

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    fs.writeFileSync(outputFolder + '/services/api.d.ts', result);
  }

  results.push(result);

  /**
   * Generate services/errorHandler.service.ts
   */
  template = fs.readFileSync(
    require.resolve('../shared/errorHandler.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template);

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    fs.writeFileSync(
      outputFolder + '/services/errorHandler.service.ts',
      result
    );
  }

  results.push(result);

  /**
   * Generate services/config.service.ts
   */
  template = fs.readFileSync(
    require.resolve('../shared/config.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ngModuleName,
    urlBase: apiUrl.replace(/\/+$/, '')
  });

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    fs.writeFileSync(outputFolder + '/services/config.service.ts', result);
  }

  results.push(result);

  /**
   * Generate services/baseApi.service.ts
   */
  template = fs.readFileSync(
    require.resolve('../shared/baseApi.ejs'),
    { encoding: 'utf-8' }
  );
  
  result = ejs.render(template, {
    moduleName: ngModuleName,
    isIo: isIo,
    urlBase: apiUrl.replace(/\/+$/, '')
  });

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    fs.writeFileSync(outputFolder + '/services/baseApi.service.ts', result);
  }

  results.push(result);

  /**
   * Generate services/auth.service.ts
   */
  template = fs.readFileSync(
    require.resolve('./auth.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ngModuleName,
    urlBase: apiUrl.replace(/\/+$/, '')
  });

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    fs.writeFileSync(outputFolder + '/services/auth.service.ts', result);
  }

  results.push(result);
  
  if (isIo === 'enabled') {
    /**
     * Generate sockets/index.ts
     */
    template = fs.readFileSync(
      require.resolve('../shared/socket.index.ejs'),
      { encoding: 'utf-8' }
    );

    result = ejs.render(template);

    if (outputFolder) {
      outputFolder = path.resolve(outputFolder);
      fs.writeFileSync(outputFolder + '/sockets/index.ts', result);
    }

    results.push(result);

    /**
     * Generate sockets/socket.driver.ts
     */
    template = fs.readFileSync(
      require.resolve('./socket.driver.ejs'),
      { encoding: 'utf-8' }
    );

    result = ejs.render(template);

    if (outputFolder) {
      outputFolder = path.resolve(outputFolder);
      fs.writeFileSync(outputFolder + '/sockets/socket.driver.ts', result);
    }

    results.push(result);

    /**
     * Generate sockets/socket.connections.ts
     */
    template = fs.readFileSync(
      require.resolve('../shared/socket.connections.ejs'),
      { encoding: 'utf-8' }
    );

    result = ejs.render(template);

    if (outputFolder) {
      outputFolder = path.resolve(outputFolder);
      fs.writeFileSync(outputFolder + '/sockets/socket.connections.ts', result);
    }

    results.push(result);
  }

  /**
   * Generate index.ts
   */
  template = fs.readFileSync(
    require.resolve('./index.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ngModuleName,
    models: models,
    urlBase: apiUrl.replace(/\/+$/, '')
  });

  if (outputFolder) {
    outputFolder = path.resolve(outputFolder);
    fs.writeFileSync(outputFolder + '/index.ts', result);
  }

  results.push(result);

  return results;
}

function getModelType(type) {
  switch (type.toString()) {
    case 'boolean':
    case 'function Boolean() { [native code] }':
      return 'boolean';
    case 'number':
    case 'function Number() { [native code] }':
      return 'number';
    case 'Array':
    case 'Array':
      return 'Array<any>';
    case 'string':
    case 'function String() { [native code] }':
      return 'string';
    default:
      return 'any';
  }
}