var path = require('path');
var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
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
 exports.prepareDirectories = function prepareDirectories(ctx) {

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