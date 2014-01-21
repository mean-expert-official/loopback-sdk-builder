var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\/spec\/.*\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

/* global requirejs */
requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    chai: 'bower_components/chai/chai',
    angular: 'bower_components/angular/angular',
    angularResource: 'bower_components/angular-resource/angular-resource',
    angularMocks: 'bower_components/angular-mocks/angular-mocks',
    mochaAsPromised: 'node_modules/mocha-as-promised/mocha-as-promised',
    given: 'test.e2e/given'
  },

  shim: {
    'angular': { exports : 'angular' },
    'angularResource': {
      deps: ['angular'],
      exports : 'ngResource'
    },
    'angularMocks': {
      deps: ['angular'],
      exports: 'angular.mock'
    },
    'chai': { exports: 'chai' }
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});

require(['chai', 'mochaAsPromised'], function(chai, mochaAsPromised) {
  mochaAsPromised(window.Mocha);
  before(function() {
    window.expect = chai.expect;
    window.invoke = function(fn) {
      return function($injector) {
        return $injector.invoke(fn);
      };
    };
  });
});
