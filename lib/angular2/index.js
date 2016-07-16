var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
var ejs = require('ejs');
var utils = require('../utils');
ejs.filters.q = function (obj) {
  return JSON.stringify(obj, null, 2);
};
/**
 * Generate Client SDK for the given loopback application.
 */
module.exports = function generate(ctx) {
  var results = [];
  // Describe models
  ctx.models = utils.describeModels(ctx.app);
  for (modelName in ctx.models) {
    if (!ctx.models[modelName].sharedClass.ctor.settings.sdk.enabled) {
      console.warn('LoopBack SDK Builder: %s model was ignored', modelName);
      delete ctx.models[modelName];
    }
  }
  // resolve path once
  ctx.outputFolder = path.resolve(ctx.outputFolder);
  // clean folder
  console.log('Removing base directory %s', ctx.outputFolder);
  rmdir.sync(ctx.outputFolder);
  // Create required directories
  mkdirp.sync(ctx.outputFolder);
  mkdirp.sync(ctx.outputFolder + '/models');
  if (ctx.isIo === 'enabled')
    mkdirp.sync(ctx.outputFolder + '/sockets');
  mkdirp.sync(ctx.outputFolder + '/storage');
  mkdirp.sync(ctx.outputFolder + '/services/custom');
  mkdirp.sync(ctx.outputFolder + '/services/core');
  // Generate SDK
  results.push(generateModels(ctx));
  results.push(generateApis(ctx));
  results.push(generateHelperFiles(ctx));
  return results;
};
/**
 * Generate Models and Interfaces
 */
function generateModels(ctx) {
  // Create Models
  var template = fs.readFileSync(
    require.resolve('./shared/model.ejs'),
    { encoding: 'utf-8' }
  );
  var results = [];
  var result;
  for (var modelName in ctx.models) {
    var meta = ctx.models[modelName];
    // capitalize the model name
    modelName = modelName[0].toUpperCase() + modelName.slice(1);
    result = ejs.render(template, {
      moduleName: ctx.moduleName,
      modelName: modelName,
      model: meta,
      urlBase: ctx.apiUrl.replace(/\/+$/, ''),
      getModelType: getModelType
    });
    if (ctx.outputFolder) {
      ctx.outputFolder = path.resolve(ctx.outputFolder);
      fs.writeFileSync(
        ctx.outputFolder + '/models/' + modelName + '.ts',
        result
      );
    }
    results.push(result);
  }
  // Create Models index
  var indexTemplate = fs.readFileSync(
    require.resolve('./shared/model.index.ejs'),
    { encoding: 'utf-8' }
  );
  result = ejs.render(indexTemplate, {
    moduleName: ctx.moduleName,
    models: ctx.models,
    urlBase: ctx.apiUrl.replace(/\/+$/, '')
  });
  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    console.error('Saving the generated services source to %j', ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/models/index.ts', result);
  }
  results.push(result);

  /**
   * Generate Base Models
   */
  var template = fs.readFileSync(
    require.resolve('./shared/base.models.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template);

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/models/BaseModels.ts', result);
  }

  results.push(result);

  /**
   * Generate loopback config
   */
  var template = fs.readFileSync(
    require.resolve('./shared/config.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ctx.moduleName,
    urlBase: ctx.apiUrl.replace(/\/+$/, '')
  });

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/lb.config.ts', result);
  }

  results.push(result);


  return results;
}
/**
 * Generate Models and Interfaces
 */
function generateApis(ctx) {
  var template = fs.readFileSync(
    require.resolve('./shared/api.ejs'),
    { encoding: 'utf-8' }
  );

  var customIndexTemplate = fs.readFileSync(
    require.resolve('./shared/custom-api.index.ejs'),
    { encoding: 'utf-8' }
  );


  var results = [];
  var result;
  for (var modelName in ctx.models) {
    var meta = ctx.models[modelName];
    // capitalize the model name
    modelName = modelName[0].toUpperCase() + modelName.slice(1);

    result = ejs.render(template, {
      moduleName: ctx.moduleName,
      modelName: modelName,
      meta: meta,
      isIo: ctx.isIo,
      urlBase: ctx.apiUrl.replace(/\/+$/, '')
    });

    if (ctx.outputFolder) {
      ctx.outputFolder = path.resolve(ctx.outputFolder);
      fs.writeFileSync(
        ctx.outputFolder + '/services/custom/' + modelName + '.ts',
        result
      );
    }

    results.push(result);
  }

  /**
   * Create multiple files at once (First draft for complete refactor)
   * TODO REFACTOR THE COMPLETE MESSY FILE
   */
  [
    {
      template : './shared/services.index.ejs',
      output   : '/services/index.ts',
      params   : {}
    }, 
    {
      template : './shared/custom-api.index.ejs',
      output   : '/services/custom/index.ts',
      params   : {
        models : ctx.models
      }
    },
    {
      template : './shared/core-api.index.ejs',
      output   : '/services/core/index.ts',
      params   : {}
    }
  ].forEach(
    config => {
      results.push(fs.writeFileSync(`${ctx.outputFolder}${config.output}`, ejs.render(fs.readFileSync(
        require.resolve(config.template), { encoding: 'utf-8' }), config.params))
      )
    }
  );

  return results;
}

