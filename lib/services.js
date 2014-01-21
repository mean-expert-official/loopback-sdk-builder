var fs = require('fs');
var ejs = require('ejs');

ejs.filters.q = function(obj) {
  return JSON.stringify(obj, null, 2 );
};

module.exports = function generateServices(app, ngModuleName, apiUrl) {
  ngModuleName = ngModuleName || 'lbServices';
  apiUrl = apiUrl || '/';

  var models = describeModels(app);

  var servicesTemplate = fs.readFileSync(
    require.resolve('./services.template'),
    { encoding: 'utf-8' }
  );

  return ejs.render(servicesTemplate, {
    moduleName: ngModuleName,
    models: models,
    urlBase: apiUrl.replace(/\/+$/, '')
  });
};

function describeModels(app) {
  var result = {};
  app.handler('rest').adapter.getClasses().forEach(function(c) {
    var name = c.name;

    if (!c.ctor) {
      // Skip classes that don't have a shared ctor
      // as they are not LoopBack models
      console.error('Skipping %j as it is not a LoopBack model', name);
      return;
    }

    result[name] = c;
  });
  return result;
}
