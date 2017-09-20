/**
 * @module React Generator for loopback-sdk-builder
 * @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
 * @author Andres Jimenez <@ndresdavid> <github:kattushi>
 * @license MIT
 * @description
 * Defines a SDK Schema and builds according configuration, fork of Angular 2 generator
 */

var utils = require('../utils');
var helpers = require('./../helpers');

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
  helpers.prepareDirectories(ctx);
  /**
   * Fix to decide which AcccessToken to get, since usually is private, but not
   * Always, so  we need to import from the right place
   */
  ctx.loadAccessToken = (ctx.models.AccessToken ? false : true);
  /**
  * LoopBack SDK Builder Schema for Angular 2 and ng2native 2
  **/
  helpers.buildSquema(ctx);
};