function generateHelperFiles(ctx) {
  var results = [];
  var result;

  /**
   * Generate services/errorHandler.service.ts
   */
  template = fs.readFileSync(
    require.resolve('./shared/errorHandler.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template);

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(
      ctx.outputFolder + '/services/core/errorHandler.service.ts',
      result
    );
  }

  results.push(result);

  /**
   * Generate services/base.api.service.ts
   */
  template = fs.readFileSync(
    require.resolve('./shared/base-api.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ctx.moduleName,
    isIo: ctx.isIo,
    urlBase: ctx.apiUrl.replace(/\/+$/, '')
  });

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/services/core/base.api.service.ts', result);
  }

  results.push(result);

  /**
   * Generate services/auth.service.ts
   */
  template = fs.readFileSync(
    require.resolve('./shared/auth.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ctx.moduleName,
    urlBase: ctx.apiUrl.replace(/\/+$/, '')
  });

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/services/core/auth.service.ts', result);
  }

  results.push(result);

  /**
   * Generate storage/storage.driver.ts
   */
  template = fs.readFileSync(
    require.resolve('./' + ctx.driver + '/storage.driver.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ctx.moduleName,
    urlBase: ctx.apiUrl.replace(/\/+$/, '')
  });

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/storage/storage.driver.ts', result);
  }

  results.push(result);

  /**
   * Generate services/logger.service.ts
   */
  template = fs.readFileSync(
    require.resolve('./shared/logger.service.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ctx.moduleName,
    urlBase: ctx.apiUrl.replace(/\/+$/, '')
  });

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/services/core/logger.service.ts', result);
  }

  results.push(result);
  /**
   * Generate services/search.params.ts
   */
  template = fs.readFileSync(
    require.resolve('./shared/search.params.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ctx.moduleName,
    urlBase: ctx.apiUrl.replace(/\/+$/, '')
  });

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/services/core/search.params.ts', result);
  }

  results.push(result);

  if (ctx.isIo === 'enabled')  {
    /**
     * Generate sockets/index.ts
     */
    template = fs.readFileSync(
      require.resolve('./shared/socket.index.ejs'),
      { encoding: 'utf-8' }
    );

    result = ejs.render(template);

    if (ctx.outputFolder) {
      ctx.outputFolder = path.resolve(ctx.outputFolder);
      fs.writeFileSync(ctx.outputFolder + '/sockets/index.ts', result);
    }

    results.push(result);

    /**
     * Generate sockets/socket.driver.ts
     */
    template = fs.readFileSync(
      require.resolve('./' + ctx.driver + '/socket.driver.ejs'),
      { encoding: 'utf-8' }
    );

    result = ejs.render(template);

    if (ctx.outputFolder) {
      ctx.outputFolder = path.resolve(ctx.outputFolder);
      fs.writeFileSync(ctx.outputFolder + '/sockets/socket.driver.ts', result);
    }

    results.push(result);

    /**
     * Generate sockets/socket.connections.ts
     */
    template = fs.readFileSync(
      require.resolve('./shared/socket.connections.ejs'),
      { encoding: 'utf-8' }
    );

    result = ejs.render(template);

    if (ctx.outputFolder) {
      ctx.outputFolder = path.resolve(ctx.outputFolder);
      fs.writeFileSync(ctx.outputFolder + '/sockets/socket.connections.ts', result);
    }

    results.push(result);
  }

  /**
   * Generate index.ts
   */
  template = fs.readFileSync(
    require.resolve('./shared/index.ejs'),
    { encoding: 'utf-8' }
  );

  result = ejs.render(template, {
    moduleName: ctx.moduleName,
    models: ctx.models,
    isIo: ctx.isIo,
    urlBase: ctx.apiUrl.replace(/\/+$/, '')
  });

  if (ctx.outputFolder) {
    ctx.outputFolder = path.resolve(ctx.outputFolder);
    fs.writeFileSync(ctx.outputFolder + '/index.ts', result);
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