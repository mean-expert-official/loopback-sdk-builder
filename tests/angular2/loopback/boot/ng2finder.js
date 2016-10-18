var net = require('net')

module.exports = function(app) {
  if (process.NODE_ENV !== 'testing') return;
  var testing  = false;
  var interval = setInterval(function () {
    isPortTaken(9876, function (err, taken) {
      if (!testing && taken) testing = true;
      if (testing && !taken) process.exit()
    })
  }, 1000);
};

var isPortTaken = function(port, fn) {
  var tester = net.createServer()
  .once('error', function (err) {
    if (err.code != 'EADDRINUSE') return fn(err)
    fn(null, true)
  })
  .once('listening', function() {
    tester.once('close', function() { fn(null, false) })
    .close()
  })
  .listen(port)
}
