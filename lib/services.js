var fs = require('fs');
var ejs = require('ejs');

ejs.filters.q = function(obj) {
  return JSON.stringify(obj, null, 2 );
};

module.exports = function generateServices(app, ngModuleName, apiUrl) {
  // var models = describeModels(app);

  var servicesTemplate = fs.readFileSync(
    require.resolve('./services.template'),
    { encoding: 'utf-8' }
  );

  return ejs.render(servicesTemplate, {
    moduleName: ngModuleName,
    // models: models,
    resolveUrl: function(path) { return apiUrl + path; }
  });
};
