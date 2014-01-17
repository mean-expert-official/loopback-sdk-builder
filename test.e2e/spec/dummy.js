define(['angular', 'given'], function(angular, given) {
  'use strict';

  describe('Customer service', function() {
    it('works', function(done) {
      given.servicesForLoopBackApp(
        {
          models: {
            Customer: {
              properties: {
                name: 'string'
                // other properties
              },
              options: {
              }
            }
          }
        },

        function(err, $injector) {
          if (err) return done(err);

          $injector.invoke(function(Customer) {
            var list = Customer.query({},
              function() {
                expect(list).to.have.property('length', 0);
                done();
              });
            list.$promise.catch(done);
          });
        }
      );
    });
  });
});
