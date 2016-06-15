module.exports = function (app, done) {
  process.nextTick(function () {
    var MyModel = app.registry.createModel('ASYNCMODEL', {});
    app.model(MyModel, { public: true });

    done();
  });
};
