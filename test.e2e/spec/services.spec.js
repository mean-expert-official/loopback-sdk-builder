define(['angular', 'given', 'util'], function(angular, given, util) {
  'use strict';

  describe('services', function() {
    describe('MyModel $resource', function() {
      var $injector, MyModel;
      before(function() {
        return given.servicesForLoopBackApp(
          {
            models: {
              MyModel: { name: { type: String, required: true } }
            }
          })
          .then(function(createInjector) {
            $injector = createInjector();
            MyModel = $injector.get('MyModel');
          });
      });

      it('calls server handler', function() {
        var list = MyModel.query(
          {},
          function() {
            expect(list).to.have.property('length', 0);
          },
          util.throwHttpError
        );
        return list.$promise;
      });

      it('has a custom `find` action returning array', function() {
        var list = MyModel.find(
          function() {
            expect(list).to.have.property('length', 0);
          },
          util.throwHttpError
        );
        return list.$promise;
      });

      it('can create new resource', function() {
        var obj = MyModel.create({ name: 'new' }, function() {
          expect(obj).to.have.property('name', 'new');
        });
        return obj.$promise.then(function() {
          var found = MyModel.get(
            { id: obj.id },
            function() {
              expect(found).to.have.property('name', obj.property);
            },
            util.throwHttpError);
          return found.$promise;
        });
      });

      it('can save a new resource', function() {
        var obj = new MyModel();
        obj.name = 'new-saved';

        var promise = obj.$save(
          function() {
            expect(obj.id).to.not.equal(undefined);
          },
          util.throwHttpError
        );
        return promise.then(function() {
          var found = MyModel.find(
            { filter: { where: { name: obj.name } } },
            function() {
              expect(found).to.have.length(1);
              expect(found[0].id).to.equal(obj.id);
            },
            util.throwHttpError
          );
          return found.$promise;
        });
      });

      it('can save an existing resource', function() {
        var obj = MyModel.create({ name: 'create-save' });
        return obj.$promise
          .catch(util.throwHttpError)
          .then(function() {
            obj.updated = true;
            return obj.$save().catch(util.throwHttpError);
          })
          .then(function() {
            var found = MyModel.find(
              { filter: { where: { name: obj.name } } },
              function() {
                expect(found).to.have.length(1);
                expect(found[0].id).to.equal(obj.id);
                expect(found[0].updated).to.equal(true);
              },
              util.throwHttpError
            );
            return found.$promise;
          });
      });

      it('has all methods including aliases', function() {
        var methodNames = Object.keys(MyModel);
        console.log('methods', methodNames);
        expect(methodNames).to.include.members([
          'create',
          'updateOrCreate',
          'upsert',
          'exists',
          'findById',
          'find',
          'findOne',
          'destroyById',
          'deleteById',
          'removeById',
          'count',
          'prototype$updateAttributes'
        ]);
      });
    });

    describe('$resource for model with funky name', function() {
      var $injector;
      before(function() {
        return given.servicesForLoopBackApp(
          {
            models: {
              'lower-case-not-an-identifier': {}
            }
          })
          .then(function(createInjector) {
            $injector = createInjector();
          });
      });

      it('has a factory name that starts with upper-case', function() {
        expect($injector.has('Lower-case-not-an-identifier')).to.equal(true);
      });
    });

    describe('with authentication', function() {
      var getNew, createInjector, $injector, Customer;
      before(function setupLoopBackService() {
        return given.servicesForLoopBackApp(
          {
            name: 'with authentication',
            models: {
              Customer: {
                options: {
                  base: 'User',
                  relations: {
                    accessTokens: {
                      model: 'AccessToken',
                      type: 'hasMany',
                      foreignKey: 'userId'
                    }
                  }
                }
              },
              product: {
                properties: {
                  model: String
                }
              }
            },
            enableAuth: true
          })
          .then(function(_createInjector) {
            createInjector = _createInjector;
            getNew = function(name) {
              return createInjector().get(name);
            };
          });
      });

      beforeEach(function setupTestEnv() {
        localStorage.clear();
        sessionStorage.clear();
        $injector = createInjector();
        Customer = $injector.get('Customer');
      });

      it('returns error for an unauthorized request', function() {
        return Customer.query().$promise
          .then(function() {
            throw new Error('User.query was supposed to fail.');
          }, function(res) {
            expect(res.status).to.equal(401);
          });
      });

      it('sends the authentication token when a user is logged in', function() {
        return givenLoggedInUser('user@example.com')
          .then(function(accessToken) {
            return Customer.get({ id: accessToken.userId }).$promise;
          })
          .then(function(user) {
            expect(user.email).to.equal('user@example.com');
          })
          .catch(util.throwHttpError);
      });

      it('clears authentication data on logout', function() {
        return givenLoggedInUser()
          .then(function() {
            return Customer.logout().$promise;
          })
          .then(function() {
            // NOTE(bajtos) This test is checking the LoopBackAuth.accessToken
            // property, because any HTTP request will fail regardless of the
            // Authorization header value, since the token was invalidated on
            // the server side too.
            var auth = $injector.get('LoopBackAuth');
            expect(auth.accessTokenId, 'accessTokenId').to.equal(null);
            expect(auth.currentUserId, 'currentUserId').to.equal(null);

            // Check that localStorage was cleared too.
            auth = getNew('LoopBackAuth');
            expect(auth.accessTokenId, 'stored accessTokenId').to.equal(null);
            expect(auth.currentUserId, 'stored currentUserId').to.equal(null);
          })
          .catch(util.throwHttpError);
      });

      it('returns stub 401 for User.getCurrent when not logged in', function() {
        return Customer.getCurrent().$promise
          .then(function() {
            throw new Error('User.getCurrent() was supposed to fail.');
          }, function(res) {
            if (res instanceof Error) throw res;
            expect(res.status).to.equal(401);
            // check the response is a stub not coming from the server
            if (res.headers('content-type') != null) {
              throw new Error('Expected a stub response, got a real one');
            }
          });
      });

      it('persists accessToken and currentUserId', function() {
        return givenLoggedInUser('persisted@example.com')
          .then(function() {
            sessionStorage.clear(); // simulate browser restart
            return getNew('Customer').getCurrent().$promise;
          })
          .then(function(user) {
            expect(user.email).to.equal('persisted@example.com');
          })
          .catch(util.throwHttpError);
      });

      it('persists data in sessionStorage when rememberMe=false', function() {
        return givenLoggedInUser(null, { rememberMe: false })
          .then(function() {
            localStorage.clear(); // ensure data is not stored in localStorage
            return getNew('Customer').getCurrent().$promise;
          })
          .then(function() {
            expect(true); // no-op, test passed
          })
          .catch(util.throwHttpError);
      });

      it('adds getCurrent() to User model only', function() {
        var Product = $injector.get('Product');
        expect(Product.getCurrent).to.equal(undefined);
      });

      it('sends User.login with include=user to by default', function() {
        return givenLoggedInUser()
          .then(function(token) {
            expect(token.user).to.be.an('object');
          });
      });

      it('can request User.login without including user data', function() {
        return givenLoggedInUser(null, { include: null })
          .then(function(token) {
            expect(token.user).to.equal(undefined);
          });
      });

      it('returns null as initial cached user', function() {
        var value = Customer.getCachedCurrent();
        expect(value).to.equal(null);
      });

      it('caches user data from User.login response', function() {
        return givenLoggedInUser()
          .then(function(token) {
            var value = Customer.getCachedCurrent();
            expect(value).to.be.instanceof(Customer);
            expect(value).to.have.property('email', token.user.email);
          });
      });

      it('caches data from User.getCurrent response', function() {
        return givenLoggedInUser()
          .then(function() {
            // clear the data stored by login
            $injector.get('LoopBackAuth').currentUserData = null;
            return Customer.getCurrent().$promise;
          })
          .then(function(user) {
            var value = Customer.getCachedCurrent();
            expect(value).to.be.instanceof(Customer);
            expect(value).to.have.property('email', user.email);
          });
      });

      it('clears cached user on logout', function() {
        return givenLoggedInUser()
          .then(function() {
            return Customer.logout().$promise;
          })
          .then(function() {
            var value = Customer.getCachedCurrent();
            expect(value).to.equal(null);
          });
      });

      it('provides User.isAuthenticated method', function() {
        return givenLoggedInUser()
          .then(function() {
            expect(Customer.isAuthenticated()).to.equal(true);
          });
      });

      it('provides User.getCurrentId method', function () {
        return givenLoggedInUser()
          .then(function(token) {
            expect(Customer.getCurrentId()).to.equal(token.userId);
          });
      });

      var idCounter = 0;
      function givenLoggedInUser(email, loginParams) {
        var credentials = {
          email: email || 'user-' + (++idCounter) + '@example.com',
          password: 'a-password'
        };

        return Customer.create(credentials).$promise
          .then(function() {
            return Customer.login(loginParams || {}, credentials).$promise;
          });
      }
    });

    describe('for models with hasAndBelongsToMany relations', function() {
      var $injector, Product, Category, testData;
      before(function() {
        return given.servicesForLoopBackApp(
          {
            models: {
              Product: {
                properties: { name: 'string' },
                options: {
                  relations: {
                    categories: {
                      model: 'Category',
                      type: 'hasAndBelongsToMany'
                    }
                  }
                }
              },
              Category: {
                properties: { name: 'string' },
                options: {
                  relations: {
                    products: {
                      model: 'Product',
                      type: 'hasAndBelongsToMany'
                    }
                  }
                }
              }
            },
            setupFn: (function(app, cb) {
              /*globals debug:true */
              app.models.Product.create({ name: 'p1' }, function(err, prod) {
                if (err) return cb(err);
                debug('Created product', prod);

                prod.categories.create({ name: 'c1' }, function(err, cat) {
                  if (err) return cb(err);
                  debug('Created category', cat);

                  prod.categories(true, function(err, list) {
                    if (err) return cb(err);
                    debug('Categories of product', list);

                    cb(null, {
                      product: prod,
                      category: cat
                    });
                  });
                });
              });
            }).toString()
          })
          .then(function(createInjector) {
            $injector = createInjector();
            Product = $injector.get('Product');
            Category = $injector.get('Category');
            testData = $injector.get('testData');
          });
      });

      it('provides scope methods', function() {
        expect(Object.keys(Product), 'Product properties')
          .to.contain('categories');
        expect(Object.keys(Product.categories), 'Product.categories properties')
          .to.have.members([
            'create',
            'destroyAll',
            // new in loopback 2.0
            'destroyById',
            'findById',
            'link',
            'unlink',
            'updateById'
          ]);
      });

      it('gets related models with correct prototype', function() {
        var list = Product.categories({ id: testData.product.id });
        return list.$promise.then(function() {
          // eql does not work for arrays with objects correctly :(
          expect(list).to.have.length(1);
          expect(list[0]).to.eql(new Category(testData.category));
        });
      });

      it('creates a related model', function() {
        var cat = Product.categories.create(
          { id: testData.product.id },
          { name: 'another-cat' });
        return cat.$promise
          .then(function() {
            expect(cat).to.be.an.instanceof(Category);
            expect(cat).to.have.property('name', 'another-cat');
          })
          .then(function() {
            var list = Product.categories({ id: testData.product.id });
            return list.$promise.then(function() {
              var names = list.map(function(c) { return c.name; });
              expect(names).to.eql([testData.category.name, cat.name]);
            });
          });
      });

      // Skipped due to strongloop/loopback-datasource-juggler#95
      it.skip('removes all related models', function() {
        return Product.categories.destroyAll({ id: testData.product.id })
          .$promise
          .then(function() {
            var list = Product.categories({ id: testData.product.id });
            return list.$promise.then(function() {
              expect(list, 'product categories').to.have.length(0);
            });
          })
          .then(function() {
            var all = Product.find({ filter: true });
            return all.$promise
              .then(function() {
                expect(all, 'all categories').to.have.length(0);
              });
          });
      });
    });

    describe('for models with belongsTo relation', function() {
      var $injector, Town, Country, testData;
      before(function() {
        return given.servicesForLoopBackApp(
          {
            models: {
              Town: {
                properties: { name: 'string' },
                options: {
                  relations: {
                    country: {
                      model: 'Country',
                      type: 'belongsTo'
                    }
                  }
                }
              },
              Country: {
                properties: { name: 'string' },
                options: {
                  relations: {
                    towns: {
                      model: 'Town',
                      type: 'hasMany'
                    }
                  }
                }
              }
            },
            setupFn: (function(app, cb) {
              /*globals debug:true */
              app.models.Country.create(
                { name: 'a-country' },
                function(err, country) {
                  if (err) return cb(err);
                  debug('Created country', country);

                  country.towns.create({ name: 'a-town' },
                    function(err, town) {
                      if (err) return cb(err);
                      debug('Created town', town);

                      town.country(true, function(err, res) {
                        if (err) return cb(err);
                        debug('Country of the town', res);

                        cb(null, {
                          country: country,
                          town: town
                        });
                      });
                    }
                  );
                }
              );
            }).toString()
          })
          .then(function(createInjector) {
            $injector = createInjector();
            Town = $injector.get('Town');
            Country = $injector.get('Country');
            testData = $injector.get('testData');
          });
      });

      it('provides scope methods', function() {
        expect(Object.keys(Town), 'Town properties')
          .to.contain('country');
      });

      it('gets the related model with the correct prototype', function() {
        var country = Town.country({ id: testData.town.id });
        return country.$promise.then(function() {
          expect(country).to.be.instanceof(Country);
          for (var k in testData.country) {
            expect(country[k], 'country.' + k).to.equal(testData.country[k]);
          }
        });
      });
    });
  });
});
