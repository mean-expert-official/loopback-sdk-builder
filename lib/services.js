var fs = require('fs');
var ejs = require('ejs');

ejs.filters.q = function(obj) {
  return JSON.stringify(obj, null, 2 );
};

/**
 * Generate Angular $resource services for the given loopback application.
 *
 * ```js
 * var generateServices = require('loopback-sdk-angular').services;
 * var app = require('./server/server');
 *
 * var client = generateServices(app, 'lbServices', '/api');
 * require('fs').writeFileSync('client/loopback.js', client, 'utf-8');
 * ```
 *
 * @param {Object} app The loopback application created via `app = loopback()`.
 * @param {string=} ngModuleName A name for the generated Angular module.
 *   Default: `lbServices`.
 * @param {string=} apiUrl The URL where the client can access the LoopBack
 *   server app. Default: `/`.
 * @returns {string} The generated javascript code.
 * @header generateServices
 */
module.exports = function generateServices(app, ngModuleName, apiUrl) {
  ngModuleName = ngModuleName || 'lbServices';
  apiUrl = apiUrl || '/';

  var models = describeModels(app);

  var servicesTemplate = fs.readFileSync(
    require.resolve('./services.template.ejs'),
    { encoding: 'utf-8' }
  );

  return ejs.render(servicesTemplate, {
    moduleName: ngModuleName,
    models: models,
    urlBase: apiUrl.replace(/\/+$/, '')
  });
};

function describeModels(app) {
  var result = {};
  app.handler('rest').adapter.getClasses().forEach(function(c) {
    var name = c.name;

    if (!c.ctor) {
      // Skip classes that don't have a shared ctor
      // as they are not LoopBack models
      console.error('Skipping %j as it is not a LoopBack model', name);
      return;
    }

    // The URL of prototype methods include sharedCtor parameters like ":id"
    // Because all $resource methods are static (non-prototype) in ngResource,
    // the sharedCtor parameters should be added to the parameters
    // of prototype methods.
    c.methods.forEach(function fixArgsOfPrototypeMethods(method, key) {
      if (method.name=='create') {
        var createMany = Object.create(method);
            createMany.name = 'createMany';
            createMany.isReturningArray = function() { return true; };
            c.methods.splice(key+1, 0, createMany);
      }
      var ctor = method.restClass.ctor;
      if (!ctor || method.sharedMethod.isStatic) return;
      method.accepts = ctor.accepts.concat(method.accepts);

      if(!method.accepts) return;

      // Any extra http action arguments in the path need to be added to the
      // angular resource actions as params
      method.accepts.forEach(function findResourceParams(arg) {
        if(!arg.http) return;

        if(arg.http.source === 'path' && arg.arg !== 'id') {
          if(!method.resourceParams) {
            method.resourceParams = [];
            method.hasResourceParams = true;
          }
          method.resourceParams.push(arg);
        }
      });
    });

    c.isUser = c.sharedClass.ctor.prototype instanceof app.loopback.User ||
      c.sharedClass.ctor.prototype === app.loopback.User.prototype;
    result[name] = c;
  });

  buildScopes(result);

  return result;
}

var SCOPE_METHOD_REGEX = /^prototype.__([^_]+)__(.+)$/;

function buildScopes(models) {
  for (var modelName in models) {
    buildScopesOfModel(models, modelName);
  }
}

function buildScopesOfModel(models, modelName) {
  var modelClass = models[modelName];

  modelClass.scopes = {};
  modelClass.methods.forEach(function(method) {
    buildScopeMethod(models, modelName, method);
  });

  return modelClass;
}

// reverse-engineer scope method
// defined by loopback-datasource-juggler/lib/scope.js
function buildScopeMethod(models, modelName, method) {
  var modelClass = models[modelName];
  var match = method.name.match(SCOPE_METHOD_REGEX);
  if (!match) return;

  var op = match[1];
  var scopeName = match[2];
  var modelPrototype = modelClass.sharedClass.ctor.prototype;
  var targetClass = modelPrototype[scopeName] &&
      modelPrototype[scopeName]._targetClass;

  if (modelClass.scopes[scopeName] === undefined) {
    if (!targetClass) {
      console.error(
        'Warning: scope %s.%s is missing _targetClass property.' +
        '\nThe Angular code for this scope won\'t be generated.' +
        '\nPlease upgrade to the latest version of' +
        '\nloopback-datasource-juggler to fix the problem.',
        modelName, scopeName);
      modelClass.scopes[scopeName] = null;
      return;
    }

    if (!findModelByName(models, targetClass)) {
      console.error(
        'Warning: scope %s.%s targets class %j, which is not exposed ' +
        '\nvia remoting. The Angular code for this scope won\'t be generated.',
        modelName, scopeName, targetClass);
      modelClass.scopes[scopeName] = null;
      return;
    }

    modelClass.scopes[scopeName] = {
      methods: {},
      targetClass: targetClass
    };
  } else if (modelClass.scopes[scopeName] === null) {
    // Skip the scope, the warning was already reported
    return;
  }

  var apiName = scopeName;
  if (op == 'get') {
    // no-op, create the scope accessor
  } else if (op == 'delete') {
    apiName += '.destroyAll';
  } else {
    apiName += '.' + op;
  }

  // Names of resources/models in Angular start with a capital letter
  var ngModelName = modelName[0].toUpperCase() + modelName.slice(1);
  method.internal = 'Use ' + ngModelName + '.' + apiName + '() instead.';

  // build a reverse record to be used in ngResource
  // Product.__find__categories -> Category.::find::product::categories
  var reverseName = '::' + op + '::' + modelName + '::' + scopeName;

  var reverseMethod = Object.create(method);
  reverseMethod.name = reverseName;
  reverseMethod.internal = 'Use ' + ngModelName + '.' + apiName + '() instead.';
  // override possibly inherited values
  reverseMethod.deprecated = false;

  var reverseModel = findModelByName(models, targetClass);
  reverseModel.methods.push(reverseMethod);
  if(reverseMethod.name.match(/create/)){
    var createMany = Object.create(reverseMethod);
        createMany.name = createMany.name.replace(
          /create/,
          'createMany'
        );
        createMany.internal = createMany.internal.replace(
          /create/,
          'createMany'
        );
        createMany.isReturningArray = function() { return true; };
        reverseModel.methods.push(createMany);
  }

  var scopeMethod = Object.create(method);
  scopeMethod.name = reverseName;
  // override possibly inherited values
  scopeMethod.deprecated = false;
  scopeMethod.internal = false;
  modelClass.scopes[scopeName].methods[apiName] = scopeMethod;
  if(scopeMethod.name.match(/create/)){
    var scopeCreateMany = Object.create(scopeMethod);
    scopeCreateMany.name = scopeCreateMany.name.replace(
      /create/,
      'createMany'
    );
    scopeCreateMany.isReturningArray = function() { return true; };
    apiName = apiName.replace(/create/, 'createMany');
    modelClass.scopes[scopeName].methods[apiName] = scopeCreateMany;
  }
}

function findModelByName(models, name) {
  for (var n in models) {
    if (n.toLowerCase() == name.toLowerCase())
      return models[n];
  }
}
