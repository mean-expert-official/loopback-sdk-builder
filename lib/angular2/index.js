/**
 * @module Angular 2 Generator for loopback-sdk-builder
 * @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
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
        models: ctx.models
      }
    },
    {
      template: './shared/models/index.ejs',
      output: '/models/index.ts',
      params: { models: ctx.models }
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
      params: {}
    },
    /**
     * SDK CONFIG
     */
    {
      template: './shared/config.ejs',
      output: '/lb.config.ts',
      params: {}
    },
    /**
     * SDK STATIC BASE AND CORE FILES
     */
    {
      template: './shared/models/base.ejs',
      output: '/models/BaseModels.ts',
      params: { loadAccessToken: (ctx.models.AccessToken ? true : false) }
    },
    {
      template: './shared/services/core/auth.ejs',
      output: '/services/core/auth.service.ts',
      params: {}
    },
    {
      template: './shared/services/core/base.ejs',
      output: '/services/core/base.service.ts',
      params: { isIo: ctx.isIo }
    },
    {
      template: './shared/services/core/error.ejs',
      output: '/services/core/error.service.ts',
      params: {}
    },
    {
      template: './shared/services/core/logger.ejs',
      output: '/services/core/logger.service.ts',
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
            models: ctx.models,
            modelName: modelName,
            getModelType: getModelType,
            getPropertyType: getPropertyType,
            getModelImports: getModelImports
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
            buildUrlParams: buildUrlParams
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
   * @method getPropertyType
   * @description
   * Discovers property type according related models that are public
   */
  function getPropertyType(model, relationName) {
    let relation = model.sharedClass.ctor.relations[relationName];
    let targetClass = relation.targetClass;
    let basicType = (ctx.models[targetClass]) ? targetClass : 'any';
    let finalType = relation.type.match(/(^has$|belongsTo)/g)
      ? basicType : `Array<${basicType}>`;
    return finalType;
  }
  /**
   * @method getModelImports
   * @description
   * Define import statement for those model who are related to other scopes
   */
  function getModelImports(model) {
    let relations = Object.keys(model.sharedClass.ctor.relations).filter(
      relationName => model.sharedClass.ctor.relations[relationName].targetClass
    );
    let loaded = {};
    let output = new String();
    if (relations.length > 0) {
      output = 'import {';
      relations.forEach((relationName, i) => {
        let targetClass = model.sharedClass.ctor.relations[relationName].targetClass;
        if (!loaded[targetClass]) {
          loaded[targetClass] = true;
          output = `${output}\n  ${targetClass}`;
          output = (i < relations.length - 1) ? `${output},` : output
        }
      });
      output = `${output}
} from '../index';`;
    }
    return output;
  }
  /**
   * @method buildPostBody
   * @description
   * Define which properties should be passed while using post method
   */
  function buildPostBody(postData) {
    let output = new String();
    if (postData && postData.length > 0) {
      postData.forEach((property, i) => {
        output = `${output}\n      ${property.arg}: ${property.arg}`;
        output = (i < postData.length - 1) ? `${output},` : `${output}\n    `;
      });
    }
    return output;
  }
  /**
   * @method buildUrlParams
   * @description
   * Define which properties should be passed while using post method
   */
  function buildUrlParams(model, methodName, urlParams) {
    let output = new String();
    // filter params that should not go over url query string
    urlParams = urlParams.filter(param => !param.arg.match(/(id|fk|data|options)/g));
    if (model.isUser && methodName === 'logout')
    output = `${output}\n      access_token: this.auth.getAccessTokenId(),`;
    if (urlParams && urlParams.length > 0) {
      urlParams.forEach((param, i) => {
          output = `${output}\n      ${param.arg}: ${param.arg}`;
          output = (i < urlParams.length - 1) ? `${output},` : `${output}\n    `;
      });
    }
    return output;
  }
  /*
<%
params.forEach(function(param, i, arr) {
    if (param.arg !== 'id' && param.arg !== 'fk') {
    %>
    if (<%= param.arg %>) params.<%= param.arg %> = <%= param.arg %>;<%
}}); 
%>
  */
  // TODO REVIEW TO SEE IF THIS IS CORRECT AND VALUABLE (JC)
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
};