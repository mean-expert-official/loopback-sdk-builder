/**
 * @module Angular 2 Generator for loopback-sdk-builder
 * @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
 * @license MIT
 * @description
 * Defines a SDK Schema and builds according configuration
 */
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
var ejs = require('ejs');
var utils = require('../utils');
var _ = require('underscore');
_.mixin(require('underscore.inflections'));
/**
 * EJS Q Filter
 * Deprecated in EJS 2 :(
 */
ejs.filters.q = (obj) => JSON.stringify(obj, null, 2);
ejs.filters.pluralize = (text) => _.pluralize(text);
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

  if (!ctx.quiet) {
    console.log('Removing base directory %s', ctx.outputFolder);
  }

  rmdir.sync(ctx.outputFolder);
  // Create required directories
  let directories = [
    ctx.outputFolder,
    ctx.outputFolder + '/models',
    ctx.outputFolder + '/services/core',
    ctx.outputFolder + '/services/custom',
    ctx.outputFolder + '/storage',
  ];
  if (ctx.isIo === 'enabled') directories.push(ctx.outputFolder + '/sockets');
  if (ctx.isNgrx === 'enabled' || ctx.isNgrx === 'orm') {
    directories.push(ctx.outputFolder + '/actions');
    directories.push(ctx.outputFolder + '/effects');
    directories.push(ctx.outputFolder + '/guards');
    directories.push(ctx.outputFolder + '/reducers');
    directories.push(ctx.outputFolder + '/resolvers');
  }
  if (ctx.isNgrx === 'orm') {
    directories.push(ctx.outputFolder + '/orm');
    directories.push(ctx.outputFolder + '/orm/models');
  }
  directories.forEach(directory => mkdirp.sync(directory));
  /**
   * Fix to decide which AcccessToken to get, since usually is private, but not
   * Always, so  we need to import from the right place
   */
  ctx.loadAccessToken = (ctx.models.AccessToken ? false : true);

  if (!ctx.quiet) {
    console.log('DRIVER: ', ctx.driver);
  }

  const throughModels = {};
  if (ctx.isNgrx === 'orm') {
    Object.keys(ctx.models).forEach(modelName => {
      for (const rel in ctx.models[modelName].sharedClass.ctor.relations) {
        if (ctx.models[modelName].sharedClass.ctor.relations[rel].modelThrough) {
          const throughModel = ctx.models[modelName].sharedClass.ctor.relations[rel].modelThrough.definition.name
          if (typeof ctx.models[throughModel] === 'undefined' && !throughModels.hasOwnProperty(throughModel)) {
            throughModels[throughModel] = {
              from: modelName,
              to: ctx.models[modelName].sharedClass.ctor.relations[rel].targetClass
            };
          }
        }
      }
    });
  }

  /**
  * LoopBack SDK Builder Schema for Angular 2 and ng2native 2
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
        isNgrx: ctx.isNgrx,
        models: ctx.models,
        driver: ctx.driver,
        buildModuleImports,
        buildNgModuleImports,
        buildNgProviders
      }
    },
    {
      template: './shared/models/index.ejs',
      output: '/models/index.ts',
      params: {
        isIo: ctx.isIo,
        models: Object.assign({}, ctx.models, throughModels)
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
     * MODEL LIST SERVICES
     */
    {
      template: './shared/services/custom/models.ejs',
      output: '/services/custom/SDKModels.ts',
      params: { models: ctx.models }
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
      params: { loadAccessToken: ctx.loadAccessToken, isNgrx: ctx.isNgrx, buildServiceDI }
    },
    {
      template: './shared/services/core/auth.ts',
      output: '/services/core/auth.service.ts',
      params: { loadAccessToken: ctx.loadAccessToken }
    },
    {
      template: './shared/services/core/base.ejs',
      output: '/services/core/base.service.ts',
      params: {
        isIo: ctx.isIo,
        buildServiceDI,
        buildBaseServiceImports
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
    /**
     * STORAGE
     */
    {
      template: './shared/storage/storage.swaps.ts',
      output: '/storage/storage.swaps.ts',
      params: {}
    }
  ];
  // Add Browser Specific Code
  if (ctx.driver.match(/ng2web|ng2universal/)) {
    schema.push({
      template: './shared/storage/cookie.browser.ts',
      output: '/storage/cookie.browser.ts',
      params: {}
    });
    schema.push({
      template: './shared/storage/storage.browser.ts',
      output: '/storage/storage.browser.ts',
      params: {}
    });
  }
  // Add Server Specific Code
  if (ctx.driver === 'ng2universal') {
    schema.push({
      template: './shared/storage/cookie.node.ts',
      output: '/storage/cookie.node.ts',
      params: {}
    });
  }
  // Add NativeScript Specific Code
  if (ctx.driver === 'ng2native') {
    schema.push({
      template: './shared/storage/storage.native.ts',
      output: '/storage/storage.native.ts',
      params: {}
    });
  }
  /**
   * NGRX SUPPORT
   */
  if (ctx.isNgrx === 'enabled' || ctx.isNgrx === 'orm') {
    schema = schema.concat([
      /**
       * NGRX Utils
       */
      {
        template: './shared/state.ejs',
        output: '/state.ts',
        params: { models: ctx.models, throughModels }
      },
      {
        template: './shared/util.ejs',
        output: '/util.ts',
        params: {}
      },
      /**
       * NGRX Actions
       */
      {
        template: './shared/actions/auth.ejs',
        output: '/actions/auth.ts',
        params: {}
      },
      {
        template: './shared/actions/base.ejs',
        output: '/actions/base.ts',
        params: {}
      },
      {
        template: './shared/actions/error.ejs',
        output: '/actions/error.ts',
        params: {}
      },
      {
        template: './shared/actions/index.ejs',
        output: '/actions/index.ts',
        params: { models: Object.assign({}, ctx.models, throughModels) }
      },
      /**
       * NGRX Effects
       */
      {
        template: './shared/effects/auth.ejs',
        output: '/effects/auth.ts',
        params: {
          userModelName: getUserModelName()
        }
      },
      {
        template: './shared/effects/base.ejs',
        output: '/effects/base.ts',
        params: {}
      },
      {
        template: './shared/effects/resolver.ejs',
        output: '/effects/resolver.ts',
        params: {}
      },
      /**
       * NGRX Guards
       */
      {
        template: './shared/guards/index.ejs',
        output: '/guards/index.ts',
        params: { models: ctx.models }
      },
      {
        template: './shared/guards/auth.guard.ejs',
        output: '/guards/auth.guard.ts',
        params: {}
      },
      /**
       * NGRX Reducers
       */
      {
        template: './shared/reducers/auth.ejs',
        output: '/reducers/auth.ts',
        params: {
          userModelName: getUserModelName()
        }
      },
      {
        template: './shared/reducers/index.ejs',
        output: '/reducers/index.ts',
        params: { models: Object.assign({}, ctx.models, throughModels), isNgrx: ctx.isNgrx }
      },
      {
        template: './shared/reducers/base.ejs',
        output: '/reducers/base.ts',
        params: {}
      },
      {
        template: './shared/reducers/baseThrough.ejs',
        output: '/reducers/baseThrough.ts',
        params: {}
      },
      /**
       * NGRX Resolvers
       */
      {
        template: './shared/resolvers/auth-account.ejs',
        output: '/resolvers/auth-account.ts',
        params: {
          userModelName: getUserModelName()
        }
      },
      {
        template: './shared/resolvers/index.ejs',
        output: '/resolvers/index.ts',
        params: {}
      }
    ])
  }
  if (ctx.isNgrx === 'orm') {
    /**
     * NGRX Orm
     */
    schema = schema.concat([
      {
        template: './shared/orm/orm.ejs',
        output: '/orm/orm.ts',
        params: {
          isIo: ctx.isIo,
          models: ctx.models
        }
      },
      {
        template: './shared/orm/filter.ejs',
        output: '/orm/filter.ts',
        params: {}
      },
      {
        template: './shared/orm/base.ejs',
        output: '/orm/base.ts',
        params: { isIo: ctx.isIo }
      },
      {
        template: './shared/orm/index.ejs',
        output: '/orm/index.ts',
        params: {}
      },
      {
        template: './shared/orm/models/index.ejs',
        output: '/orm/models/index.ts',
        params: { models: ctx.models }
      }
    ])
  }
  if (ctx.isNgrx === 'orm' && ctx.isIo === 'enabled') {
    schema = schema.concat([
      {
        template: './shared/orm/io.ejs',
        output: '/orm/io.ts',
        params: {}
      }
    ]);
  }
  /**
   * REALTIME MODULE SUPPORT
   */
  if (ctx.isIo === 'enabled') {
    // Add generic code to any environment
    schema = schema.concat([
      {
        template: './shared/sockets/connections.ts',
        output: '/sockets/socket.connections.ts',
        params: {}
      },
      {
        template: './shared/sockets/socket.driver.ts',
        output: '/sockets/socket.driver.ts',
        params: {}
      },
      {
        template: './shared/services/core/io.ejs',
        output: '/services/core/io.service.ts',
        params: {}
      },
      {
        template: './shared/services/core/realtime.ts',
        output: '/services/core/real.time.ts',
        params: {}
      },
      {
        template: './shared/models/fireloop.ejs',
        output: '/models/FireLoop.ts',
        params: {}
      },
      {
        template: './shared/models/flref.ts',
        output: '/models/FireLoopRef.ts',
        params: {}
      }
    ]);
    // Add Browser Specific Code
    if (ctx.driver.match(/ng2web|ng2universal/)) {
      schema.push({
        template: './shared/sockets/socket.browser.ts',
        output: '/sockets/socket.browser.ts',
        params: {}
      });
    }
    // Add Server Specific Code
    if (ctx.driver === 'ng2universal') {
      schema.push({
        template: './shared/sockets/socket.node.ts',
        output: '/sockets/socket.node.ts',
        params: {}
      });
    }
    // Add NativeScript Specific Code
    if (ctx.driver === 'ng2native') {
      schema.push({
        template: './shared/sockets/socket.native.ts',
        output: '/sockets/socket.native.ts',
        params: {}
      });
    }
  }
  /**
   * SDK DYNAMIC FILES
   */
  Object.keys(ctx.models).forEach(modelName => {
    if (ctx.models[modelName].sharedClass.ctor.settings.sdk &&
      !ctx.models[modelName].sharedClass.ctor.settings.sdk.enabled) {

      if (!ctx.quiet) {
        console.warn('LoopBack SDK Builder: %s model was ignored', modelName);
      }

      return;
    } else {

      if (!ctx.quiet) {
        console.info('LoopBack SDK Builder: adding %s model to SDK', modelName);
      }

      schema.push(
        /**
        * SDK MODELS
        */
        {
          template: './shared/models/model.ejs',
          output: '/models/' + capitalize(modelName) + '.ts',
          params: {
            model: ctx.models[modelName],
            modelName: modelName,
            plural: ctx.models[modelName].sharedClass.ctor.settings.plural
                  || ejs.filters.pluralize(modelName),
            path: ctx.models[modelName].sharedClass.ctor.settings.http
                  && ctx.models[modelName].sharedClass.ctor.settings.http.path
                  ? ctx.models[modelName].sharedClass.ctor.settings.http.path
                  : ctx.models[modelName].sharedClass.ctor.settings.plural,
            buildPropertyType: buildPropertyType,
            buildPropertyDefaultValue: buildPropertyDefaultValue,
            buildRelationType: buildRelationType,
            buildModelImports,
            buildModelProperties,
            capitalize
          }
        }
      );
      /**
      * SDK CUSTOM SERVICES
      */
      if (ctx.fireloopOnly === 'disabled' || (ctx.models[modelName].sharedClass.ctor.settings.base === 'User')) {
        schema.push({
          template: './shared/services/custom/service.ejs',
          output: '/services/custom/' + capitalize(modelName) + '.ts',
          params: {
            isIo: ctx.isIo,
            model: ctx.models[modelName],
            modelName: modelName,
            moduleName: ctx.moduleName,
            loadAccessToken: ctx.loadAccessToken,
            buildPostBody,
            buildUrlParams,
            buildRouteParams,
            buildMethodParams,
            buildPayloadParams,
            buildServiceDI,
            buildServiceImports,
            normalizeMethodName,
            buildObservableType,
            paramIsContext,
            paramIsFunction
          }
        });
      }
      /**
      * SDK NGRX ACTIONS, EFFECTS, REDUCERS, GUARDS, ORM
      */
      if (ctx.isNgrx === 'enabled' || ctx.isNgrx === 'orm') {
        schema.push({
          template: './shared/actions/model.ejs',
          output: '/actions/' + capitalize(modelName) + '.ts',
          params: {
            isIo: ctx.isIo,
            model: ctx.models[modelName],
            modelName: modelName,
            moduleName: ctx.moduleName,
            loadAccessToken: ctx.loadAccessToken,
            buildUrlParams,
            buildRouteParams,
            buildMethodParams,
            buildPayloadParams,
            buildPayloadParamsWithoutTypes,
            buildServiceDI,
            buildServiceImports,
            normalizeMethodName,
            upperCasedMethodName,
            buildObservableType,
            paramIsContext,
            paramIsFunction
          }
        });
        schema.push({
          template: './shared/effects/model.ejs',
          output: '/effects/' + capitalize(modelName) + '.ts',
          params: {
            isIo: ctx.isIo,
            model: ctx.models[modelName],
            modelName: modelName,
            moduleName: ctx.moduleName,
            loadAccessToken: ctx.loadAccessToken,
            buildUrlParams,
            buildRouteParams,
            buildMethodParams,
            buildMethodParamsFromPayload,
            buildServiceDI,
            buildServiceImports,
            normalizeMethodName,
            upperCasedMethodName,
            buildObservableType,
            paramIsContext,
            paramIsFunction,
            capitalize
          }
        });
        schema.push({
          template: './shared/reducers/model.ejs',
          output: '/reducers/' + capitalize(modelName) + '.ts',
          params: {
            isIo: ctx.isIo,
            model: ctx.models[modelName],
            modelName: modelName,
            moduleName: ctx.moduleName,
            loadAccessToken: ctx.loadAccessToken,
            buildUrlParams,
            buildRouteParams,
            buildMethodParams,
            buildMethodParamsFromPayload,
            buildServiceDI,
            buildServiceImports,
            normalizeMethodName,
            upperCasedMethodName,
            buildObservableType,
            paramIsContext,
            paramIsFunction
          }
        });
        schema.push({
          template: './shared/guards/model.ejs',
          output: '/guards/' + capitalize(modelName) + '.ts',
          params: {
            modelName: modelName
          }
        });
      }

      if (ctx.isNgrx === 'orm') {
        schema.push({
          template: './shared/orm/models/model.ejs',
          output: '/orm/models/' + capitalize(modelName) + '.ts',
          params: {
            isIo: ctx.isIo,
            model: ctx.models[modelName],
            modelName: modelName,
            moduleName: ctx.moduleName,
            loadAccessToken: ctx.loadAccessToken,
            buildUrlParams,
            buildRouteParams,
            buildMethodParams,
            buildPayloadParams,
            buildPayloadParamsWithoutTypes,
            buildServiceDI,
            buildServiceImports,
            normalizeMethodName,
            upperCasedMethodName,
            buildObservableType,
            paramIsContext,
            paramIsFunction
          }
        });
      }
    }
  });
  /**
   * THROUGH MODELS
   */
  if (ctx.isNgrx === 'orm') {
    Object.keys(throughModels).forEach(modelName => {
      schema.push(
        {
          template: './shared/models/throughModel.ejs',
          output: '/models/' + capitalize(modelName) + '.ts',
          params: {
            model: throughModels[modelName],
            modelName: modelName[0].toUpperCase() + modelName.slice(1)
          }
        }
      );
      schema.push({
        template: './shared/actions/throughModel.ejs',
        output: '/actions/' + capitalize(modelName) + '.ts',
        params: {
          modelName: modelName[0].toUpperCase() + modelName.slice(1)
        }
      });
      schema.push({
        template: './shared/reducers/throughModel.ejs',
        output: '/reducers/' + capitalize(modelName) + '.ts',
        params: {
          modelName: modelName[0].toUpperCase() + modelName.slice(1)
        }
      });
    });
  }
  /**
   * PROCESS SCHEMA
   */
  schema.forEach(
    config => {
      if (!ctx.quiet) {
        console.info('Generating: %s', `${ctx.outputFolder}${config.output}`);
      }

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
   * @method getUserModelName
   * @description
   * Discovers User model name
   */
  function getUserModelName() {
    let userModelName = '';
    Object.keys(ctx.models).forEach(modelName => {
      if (ctx.models[modelName].sharedClass.ctor.settings.base === 'User' ||
        ctx.models[modelName].sharedClass.ctor.settings.base === 'OAuthUser') {
        userModelName = modelName;
      }
    });
    return userModelName;
  }
  /**
   * @method buildModelImports
   * @description
   * Define import statement for those model who are related to other scopes
   */
  function buildModelImports(model) {
    let relations = getModelRelations(model);
    let loaded = {};
    let modelName = capitalize(model.name);
    loaded[modelName] = true;
    let output = [];
    if (relations.length > 0) {
      relations.forEach((relationName, i) => {
        let targetClass = model.sharedClass.ctor.relations[relationName].targetClass;
        if (!loaded[targetClass] && targetClass !== modelName) {
          loaded[targetClass] = true;
          output.push(`  ${targetClass}`);
        }
      });
    }
    // Add GeoPoint custom type import
    Object.keys(model.properties).forEach((property) => {
      var geoPointType = buildPropertyType(model.properties[property]);
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
    // Work around to fix a LoopBack update that won't provide
    // the password property anymore but is required for TypeScript purposes
    if (model.isUser && !model.properties.password) {
      model.properties.password = {
        type: String
      }
    }
    // Add Model Properties
    Object.keys(model.properties).forEach((propertyName) => {
      if (model.isUser && propertyName === 'credentials') return;
      let property = model.properties[propertyName];
      let isOptional = isInterface && !property.required ? '?' : '';
      let defaultValue = !isInterface ? ` = ${buildPropertyDefaultValue(property)}` : '';
      defaultValue = ctx.defaultValue !== 'enabled' && ctx.defaultValue !== 'strict' ? '' : defaultValue;
      defaultValue = ctx.defaultValue === 'strict' && !property.hasOwnProperty('default') ? '' : defaultValue;
      output.push(`  "${propertyName}"${isOptional}: ${buildPropertyType(property)}${defaultValue};`);
    });
    // Add Model Relations
    Object.keys(model.sharedClass.ctor.relations).forEach(relation => {
      let relationType = buildRelationType( model, relation );
      let defaultTypeValue = !isInterface && ctx.defaultValue === 'enabled' && relationType.indexOf('Array') >= 0 ? ' = []' : '';
      defaultTypeValue = !isInterface && ctx.defaultValue === 'enabled' && relationType.indexOf('Array') === -1 ? ' = null' : defaultTypeValue;
      output.push( `  ${relation}${isInterface ? '?' : ''}: ${relationType}${defaultTypeValue};` );
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
      ? basicType : `${basicType}[]`;
    return finalType;
  }
  /**
   * @method buildObservableType
   * @description
   * Define observable type
   */
  function buildObservableType(model, method) {
    let type = 'any';
    if (
      method.name.match(/(^createMany$|^find)/g) ||
      (
        typeof method.returns === 'object' &&
        (String(method.returns.type).toLowerCase() === 'array' || Array.isArray(method.returns.type))
      )
    ) type = `${model.name}[]`;
    if (method.name.match(/(^create$|upsert|^findBy|^findOne$)/g)) type = model.name;
    return type;
  }
  /**
   * @method buildServiceImports
   * @description
   * Define import statement for those model who are related to other scopes
   * IMPORTANT: This method have a very specific flow, changing it may create
   * multiple issues on multiple different use cases.
   */
  function buildServiceImports(model, loadAccessToken, isIo) {
    let modelName = capitalize(model.name);
    let imports = [
      { module: 'Injectable, Inject, Optional', from: '@angular/core'},
      { module: 'HttpClient, HttpResponse', from: '@angular/common/http'},
      { module: 'SDKModels', from: './SDKModels'},
      { module: 'BaseLoopBackApi', from: '../core/base.service'},
      { module: 'LoopBackConfig', from: '../../lb.config'},
      { module: 'LoopBackAuth', from: '../core/auth.service'},
      {
        module: `LoopBackFilter, ${model.isUser ? `SDKToken${ (loadAccessToken && model.isUser) ? ', AccessToken' : '' }` : '' }`,
        from: '../../models/BaseModels'
      },
      { module: 'ErrorHandler', from: '../core/error.service'},
      { module: 'Observable, Subject', from: 'rxjs'},
      { module: 'map', from: 'rxjs/operators' },
      { module: modelName, from: `../../models/${modelName}`},
    ];
    if (isIo === 'enabled') {
      imports.push({ module: 'SocketConnection', from: '../../sockets/socket.connections' });
    }
    let loaded = {}; loaded[modelName] = true;
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
        if (!loaded[through] && targetClass !== modelName) {
          loaded[through] = true;
          imports.push({ module: through, from: `../../models/${through}` });
        }
      }
      // Now and after the through model was included is the right time to verify if the current model
      // was loaded by another relationship, this way we don't duplicate the class during imports'
      if (!loaded[targetClass] && targetClass !== modelName) {
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
  function buildModuleImports(models, isIo, driver) {
    let imports = [
      { module: 'ErrorHandler', from: './services/core/error.service'},
      { module: 'LoopBackAuth', from: './services/core/auth.service'},
      { module: 'LoggerService', from: './services/custom/logger.service'},
      { module: 'SDKModels', from: './services/custom/SDKModels'},
      { module: 'InternalStorage, SDKStorage', from: './storage/storage.swaps'},
      { module: 'HttpClientModule', from: '@angular/common/http'},
      { module: 'CommonModule', from: '@angular/common'},
      { module: 'NgModule, ModuleWithProviders', from: '@angular/core'}
    ];

    switch (driver) {
      case 'ng2web':
        imports.push({ module: 'CookieBrowser', from: './storage/cookie.browser'});
        imports.push({ module: 'StorageBrowser', from: './storage/storage.browser'});
        if (isIo === 'enabled') {
          imports.push({ module: 'SocketBrowser', from: './sockets/socket.browser'});
        }
      break;
      case 'ng2universal':
        imports.push({ module: 'CookieBrowser', from: './storage/cookie.browser'});
        imports.push({ module: 'CookieNode', from: './storage/cookie.node'});
        imports.push({ module: 'StorageBrowser', from: './storage/storage.browser'});
          if (isIo === 'enabled') {
            imports.push({ module: 'SocketBrowser', from: './sockets/socket.browser'});
            imports.push({ module: 'SocketNode', from: './sockets/socket.node'});
          }
      break;
      case 'ng2native':
        imports.push({ module: 'StorageNative', from: './storage/storage.native'});
        imports.push({ module: 'NativeScriptHttpModule', from: 'nativescript-angular/http'});
          if (isIo === 'enabled') {
            imports.push({ module: 'SocketNative', from: './sockets/socket.native'});
          }
      break;
    }


    if (isIo === 'enabled') {
      imports = imports.concat([
        { module: 'SocketDriver', from: './sockets/socket.driver'},
        { module: 'SocketConnection', from: './sockets/socket.connections'},
        { module: 'RealTime', from: './services/core/real.time'}
      ]);
    }

    Object.keys(models).forEach(modelName => {
      let name = capitalize(modelName);
      imports.push({ module: `${name}Api`, from: `./services/custom/${name}` });
    });

    return buildImports(imports);
  }
  /**
   * @method buildNgModuleImports
   * @description
   * Define import statement for the SDK NG Modules
   */
  function buildNgModuleImports(models, environment, isIo, driver) {
    let imports = ['LoopBackAuth', 'LoggerService', 'SDKModels'];
    if (isIo === 'enabled') { imports.push('RealTime'); }
    Object.keys(models).forEach(modelName => imports.push(`${ capitalize(modelName) }Api`));
    switch (environment) {
      case 'browser':
        if (driver === 'ng2web' || driver === 'ng2universal') {
          imports.push('internalStorageProvider');
          imports.push('{ provide: SDKStorage, useClass: StorageBrowser }');
          if (isIo === 'enabled') {
            imports.push('{ provide: SocketDriver, useClass: SocketBrowser }');
          }
        }
      break;
      case 'node':
        if (driver === 'ng2universal') {
          imports.push('{ provide: InternalStorage, useClass: CookieNode }');
          if (isIo === 'enabled') {
            imports.push('{ provide: SocketDriver, useClass: SocketNode }');
          }
        }
      break;
      case 'nativescript':
        if (driver === 'ng2native') {
          imports.push('{ provide: InternalStorage, useClass: StorageNative }');
          imports.push('{ provide: SDKStorage, useClass: StorageNative }');
          if (isIo === 'enabled') {
            imports.push('{ provide: SocketDriver, useClass: SocketNative }');
          }
        }
      break;
    }
    return imports.join(',\n        ');
  }
  /**
   * @method buildNgProviders
   * @description
   * Define import statement for the SDK NG Modules
   */
  function buildNgProviders(isIo) {
    let imports = ['ErrorHandler'];
    if (isIo === 'enabled') { imports.push('SocketConnection'); }
    return imports.join(',\n    ');
  }
  /**
   * @method buildServiceDI
   * @description
   * Define import statement for the SDK NG Modules
   */
  function buildServiceDI(isIo) {
    let dependencies = ['@Inject(HttpClient) protected http: HttpClient'];
    if (isIo === 'enabled') {
        dependencies.push('@Inject(SocketConnection) protected connection: SocketConnection');
    }
    dependencies = dependencies.concat([
      '@Inject(SDKModels) protected models: SDKModels',
      '@Inject(LoopBackAuth) protected auth: LoopBackAuth',
      '@Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler'
    ])
    return dependencies.join(',\n    ');
  }
  /**
   * @method buildBaseServiceImports
   * @description
   * Define import statement for the SDK Module
   **/
  function buildBaseServiceImports(isIo) {
    let imports = [
      { module: 'Injectable, Inject, Optional', from: '@angular/core'},
      { module: 'HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse, HttpParameterCodec', from: '@angular/common/http'},
      { module: 'NgModule, ModuleWithProviders', from: '@angular/core'},
      { module: 'ErrorHandler', from: './error.service'},
      { module: 'LoopBackAuth', from: './auth.service'},
      { module: 'LoopBackConfig', from: '../../lb.config'},
      { module: 'LoopBackFilter, AccessToken', from: '../../models/BaseModels'},
      { module: 'SDKModels', from: '../custom/SDKModels'},
      { module: 'Observable, Subject', from: 'rxjs' },
      { module: 'catchError, map, filter', from: 'rxjs/operators' },
    ];

    if (isIo === 'enabled') {
      imports.push({ module: 'SocketConnection', from: '../../sockets/socket.connections'});
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
   * @method upperCasedMethodName
   * @description
   * Upper cases method name from loopback form to a more human readable form
   */
  function upperCasedMethodName(methodName) {
    return methodName.split('__').filter((value) => value !== '').map((value, index) => {
      if (index === 0) {
        return value.split(/(?=[A-Z])/).map((value) => value.toUpperCase()).join('_');
      } else {
        return value.toUpperCase();
      }
    }).join('_');
  }
  /**
   * @method buildMethodParams
   * @description
   * Set which params should be defined for the given remote method
   */
  function buildMethodParams(model, methodName, params, isIo) {
    //if (model.isUser && methodName === 'logout') return '';
    let output = new Array();
    let relations = getModelRelations(model);
    let availableClasses = relations.map((relationName, index) =>
      model.sharedClass.ctor.relations[relationName].targetClass
    );

    params = params.filter(param => {
      return !paramIsContext(param) && !paramIsFunction(param)
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
      let type, isArray = false;
      if (param.type === 'object') {
        type = param.arg === 'filter' ? 'LoopBackFilter' : 'any';
      } else {
        type = param.type !== 'AccessToken' && param.type !== 'any' && param.type !== undefined
          ? capitalize(param.type) : 'any';
      }
      if (!type.match(/(^any$|LoopBackFilter)/) && availableClasses.indexOf(type) < 0) {
        type = 'any';
      }
      let value = '';
      // Accept Array on createMany method.
      if (methodName.match(/createMany/) && param.arg === 'data') {
        isArray = true;
      }
      // Set default value, usually will be {}, but on login we include user
      // Should not be undefined or will create request issues
      if (!param.required && (model.isUser && methodName === 'login') && param.arg === 'include') {
        type = 'any';
        value = " = 'user'";
      } else if (type.match(/(any|LoopBackFilter)/)) {
        value = !param.required ? ` = ${ isArray ? '[]' : '{}' }`: '';
      } else {
        value = !param.required ? ` = ${ isArray ? `new Array<${type}>()` : `new ${type}()` }`: '';
      }
      output.push(`${param.arg}: ${type}${ isArray ? '[]' : '' }${value}`);
    });

    // When login, there is a property not coming from LoopBack that is needed.
    // so we need to add a rememberMe property to temporal o permanent store the user
    if ((model.isUser && methodName === 'login')) {
      output.push(`rememberMe: boolean = true`);
    }

    // When login, there is a property not coming from LoopBack that is needed.
    // so we need to add a rememberMe property to temporal o permanent store the user
    // UPDATE: it seems it is now coming from loopback, so now is duplicated
    /*if ((model.isUser && methodName === 'login')) {
      output.push(`rememberMe: boolean = true`);
    }*/

    if (!isIo) {
        output.push(`customHeaders?: Function`);
    }
    return output.join(', ');
  }
  /**
   * @method buildPayloadParams
   * @description
   * Set which params should be defined for the given remote method
   */
  function buildPayloadParams(model, methodName, params, isIo) {
    if (model.isUser && methodName === 'logout') return '';
    let output = new Array();
    let relations = getModelRelations(model);
    let availableClasses = relations.map((relationName, index) =>
      model.sharedClass.ctor.relations[relationName].targetClass
    );

    params = params.filter(param => {
      return !paramIsContext(param) && !paramIsFunction(param)
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
      let type, isArray = false;
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
        isArray = true;
      }
      output.push(`${param.arg}: ${type}${ isArray ? '[]' : '' }${value}`);
    });
    if (!isIo) {
      output.push(`customHeaders`);
    }
    return output.join(', ');
  }
  /**
   * @method buildPayloadParamsWithoutTypes
   * @description
   * Set which params should be defined for the given remote method
   */
  function buildPayloadParamsWithoutTypes(model, methodName, params, isIo) {
    if (model.isUser && methodName === 'logout') return '';
    let output = new Array();
    let relations = getModelRelations(model);
    let availableClasses = relations.map((relationName, index) =>
      model.sharedClass.ctor.relations[relationName].targetClass
    );

    params = params.filter(param => {
      return !paramIsContext(param) && !paramIsFunction(param)
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
      output.push(`${param.arg}`);
    });
    if (!isIo) {
      output.push(`customHeaders`);
    }
    return output.join(', ');
  }
  /**
   * @method buildMethodParamsFromPayload
   * @description
   * Set which params should be defined for the given remote method from the given payload
   */
  function buildMethodParamsFromPayload(model, methodName, params, isIo) {
    if (model.isUser && methodName === 'logout') return '';
    let output = new Array();
    let relations = getModelRelations(model);
    let availableClasses = relations.map((relationName, index) =>
      model.sharedClass.ctor.relations[relationName].targetClass
    );

    params = params.filter(param => {
      return !paramIsContext(param) && !paramIsFunction(param)
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
      output.push(`action.payload.${param.arg}`);
    });
    return output.join(', ');
  }
  /**
   * @method paramIsRoute
   * @description
   * Testing if the param is route type
   */
  function paramIsRoute(param) {
    return (param.http && param.http.source === 'path') || (param.arg && param.arg.match(/(^id$|fk|^file$|container)/));
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
   * @method paramIsBody
   * @description
   * Testing if the param is a http.body or form
   */
  function paramIsBody(param) {
    return (typeof param.http !== 'undefined' && typeof param.http.source !== 'undefined' && (param.http.source == 'body' || param.http.source == 'form'));
  }
  /**
   * @method paramIsQuery
   * @description
   * Testing if the param is a http.query or form
   */
  function paramIsQuery(param) {
    return (
      (
        typeof param.http === 'undefined' && // Query is default, if http is not defined we treat it as query param
        (param.arg && !param.arg.match(/(^id$|fk|^file$|container)/)) // But only if it is not id, fk, file or container
      )
      ||
      (
        typeof param.http !== 'undefined' && typeof param.http.source !== 'undefined' && param.http.source == 'query'
      )
    );
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
        if (paramIsRoute(param) || paramIsFunction(param) || paramIsContext(param) || paramIsQuery(param)) {
          return false
        }
        // Make sure the param is body or form data
        return paramIsBody(param);
      })
      if (postData.length > 0) {
        output.push('');
        let l = postData.length;
        let formData = [];
        postData.forEach((property, i) => {
          if (property.http.source == 'form') {
            formData.push(property);
          } else {
            output.push(`      ${property.arg}: ${property.arg}${(i < l - 1) ? ',' : ''}`);
          }
        });
        if (formData.length > 0){
          l = formData.length
          output.push(`      data: {`);
          formData.forEach((property, i) => {
            output.push(`        ${property.arg}: ${property.arg}${(i < l - 1) ? ',' : ''}`);
          })
          output.push(`      }`);
        }
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
        if (paramIsRoute(param) || paramIsFunction(param) || paramIsContext(param) || paramIsBody(param)) {
          return false
        }
        // Filter out body params
        return paramIsQuery(param);
    });
    if (model.isUser && methodName === 'logout')
      output.push(`       _urlParams.access_token = this.auth.getAccessTokenId();`);
    if (urlParams && urlParams.length > 0) {
      urlParams.forEach((param, i) => {
        output.push(`    if (typeof ${param.arg} !== 'undefined' && ${param.arg} !== null) _urlParams.${param.arg} = ${param.arg};`);
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
      routeParams = routeParams.filter((param) => {
        if (paramIsQuery(param) || paramIsFunction(param) || paramIsContext(param) || paramIsBody(param)) {
          return false
        }
        return paramIsRoute(param)
      });
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
   * @license MIT
   * @method buildPropertyType
   * @description
   * Define which properties should be passed as route params
   */
  function buildPropertyType(property) {
    if (!property || !property.type) {
      return 'any';
    }
    switch (typeof property.type) {
      case 'function':
        switch(property.type.name) {
          case 'String':
          case 'Number':
          case 'Boolean':
            return property.type.name.toLowerCase();
          case 'Date':
          case 'GeoPoint':
            return property.type.name;
          default:
            return 'any';
        }
      case 'object':
        if(Array.isArray(property.type)) {
            return `Array<${buildPropertyType(property.type[0])}>`
        }
        return 'object';
      default:
        return 'any';
    }
  }
  /*
   * @author Julien Ledun <j.ledun@iosystems.fr>,
   * @license MIT
   * @method buildPropertyDefaultValue
   * @description
   * Define defaults null values for class properties
   */
  function buildPropertyDefaultValue(property) {
    let defaultValue = ( property.hasOwnProperty('default') ) ? property.default : '';
    switch (typeof property.type) {
      case 'function':
        switch(property.type.name) {
          case 'String':
            return `'${defaultValue}'`;
          case 'Number':
            return isNaN( Number(defaultValue) ) ? 0 : Number( defaultValue );
          case 'Boolean':
            return Boolean( defaultValue );
          case 'Date':
            return isNaN( Date.parse( defaultValue ) ) ? `new Date(0)` : `new Date('${defaultValue}')`;
          case 'GeoPoint':
          default:
            return "<any>null";
      }
      case 'object':
        if(Array.isArray(property.type)) {
          return "<any>[]";
        }
        return "<any>null";
      default:
        return "<any>null";
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
