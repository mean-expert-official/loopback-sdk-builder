var expect = require('chai').expect;

function parse(script, regex) {
  expect(script).to.match(regex);
  return regex.exec(script)[1] || '';
}

/*!
 * Note: the functions below are used by grunt-loopback-angular tests
 * and should be considered as part of the public API.
 */

exports.moduleName = function(script) {
  return parse(script, /.*angular\.module\("([^"]*)",.*/);
};

exports.baseUrl = function(script) {
  return parse(script, /var urlBase = "([^"]*)";/);
}
