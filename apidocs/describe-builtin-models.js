var fs = require('fs');
var path = require('path');

var loopbackCoreJs = path.resolve(__dirname, 'loopback-core.js');

try {
  var generator = require('..');
  var loopback = require('loopback');
} catch(err) {
  if (err.code === 'MODULE_NOT_FOUND' && fs.existsSync(loopbackCoreJs)) {
    console.log('Cannot load the generator, node_modules were not installed.');
    console.log('Ignoring the error since the output file is already there.');
    process.exit();
  }
  throw err;
}

console.log('Generating API docs for LoopBack built-in models.');

var app = loopback();

app.dataSource('db', { connector: 'memory', defaultForType: 'db' });

var modelNames = [];
for (var key in loopback) {
  var model = loopback[key];
  if (!model) continue;
  if (model === loopback.Model) continue;
  if (model.prototype instanceof loopback.Model)
    modelNames.push(key);
}

modelNames.sort(function(l, r) {
  if (l === r) return 0;
  if (l === 'PersistedModel') return -1;
  if (r === 'PersistedModel') return 1;
  return l < r ? -1 : 1;
});

modelNames.forEach(function(key) {
  var model = loopback[key];
  if (model.prototype instanceof loopback.PersistedModel) {
    app.model(model, { dataSource: 'db' });
    console.log('  added persisted model %s', key);
  } else if (model.prototype instanceof loopback.Model) {
    app.model(model);
    console.log('  added model %s', key);
  }
});

var script = generator.services(app, 'lbServices', '/api');

// Transform ngdoc comments and make them compatible with dox/strong-docs
script = script
  // Insert an empty line (serving as jsdoc description) before @ngdoc
  .replace(/^(\s+\*)( @ngdoc)/gm, '$1\n$1$2')
  // Remove module name from all names
  .replace(/\blbServices\./g, '')
  // Fix `## Example` sections
  .replace(/## Example/g, '**Example**')
  // Annotate Angular objects as jsdoc classes
  .replace(/^((\s+\*) @ngdoc object)/mg, '$1\n$2 @class')
  // Annonotate Angular methods as jsodc methods
  .replace(/^((\s+\*) @ngdoc method)/mg, '$1\n$2 @method')
  // Hide the top-level module description
  .replace(/^(\s+\*) @module.*$/mg, '$1 @private')
  // Change `Model#method` to `Model.method` in @name
  .replace(/^(\s+\* @name) ([^# \n]+)#([^# \n]+) *$/mg, '$1 $2.$3')
  // Change `Model#method` to `Model.method` in @link
  // Do not modify URLs with anchors, e.g. `http://foo/bar#anchor`
  .replace(/({@link [^\/# }\n]+)#([^# }\n]+)/g, '$1.$2');

fs.writeFileSync(loopbackCoreJs, script);

console.log('Done: %s', loopbackCoreJs);
