module.exports = function(app) {
  app.on('started', () => {
    app.mx.IO.on('Test.set', (msg) => {
      console.log('FIRELOOP', msg);
    });
  })
};
