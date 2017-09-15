var path = require('path');
var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
var fs = require('fs');
var ejs = require('ejs');
/**
 * EJS Q Filter
 * Deprecated in EJS 2 :(
 */
ejs.filters.q = (obj) => JSON.stringify(obj, null, 2);
ejs.filters.pluralize = (text) => _.pluralize(text);
/**
 * @author Andres Jimenez <andresdavid@outlook.com>
 * @license MIT 
 * @description
 * Common Helpers Service for build SDK in Angular and React 
 * 
 **/
  /**
   * Directory Management
   */
 exports.prepareDirectories = (ctx) => {

  ctx.outputFolder = path.resolve(ctx.outputFolder);
  
  if (!ctx.quiet) {
    console.log('Removing base directory %s', ctx.outputFolder);
  }
  
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
  
  if (!ctx.quiet) {
    console.log(ctx.driver);
    console.log('DRIVER: ', ctx.driver);
  }
 }

 exports.buildSquema = (ctx) => {
  let schema = [
    /**
     * SDK INDEXES
     */
    {
      template: './shared/index.ejs',
      output: `/index.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isIo: ctx.isIo,
        models: ctx.models,
        driver: ctx.driver,
        isTyped: ctx.isTyped,
        buildModuleImports,
        buildNgModuleImports,
        buildNgProviders
      }
    },
    {
      template: './shared/models/index.ejs',
      output: `/models/index.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isIo: ctx.isIo,
        isTyped: ctx.isTyped,
        models: ctx.models
      }
    },
    {
      template: './shared/services/index.ejs',
      output: `/services/index.${ctx.isTyped ? 't': 'j'}s`,
      params: {}
    },
    {
      template: './shared/services/custom/index.ejs',
      output: `/services/custom/index.${ctx.isTyped ? 't': 'j'}s`,
      params: { models: ctx.models }
    },
    {
      template: './shared/services/core/index.ejs',
      output: `/services/core/index.${ctx.isTyped ? 't': 'j'}s`,
      params: { isIo: ctx.isIo }
    },
    /**
     * MODEL LIST SERVICES
     */
    {
      template: './shared/services/custom/models.ejs',
      output: `/services/custom/SDKModels.${ctx.isTyped ? 't': 'j'}s`,
      params: { 
        models: ctx.models,
        isTyped: ctx.isTyped
      }
    },
    /**
     * SDK CONFIG
     */
    {
      template: './shared/config.ejs',
      output: `/lb.config.${ctx.isTyped ? 't': 'j'}s`,
      params: { 
        app: ctx.app,
        isTyped: ctx.isTyped
      }
    },
    /**
     * SDK STATIC BASE AND CORE FILES
     */
    {
      template: './shared/models/base.ejs',
      output: `/models/BaseModels.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        loadAccessToken: ctx.loadAccessToken,
        buildServiceDI }
    },
    {
      template: './shared/services/core/auth.ejs',
      output: `/services/core/auth.service.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        loadAccessToken: ctx.loadAccessToken
      }
    },
    {
      template: './shared/services/core/base.ejs',
      output: `/services/core/base.service.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isIo: ctx.isIo,
        isTyped: ctx.isTyped,
        buildServiceDI,
        buildBaseServiceImports
      }
    },
    {
      template: './shared/services/core/error.ejs',
      output: `/services/core/error.service.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isTyped: ctx.isTyped
      }
    },
    {
      template: './shared/services/core/logger.ejs',
      output: `/services/custom/logger.service.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isTyped: ctx.isTyped
      }
    },
    {
      template: './shared/services/core/search.ejs',
      output: `/services/core/search.params.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isTyped: ctx.isTyped
      }
    },
    /**
     * STORAGE
     */
    {
      template: './shared/storage/storage.swaps.ejs',
      output: `/storage/storage.swaps.${ctx.isTyped ? 't': 'j'}s`,
      params: {
        isTyped: ctx.isTyped
      }
    }
  ];
  // Add Browser Specific Code
  if (ctx.driver.match(/ng2web|ng2universal/)) {
    schema.push({
      template: './shared/storage/cookie.browser.ts',
      output: `/storage/cookie.browser.${ctx.isTyped ? 't': 'j'}s`,
      params: {}
    });
    schema.push({
      template: './shared/storage/storage.browser.ts',
      output: `/storage/storage.browser.${ctx.isTyped ? 't': 'j'}s`,
      params: {}
    });
  }
  // Add Server Specific Code
  if (ctx.driver === 'ng2universal') {
    schema.push({
      template: './shared/storage/cookie.node.ts',
      output: `/storage/cookie.node.${ctx.isTyped ? 't': 'j'}s`,
      params: {}
    });
  }
  // Add NativeScript Specific Code
  if (ctx.driver === 'ng2native') {
    schema.push({
      template: './shared/storage/storage.native.ts',
      output: `/storage/storage.native.${ctx.isTyped ? 't': 'j'}s`,
      params: {}
    });
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
          output: `/models/${modelName}.${ctx.isTyped ? 't': 'j'}s`,
          params: {
            isTyped: ctx.isTyped,
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
            buildModelProperties
          }
        }
      );
      /**
      * SDK CUSTOM SERVICES
      */
      if (ctx.fireloopOnly === 'disabled' || (ctx.models[modelName].sharedClass.ctor.settings.base === 'User')) {
        schema.push({
          template: './shared/services/custom/service.ejs',
          output: `/services/custom/${modelName}.${ctx.isTyped ? 't': 'j'}s`,
          params: {
            isIo: ctx.isIo,
            isTyped: ctx.isTyped,
            model: ctx.models[modelName],
            modelName: modelName,
            moduleName: ctx.moduleName,
            loadAccessToken: ctx.loadAccessToken,
            buildPostBody,
            buildUrlParams,
            buildRouteParams,
            buildMethodParams,
            buildServiceDI,
            buildServiceImports,
            normalizeMethodName,
            buildObservableType,
            paramIsContext,
            paramIsFunction
          }
        });
      }
    }
  });
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
}

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
function buildModelProperties(model, isInterface, isTyped) {
  let output = [];
  // Work around to fix a LoopBack update that won't provide
  // the password property anymore but is required for TypeScript purposes
  if (model.isUser && !model.properties.password) {
    model.properties.password = {
      type: model.properties.username.type
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
    output.push(`  "${propertyName}"${isOptional}${ isTyped ? ':' + buildPropertyType(property) + {defaultValue} +';' : ';'}`);
  });
  // Add Model Relations
  Object.keys(model.sharedClass.ctor.relations).forEach(relation => {
    let relationType = buildRelationType( model, relation );
    let defaultTypeValue = !isInterface && ctx.defaultValue === 'enabled' && relationType.indexOf('Array') >= 0 ? ' = []' : '';
    defaultTypeValue = !isInterface && ctx.defaultValue === 'enabled' && relationType.indexOf('Array') === -1 ? ' = null' : defaultTypeValue;
    output.push( `  ${relation}${isInterface ? '?' : ''}${ isTyped ? ':' + relationType + defaultTypeValue + ';' : ';' }`);
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

module.exports.buildModelImports = buildModelImports;
module.exports.buildModelProperties = buildModelProperties;
module.exports.buildRelationType = buildRelationType;
module.exports.buildObservableType = buildObservableType;