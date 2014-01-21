define(['angular', 'given'], function(angular, given) {
  'use strict';

  describe('Customer service', function() {
    it('works', function() {
      return given.servicesForLoopBackApp(
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
        })
        .then(invoke(function(Customer) {
          var list = Customer.query({}, function() {
            expect(list).to.have.property('length', 0);
          });
          return list.$promise;
        }));
    });
  });
});
