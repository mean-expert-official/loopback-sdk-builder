const path = require('path');
const mkdirp = require('mkdirp');
const rmdir = require('rimraf');
const fs = require('fs');
const ejs = require('ejs');
const builders = {
  react: require('./../react/react-builders'),
  angular: require('./../react/react-builders')
}
let ctx;

var _ = require('underscore');
_.mixin(require('underscore.inflections'));
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

/**
 * @method paramIsContext
 * @description
 * Testing if the param is a http.context
 */
function paramIsContext(param) {
  return (typeof param.http !== 'undefined' && typeof param.http.source !== 'undefined' && param.http.source === 'context');
}

/**
 * @method paramIsFunction
 * @description
 * Testing if the param is function type
 */
function paramIsFunction(param) {
  return typeof param.http === 'function'
}

function getModelRelations(model) {
  return Object.keys(model.sharedClass.ctor.relations).filter(relationName =>
    model.sharedClass.ctor.relations[relationName].targetClass &&
    model.sharedClass.ctor.relations[relationName].targetClass !== model.name
  );
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
 * @method paramIsBody
 * @description
 * Testing if the param is a http.body or form
 */
function paramIsBody(param) {
  return (typeof param.http !== 'undefined' && typeof param.http.source !== 'undefined' && (param.http.source == 'body' ||  param.http.source == 'form'));
}

/**
 * @method paramIsRoute
 * @description
 * Testing if the param is route type
 */
function paramIsRoute(param) {
  return (param.http && param.http.source === 'path') || (param.arg && param.arg.match(/(^id$|fk|^file$|container)/));
}

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
  ctx = ctx;
  let schema = [
    /**
     * SDK INDEXES
     */
    {
      template: './../templates/shared/index.ejs',
      output: `/index.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isIo: ctx.isIo,
        framework: ctx.framework,
        models: ctx.models,
        driver: ctx.driver,
        isTyped: ctx.isTyped,
        buildModuleImports: builders[ctx.framework].buildModuleImports,
        buildNgModuleImports: builders[ctx.framework].buildNgModuleImports,
        buildNgProviders: builders[ctx.framework].buildNgProviders,
      }
    },
    {
      template: './../templates/shared/models/index.ejs',
      output: `/models/index.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isIo: ctx.isIo,
        isTyped: ctx.isTyped,
        models: ctx.models
      }
    },
    {
      template: './../templates/shared/services/index.ejs',
      output: `/services/index.${ctx.isTyped ? 't' : 'j'}s`,
      params: {}
    },
    {
      template: './../templates/shared/services/custom/index.ejs',
      output: `/services/custom/index.${ctx.isTyped ? 't' : 'j'}s`,
      params: { models: ctx.models }
    },
    {
      template: './../templates/shared/services/core/index.ejs',
      output: `/services/core/index.${ctx.isTyped ? 't' : 'j'}s`,
      params: { isIo: ctx.isIo }
    },
    /**
     * MODEL LIST SERVICES
     */
    {
      template: './../templates/shared/services/custom/models.ejs',
      output: `/services/custom/SDKModels.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        models: ctx.models,
        isTyped: ctx.isTyped,
        framework: ctx.framework
      }
    },
    /**
     * SDK CONFIG
     */
    {
      template: './../templates/shared/config.ejs',
      output: `/lb.config.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        app: ctx.app,
        isTyped: ctx.isTyped
      }
    },
    /**
     * SDK STATIC BASE AND CORE FILES
     */
    {
      template: './../templates/shared/models/base.ejs',
      output: `/models/BaseModels.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        loadAccessToken: ctx.loadAccessToken,
        // buildServiceDI: ctx.framework === 'react' ? reactBuilder.buildServiceDI : false
      }
    },
    {
      template: './../templates/shared/services/core/auth.ejs',
      output: `/services/core/auth.service.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        framework: ctx.framework,
        // loadAccessToken: ctx.loadAccessToken
      }
    },
    {
      template: './../templates/shared/services/core/base.ejs',
      output: `/services/core/base.service.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isIo: ctx.isIo,
        isTyped: ctx.isTyped,
        framework: ctx.framework,
        buildServiceDI: builders[ctx.framework].buildServiceDI,
        buildBaseServiceImports: builders[ctx.framework].buildBaseServiceImports
      }
    },
    {
      template: './../templates/shared/services/core/error.ejs',
      output: `/services/core/error.service.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        framework: ctx.framework
      }
    },
    {
      template: './../templates/shared/services/core/logger.ejs',
      output: `/services/custom/logger.service.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        framework: ctx.framework
      }
    },
    {
      template: './../templates/shared/services/core/search.ejs',
      output: `/services/core/search.params.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        framework: ctx.framework
      }
    },
    /**
     * STORAGE
     */
    {
      template: './../templates/shared/storage/storage.swaps.ejs',
      output: `/storage/storage.swaps.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped
      }
    }
  ];
  // Add Browser Specific Code
  if (ctx.driver.match(/ng2web|ng2universal/)) {
    schema.push({
      template: './../templates/shared/storage/cookie.browser.ejs',
      output: `/storage/cookie.browser.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        framework: ctx.framework
      }
    });
    schema.push({
      template: './../templates/shared/storage/storage.browser.ejs',
      output: `/storage/storage.browser.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        framework: ctx.framework
      }
    });
  }
  // Add Server Specific Code
  if (ctx.driver === 'ng2universal') {
    schema.push({
      template: './../templates/shared/storage/cookie.node.ts',
      output: `/storage/cookie.node.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        framework: ctx.framework
      }
    });
  }
  // Add NativeScript Specific Code
  if (ctx.driver === 'ng2native' && ctx.framework !== 'react') {
    schema.push({
      template: './../templates/shared/storage/storage.native.ejs',
      output: `/storage/storage.native.${ctx.isTyped ? 't' : 'j'}s`,
      params: {
        isTyped: ctx.isTyped,
        framework: ctx.framework
      }
    });
  }
  /**
   * REALTIME MODULE SUPPORT
   */
  if (ctx.isIo === 'enabled') {
    // Add generic code to any environment
    schema = schema.concat([
      {
        template: './../templates/shared/sockets/connections.ts',
        output: '/sockets/socket.connections.ts',
        params: {}
      },
      {
        template: './../templates/shared/sockets/socket.driver.ts',
        output: '/sockets/socket.driver.ts',
        params: {}
      },
      {
        template: './../templates/shared/services/core/io.ejs',
        output: '/services/core/io.service.ts',
        params: {}
      },
      {
        template: './../templates/shared/services/core/realtime.ts',
        output: '/services/core/real.time.ts',
        params: {}
      },
      {
        template: './../templates/shared/models/fireloop.ejs',
        output: '/models/FireLoop.ts',
        params: {}
      },
      {
        template: './../templates/shared/models/flref.ts',
        output: '/models/FireLoopRef.ts',
        params: {}
      }
    ]);
    // Add Browser Specific Code
    if (ctx.driver.match(/ng2web|ng2universal/)) {
      schema.push({
        template: './../templates/shared/sockets/socket.browser.ts',
        output: '/sockets/socket.browser.ts',
        params: {}
      });
    }
    // Add Server Specific Code
    if (ctx.driver === 'ng2universal') {
      schema.push({
        template: './../templates/shared/sockets/socket.node.ts',
        output: '/sockets/socket.node.ts',
        params: {}
      });
    }
    // Add NativeScript Specific Code
    if (ctx.driver === 'ng2native') {
      schema.push({
        template: './../templates/shared/sockets/socket.native.ts',
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
          template: './../templates/shared/models/model.ejs',
          output: `/models/${modelName}.${ctx.isTyped ? 't' : 'j'}s`,
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
      if (ctx.fireloopOnly === 'disabled' ||  (ctx.models[modelName].sharedClass.ctor.settings.base === 'User')) {
        schema.push({
          template: './../templates/shared/services/custom/service.ejs',
          output: `/services/custom/${modelName}.${ctx.isTyped ? 't' : 'j'}s`,
          params: {
            framework: ctx.framework,
            models: ctx.models,
            isIo: ctx.isIo,
            isTyped: ctx.isTyped,
            model: ctx.models[modelName],
            modelName: modelName,
            moduleName: ctx.moduleName,
            loadAccessToken: ctx.loadAccessToken,
            buildPostBody,
            buildUrlParams,
            buildRouteParams,
            buildMethodParams: builders[ctx.framework].buildMethodParams,
            buildServiceDI: builders[ctx.framework].buildServiceDI,
            buildServiceImports: builders[ctx.framework].buildServiceImports,
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

  /**
   * @author João Ribeiro <jonnybgod@gmail.com, http://jonnybgod.ghost.io>,
   * @license MIT
   * @method buildPropertyType
   * @description
   * Define which properties should be passed as route params
   */
  function buildPropertyType(property) {
    if (!property ||  !property.type) {
      return 'any';
    }
    switch (typeof property.type) {
      case 'function':
        switch (property.type.name) {
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
        if (Array.isArray(property.type)) {
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
  function buildPropertyDefaultValue(property, isTyped) {
    let defaultValue = (property.hasOwnProperty('default')) ? property.default : '';
    switch (typeof property.type) {
      case 'function':
        switch (property.type.name) {
          case 'String':
            return `'${defaultValue}'`;
          case 'Number':
            return isNaN(Number(defaultValue)) ? 0 : Number(defaultValue);
          case 'Boolean':
            return Boolean(defaultValue);
          case 'Date':
            return isNaN(Date.parse(defaultValue)) ? `new Date(0)` : `new Date('${defaultValue}')`;
          case 'GeoPoint':
          default:
            return isTyped ? "<any>null" : "null";
        }
      case 'object':
        if (Array.isArray(property.type)) {
          return isTyped ? "<any>[]" : "[]";
        }
        return isTyped ? "<any>null" : "null";
      default:
        return isTyped ? "<any>null" : "null";
    }
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
      if (hasGeoPointType) {
        output.push('  GeoPoint');
      }
    });
    if (output.length > 0) {
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
      output.push(`  "${propertyName}"${isOptional}${isTyped ? ':' + buildPropertyType(property) + { defaultValue } + ';' : ';'}`);
    });
    // Add Model Relations
    Object.keys(model.sharedClass.ctor.relations).forEach(relation => {
      let relationType = buildRelationType(model, relation);
      let defaultTypeValue = !isInterface && ctx.defaultValue === 'enabled' && relationType.indexOf('Array') >= 0 ? ' = []' : '';
      defaultTypeValue = !isInterface && ctx.defaultValue === 'enabled' && relationType.indexOf('Array') === -1 ? ' = null' : defaultTypeValue;
      output.push(`  ${relation}${isInterface ? '?' : ''}${isTyped ? ':' + relationType + defaultTypeValue + ';' : ';'}`);
    });
    return output.join('\n');
  }

  function getModelRelations(model) {
    return Object.keys(model.sharedClass.ctor.relations).filter(relationName =>
      model.sharedClass.ctor.relations[relationName].targetClass &&
      model.sharedClass.ctor.relations[relationName].targetClass !== model.name
    );
  }

  function buildPostBody(postData) {
    let output = [];
    if (Array.isArray(postData)) {
      postData = postData.filter(param => {
        // Filter out route params and function params
        if (paramIsRoute(param) || paramIsFunction(param) ||  paramIsContext(param) ||  paramIsQuery(param)) {
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
        if (formData.length > 0) {
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
        (String(method.returns.type).toLowerCase() === 'array' ||  Array.isArray(method.returns.type))
      )
    ) type = `${model.name}[]`;
    if (method.name.match(/(^create$|upsert|^findBy|^findOne$)/g)) type = model.name;
    return type;
  }

  module.exports = {
    buildPropertyType,
    buildPropertyDefaultValue,
    buildRelationType,
    buildModelImports,
    buildModelProperties,
    // getModelRelations,
    buildPostBody,
    buildUrlParams,
    buildRouteParams,
    normalizeMethodName,
    buildObservableType,
    // paramIsContext,
    // paramIsFunction
  }
}

/**
 * @method buildImportsbuildNgModuleImports
 * @description
 * Transform an array of objects describing which should be imported into
 * the actual template strings
 */
exports.buildImports = (imports) => {
  return imports.map(item =>
    `import ${(item.from ? `{ ${item.module} }` : `'${item.module}'`)}${(item.from ? ` from '${item.from}'` : '')};`
  ).join('\n');
}

exports.capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}

module.exports.getModelRelations = getModelRelations;
module.exports.paramIsContext = paramIsContext;
module.exports.paramIsFunction = paramIsFunction;
module.exports.paramIsQuery = paramIsQuery;
module.exports.paramIsBody = paramIsBody;
module.exports.paramIsRoute = paramIsRoute;