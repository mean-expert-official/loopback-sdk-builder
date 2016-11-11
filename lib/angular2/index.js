/**
 * @module Angular 2 Generator for loopback-sdk-builder
 * @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
 * @license MTI
 * @description
 * Defines a SDK Schema and builds according configuration
 */
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
var ejs = require('ejs');
var utils = require('../utils');
/**
 * EJS Q Filter
 */
ejs.filters.q = (obj) => JSON.stringify(obj, null, 2);
/**
 * Generate Client SDK for the given loopback application.
 */
module.exports = function generate(ctx) {
  'use strict';
  // Describe models and remove those blacklisted
  ctx.models = utils.describeModels(ctx.app);
  /**
   * Directory Management
   */
  ctx.outputFolder = path.resolve(ctx.outputFolder);
  console.log('Removing base directory %s', ctx.outputFolder);
  rmdir.sync(ctx.outputFolder);
  // Create required directories
  let directories = [
    ctx.outputFolder,
    ctx.outputFolder + '/models',
    ctx.outputFolder + '/storage',
    ctx.outputFolder + '/services/core',
    ctx.outputFolder + '/services/custom'
  ];
  if (ctx.isIo === 'enabled') directories.push(ctx.outputFolder + '/sockets');
  directories.forEach(directory => mkdirp.sync(directory));
  /**
   * Fix to decide which AcccessToken to get, since usually is private, but not
   * Always, so  we need to import from the right place
   */
  ctx.loadAccessToken = (ctx.models.AccessToken ? false : true);
  /**
  * LoopBack SDK Builder Schema for Angular 2 and NativeScript 2
  **/
  let schema = [
    /**
     * SDK INDEXES
     */
    {
      template: './shared/index.ejs',
      output: '/index.ts',
      params: {
        isIo: ctx.isIo,
        models: ctx.models,
        buildModuleImports: buildModuleImports
      }
    },
    {
      template: './shared/models/index.ejs',
      output: '/models/index.ts',
      params: {
        isIo: ctx.isIo,
        models: ctx.models
      }
    },
    {
      template: './shared/services/index.ejs',
      output: '/services/index.ts',
      params: {}
    },
    {
      template: './shared/services/custom/index.ejs',
      output: '/services/custom/index.ts',
      params: { models: ctx.models }
    },
    {
      template: './shared/services/core/index.ejs',
      output: '/services/core/index.ts',
      params: { isIo: ctx.isIo }
    },
    /**
     * SDK CONFIG
     */
    {
      template: './shared/config.ejs',
      output: '/lb.config.ts',
      params: { app: ctx.app }
    },
    /**
     * SDK STATIC BASE AND CORE FILES
     */
    {
      template: './shared/models/base.ejs',
      output: '/models/BaseModels.ts',
      params: { loadAccessToken: ctx.loadAccessToken }
    },
    {
      template: './shared/services/core/auth.ejs',
      output: '/services/core/auth.service.ts',
      params: { loadAccessToken: ctx.loadAccessToken }
    },
    {
      template: './shared/services/core/base.ejs',
      output: '/services/core/base.service.ts',
      params: {
        isIo: ctx.isIo,
        buildBaseServiceImports: buildBaseServiceImports
      }
    },
    {
      template: './shared/services/core/error.ejs',
      output: '/services/core/error.service.ts',
      params: {}
    },
    {
      template: './shared/services/core/logger.ejs',
      output: '/services/custom/logger.service.ts',
      params: {}
    },
    {
      template: './shared/services/core/search.ejs',
      output: '/services/core/search.params.ts',
      params: {}
    },
    /**
     * STORAGE DRIVER
     */
    {
      template: './drivers/' + ctx.driver + '/storage.driver.ejs',
      output: '/storage/storage.driver.ts',
      params: {}
    }
  ];
  /**
   * PUBSUB MODULE SUPPORT
   */
  if (ctx.isIo === 'enabled') {
    schema = schema.concat([
      {
        template: './drivers/' + ctx.driver + '/socket.driver.ejs',
        output: '/sockets/socket.driver.ts',
        params: {}
      },
      {
        template: './shared/sockets/index.ejs',
        output: '/sockets/index.ts',
        params: {}
      },
      {
        template: './shared/sockets/connections.ejs',
        output: '/sockets/socket.connections.ts',
        params: {}
      },
      {
        template: './shared/services/core/io.ejs',
        output: '/services/core/io.service.ts',
        params: {}
      },
      {
        template: './shared/services/core/realtime.ejs',
        output: '/services/core/real.time.ts',
        params: {}
      },
      {
        template: './shared/models/fireloop.ejs',
        output: '/models/FireLoop.ts',
        params: {}
      },
      {
        template: './shared/models/flref.ejs',
        output: '/models/FireLoopRef.ts',
        params: {}
      }
    ]);
  }
  /**
   * SDK DYNAMIC FILES
   */
  Object.keys(ctx.models).forEach(modelName => {
    if (ctx.models[modelName].sharedClass.ctor.settings.sdk &&
      !ctx.models[modelName].sharedClass.ctor.settings.sdk.enabled) {
      console.warn('LoopBack SDK Builder: %s model was ignored', modelName);
      return;
    } else {
      console.info('LoopBack SDK Builder: adding %s model to SDK', modelName);
      schema = schema.concat([
        /**
        * SDK MODELS
        */
        {
          template: './shared/models/model.ejs',
          output: '/models/' + modelName + '.ts',
          params: {
            model: ctx.models[modelName],
            modelName: modelName,
            buildModelImports: buildModelImports,
            buildModelProperties: buildModelProperties
          }
        },
        /**
        * SDK CUSTOM SERVICES
        */
        {
          template: './shared/services/custom/service.ejs',
          output: '/services/custom/' + modelName + '.ts',
          params: {
            isIo: ctx.isIo,
            model: ctx.models[modelName],
            modelName: modelName,
            moduleName: ctx.moduleName,
            buildPostBody: buildPostBody,
            buildUrlParams: buildUrlParams,
            buildRouteParams: buildRouteParams,
            loadAccessToken: ctx.loadAccessToken,
            buildMethodParams: buildMethodParams,
            buildServiceImports: buildServiceImports,
            normalizeMethodName: normalizeMethodName,
            buildObservableType: buildObservableType,
            paramIsContext: paramIsContext
          }
        }
      ]);
    }
  });
  /**
   * PROCESS SCHEMA
   */
  schema.forEach(
    config => {
      console.info('Generating: %s', `${ctx.outputFolder}${config.output}`);
      fs.writeFileSync(
        `${ctx.outputFolder}${config.output}`,
        ejs.render(fs.readFileSync(
          require.resolve(config.template),
          { encoding: 'utf-8' }),
          config.params
        )
      )
    }
  );
  /**
   * @method buildModelImports
   * @description
   * Define import statement for those model who are related to other scopes
   */
  function buildModelImports(model) {
    let relations = getModelRelations(model);
    let loaded = {};
    let output = [];
    if (relations.length > 0) {
      relations.forEach((relationName, i) => {
        let targetClass = model.sharedClass.ctor.relations[relationName].targetClass;
        if (!loaded[targetClass]) {
          loaded[targetClass] = true;
          output.push(`  ${targetClass}`);
        }
      });
    }
    // Add GeoPoint custom type import
    Object.keys(model.properties).forEach((property) => {
      var geoPointType = buildPropertyType(model.properties[property].type);
      var hasGeoPointType = geoPointType.indexOf('GeoPoint') !== -1;
      if(hasGeoPointType) {
          output.push('  GeoPoint');
      }
    });
    if(output.length > 0) {
        var imports = output.join(',\n');
        output = [
          'import {',
          imports,
          '} from \'../index\';\n'
        ];
    }
    return output.join('\n');
  }
  /**
   * @method buildModelProperties
   * @description
   * Define properties for the given model
   */
  function buildModelProperties(model, isInterface) {
    let output = [];
    // Add Model Properties
    Object.keys(model.properties).forEach((property) => {
      if (model.isUser && property === 'credentials') return;
      let meta = model.properties[property];
      let isOptional = isInterface && !meta.required ? '?' : '';
      output.push(`  ${property}${isOptional}: ${buildPropertyType(meta.type)};`);
    });
    // Add Model Relations
    Object.keys(model.sharedClass.ctor.relations).forEach(relation => {
      output.push(`  ${relation}${isInterface ? '?' : ''}: ${buildRelationType(model, relation)};`);
    });
    return output.join('\n');
  }
  /**
   * @method buildRelationType
   * @description
   * Discovers property type according related models that are public
   */
  function buildRelationType(model, relationName) {
    let relation = model.sharedClass.ctor.relations[relationName];
    let targetClass = relation.targetClass;
    let basicType = (ctx.models[targetClass]) ? targetClass : 'any';
    let finalType = relation.type.match(/(hasOne|belongsTo)/g)
      ? basicType : `Array<${basicType}>`;
    return finalType;
  }
  /**
   * @method buildObservableType
   * @description
   * Define observable type
   */
  function buildObservableType(modelName, methodName) {
    let type = 'any';
    if (methodName.match(/(^createMany$|^find)/g)) type = `Array<${modelName}>`;
    if (methodName.match(/(^create$|upsert|^findBy|^findOne$)/g)) type = modelName;
    return type;
  }
  /**
   * @method buildServiceImports
   * @description
   * Define import statement for those model who are related to other scopes
   * IMPORTANT: This method have a very specific flow, changing it may create
   * multiple issues on multiple different use cases.
   */
  function buildServiceImports(model, loadAccessToken) {
    let modelName = capitalize(model.name);
    let imports = [
      { module: 'Injectable, Inject, Optional', from: '@angular/core'},
      { module: 'Http, Response', from: '@angular/http'},
      { module: 'BaseLoopBackApi', from: '../core/base.service'},
      { module: 'LoopBackConfig', from: '../../lb.config'},
      { module: 'LoopBackAuth', from: '../core/auth.service'},
      {
        module: `LoopBackFilter, ${model.isUser ? `SDKToken${ (loadAccessToken && model.isUser) ? ', AccessToken' : '' }` : '' }`,
        from: '../../models/BaseModels'
      },
      { module: 'JSONSearchParams', from: '../core/search.params'},
      { module: 'ErrorHandler', from: '../core/error.service'},
      { module: 'Subject', from: 'rxjs/Subject'},
      { module: 'Observable', from: 'rxjs/Observable'},
      { module: 'rxjs/add/operator/map' },
      { module: modelName, from: `../../models/${modelName}`},
    ];
    let loaded = {}; loaded[model.name] = true;
    getModelRelations(model).forEach((relationName, i) => {
      let targetClass = model.sharedClass.ctor.relations[relationName].targetClass;
      // It is imperative to check first for through models, else we may miss some
      // Through Models. This is because multiple relationships to the same model may have
      // different Through models, in the next validation we avoid duplicating models, which
      // can lead to miss some through models.
      // Finally we will be adding through models only if these are Public
      if (
        model.sharedClass.ctor.relations[relationName].modelThrough &&
        model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name !== 'Model' &&
        ctx.models[model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name]
      ) {
        let through = capitalize(model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name);
        if (!loaded[through]) {
          loaded[through] = true;
          imports.push({ module: through, from: `../../models/${through}` });
        }
      }
      // Now and after the through model was included is the right time to verify if the current model
      // was loaded by another relationship, this way we don't duplicate the class during imports'
      if (!loaded[targetClass]) {
        loaded[targetClass] = true;
        imports.push({ module: targetClass, from: `../../models/${targetClass}` });
      }
    });

    return buildImports(imports);
  }
  /**
   * @method buildModuleImports
   * @description
   * Define import statement for the SDK Module
   */
  function buildModuleImports(models, isIo) {
    let imports = [
      { module: 'JSONSearchParams', from: './services/core/search.params'},
      { module: 'ErrorHandler', from: './services/core/error.service'},
      { module: 'LoopBackAuth', from: './services/core/auth.service'},
      { module: 'LoggerService', from: './services/custom/logger.service'},
      { module: 'HttpModule', from: '@angular/http'},
      { module: 'CommonModule', from: '@angular/common'},
      { module: 'NgModule, ModuleWithProviders', from: '@angular/core'}
    ];

    if (isIo === 'enabled') {
      imports.push({ module: 'RealTime', from: './services/core/real.time'});
    }

    Object.keys(models).forEach(modelName => {
      let name = capitalize(modelName);
      imports.push({ module: `${name}Api`, from: `./services/custom/${name}` });
    });

    return buildImports(imports);
  }
  /**
   * @method buildBaseServiceImports
   * @description
   * Define import statement for the SDK Module
   */
  function buildBaseServiceImports(isIo) {
    let imports = [
      { module: 'Injectable, Inject, Optional', from: '@angular/core'},
      { module: 'Http, Headers, Request', from: '@angular/http'},
      { module: 'NgModule, ModuleWithProviders', from: '@angular/core'},
      { module: 'JSONSearchParams', from: './search.params'},
      { module: 'ErrorHandler', from: './error.service'},
      { module: 'LoopBackAuth', from: './auth.service'},
      { module: 'LoopBackConfig', from: '../../lb.config'},
      { module: 'AccessToken', from: '../../models/index'},
      { module: 'Observable', from: 'rxjs/Observable' },
      { module: 'ErrorObservable', from: 'rxjs/observable/ErrorObservable' },
      { module: 'rxjs/add/operator/catch' },
      { module: 'rxjs/add/operator/map' },
    ];

    if (isIo === 'enabled') {
      imports.push({ module: 'Subject', from: 'rxjs/Subject'});
      imports.push({ module: 'SocketConnections', from: '../../sockets/socket.connections'});
    }

    return buildImports(imports);
  }
  /**
   * @method buildImports
   * @description
   * Transform an array of objects describing which should be imported into
   * the actual template strings
   */
  function buildImports(imports) {
    return imports.map(item =>
      `import ${(item.from ? `{ ${item.module} }` : `'${item.module}'`)}${(item.from ? ` from '${item.from}'` : '')};`
    ).join('\n');
  }
  /**
   * @method normalizeMethodName
   * @description
   * Normalizes method name from loopback form to a more human readable form
   */
  function normalizeMethodName(methodName, capitalize) {
    return methodName.split('__').map((value, index) => {
      return (index < 2 && !capitalize) ? value : (value.charAt(0).toUpperCase() + value.slice(1));
    }).join('');
  }
  /**
   * @method buildMethodParams
   * @description
   * Set which params should be defined for the given remote method
   */
  function buildMethodParams(model, methodName, params, isIo) {
    if (methodName === 'logout') return '';
    let output = new Array();
    let relations = getModelRelations(model);
    let availableClasses = relations.map((relationName, index) =>
      model.sharedClass.ctor.relations[relationName].targetClass
    );

    params = params.filter(param => {
      return !paramIsContext(param)
    });

    relations.forEach(relationName => {
        if (model.sharedClass.ctor.relations[relationName].modelThrough) {
          let throughName = capitalize(
            model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name
          );
          // Only add through models when they are Public
          if (ctx.models[throughName]) {
            availableClasses.push(capitalize(
              model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name
            ));
          }
        }
      }
    );
    if (isIo) params = params.filter(param => !param.arg.match(/(fk|data|options)/));
    params.forEach((param, i, arr) => {
      let type;
      if (param.type === 'object') {
        type = param.arg === 'filter' ? 'LoopBackFilter' : 'any';
      } else {
        type = param.type !== 'AccessToken' && param.type !== 'any'
          ? capitalize(param.type) : 'any';
      }
      if (!type.match(/(^any$|LoopBackFilter)/) && availableClasses.indexOf(type) < 0) {
        type = 'any';
      }
      let value = '';
      // Accept Array on createMany method.
      if (methodName.match(/createMany/) && param.arg === 'data') {
        type = `Array<${type}>`;
      }
      // Set default value, usually will be {}, but on login we include user
      // Should not be undefined or will create request issues
      if (!param.required && methodName === 'login' && param.arg === 'include') {
        type = 'any';
        value = " = 'user'";
      } else {
        value = !param.required ? ` = ${ type.match(/Array/) ? '[]' : '{}' }`: '';
      }
      output.push(`${param.arg}: ${type}${value}`);
    });

    // When login, there is a property not coming from LoopBack that is needed.
    // so we need to add a rememberMe property to temporal o permanent store the user
    if (methodName === 'login') {
      output.push(`rememberMe: boolean = true`);
    }
    return output.join(', ');
  }
  /**
   * @method paramIsRoute
   * @description
   * Testing if the param is route type
   */
  function paramIsRoute(param) {
    return (param.http && param.http.source === 'path') || (param.arg && param.arg.match(/(^id$|fk|file|container)/));
  }
  /**
   * @method paramIsFunction
   * @description
   * Testing if the param is function type
   */
  function paramIsFunction(param) {
    return typeof param.http === 'function'
  }
  /**
   * @method paramIsContext
   * @description
   * Testing if the param is a http.context
   */
  function paramIsContext(param) {
    return (typeof param.http !== 'undefined' && typeof param.http.source !== 'undefined' && param.http.source === 'context');
  }
  /**
   * @method buildPostBody
   * @description
   * Define which properties should be passed while posting data (POST, PUT, PATCH)
   */
  function buildPostBody(postData) {
    let output = [];
    if (Array.isArray(postData)) {
      postData = postData.filter(param => {
        // Filter out route params and function params
        if (paramIsRoute(param) || paramIsFunction(param)) {
          return false
        }
        // Make sure the param is body
        return param.http && param.http.source == 'body'
      })
      if (postData.length > 0) {
        output.push('');
        let l = postData.length;
        postData.forEach((property, i) => {
          output.push(`      ${property.arg}: ${property.arg}${(i < l - 1) ? ',' : ''}`);
        });
        output.push('    ');
      }
    }
    return output.join('\n');
  }
  /**
   * @method buildUrlParams
   * @description
   * Define which properties should be passed using query string
   */
  function buildUrlParams(model, methodName, urlParams) {
    let output = [''];
    // filter params that should not go over url query string
    urlParams = urlParams.filter(param => {
        // Filter out route params and function params
        if (paramIsRoute(param) || paramIsFunction(param) || paramIsContext(param)) {
          return false
        }
        // Filter out body params
        return (!param.http || param.http.source != 'body')
    });
    if (model.isUser && methodName === 'logout')
      output.push(`       _urlParams.access_token = this.auth.getAccessTokenId();`);
    if (urlParams && urlParams.length > 0) {
      urlParams.forEach((param, i) => {
        output.push(`    if (${param.arg}) _urlParams.${param.arg} = ${param.arg};`);
      });
    }
    return output.join('\n');
  }
  /**
   * @method buildRouteParams
   * @description
   * Define which properties should be passed as route params
   */
  function buildRouteParams(routeParams) {
    let output = [];
    if (routeParams) {
      routeParams = routeParams.filter(paramIsRoute)
      if (routeParams.length > 0) {
        output.push('');
        routeParams.forEach((param, i) => {
          output.push(`      ${param.arg}: ${param.arg}${(i < routeParams.length - 1) ? ',' : ''}`);
        });
        output.push('    ');
      }
    }
    return output.join('\n');
  }
  /**
   * @author João Ribeiro <jonnybgod@gmail.com, http://jonnybgod.ghost.io>,
   * @license MTI
   * @method buildPropertyType
   * @description
   * Define which properties should be passed as route params
   */
  function buildPropertyType(type) {
    switch (typeof type) {
      case 'function':
        switch(type.name) {
          case 'String':
          case 'Number':
          case 'Boolean':
            return type.name.toLowerCase();
          case 'Date':
          case 'GeoPoint':
            return type.name;
          default:
            return 'any';
        }
      case 'object':
        if(Array.isArray(type)) {
            return `Array<${buildPropertyType(type[0])}>`
        }
        return 'object';
      default:
        return 'any';
    }
  }
};
/**
 * HELPERS
 */
function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function getModelRelations(model) {
  return Object.keys(model.sharedClass.ctor.relations).filter(relationName =>
      model.sharedClass.ctor.relations[relationName].targetClass &&
      model.sharedClass.ctor.relations[relationName].targetClass !== model.name
  );
}
