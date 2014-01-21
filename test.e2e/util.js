define(function() {
  'use strict';

  var util = {};

  util.throwHttpError = function(res) {
    var msg = 'HTTP ' + res.status;
    if (res.data && res.data.error && res.data.error.message)
      msg += ' ' + res.data.error.message;

    throw new Error(msg);
  };

  return util;
});
