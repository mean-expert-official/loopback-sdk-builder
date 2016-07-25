/**
 * @module Angular 2 Generator for loopback-sdk-builder
 * @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
 * @description
 * Defines a SDK Schema and builds according configuration
 */
var fs        = require('fs');
var path      = require('path');
var mkdirp    = require('mkdirp');
var rmdir     = require('rimraf');
var ejs       = require('ejs');
var utils     = require('../utils');
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
          output:  '/models/' + modelName + '.ts',
          params: {
            model        : ctx.models[modelName],
            models       : ctx.models,
            modelName    : modelName,
            getModelType : getModelType
          }
        },
        /**
        * SDK CUSTOM SERVICES
        */
        {
          template: './shared/services/custom/service.ejs',
          output:  '/services/custom/' + modelName + '.ts',
          params: {
            isIo       : ctx.isIo,
            model      : ctx.models[modelName],
            modelName  : modelName,
            moduleName : ctx.moduleName
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
      console.info('Generating: %s',  `${ctx.outputFolder}${config.output}`);
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
};

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