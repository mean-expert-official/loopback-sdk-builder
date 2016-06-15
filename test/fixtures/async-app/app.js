var loopback = require('loopback');
var boot = require('loopback-boot');

var app = loopback();
boot(app, __dirname);

module.exports = app;
