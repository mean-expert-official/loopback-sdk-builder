var p = require('../package.json');
module.exports = {
  "restApiRoot":  `/${ p.version.split('.').shift() }`,
  "port": 3002
}
