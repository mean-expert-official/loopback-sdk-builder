/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SDKBrowserModule, LoopBackConfig } from './shared/sdk';
import { User, AccessToken } from './shared/sdk/models';
import { UserApi } from './shared/sdk/services';


let Helpers: {
  create: Function
} = {
  create : function(userApi: UserApi) {
    let user: User = new User();
    user.email = Date.now() + '@test.com';
    user.password = 'test';
    return userApi.create(user);
  }
}

describe('Service: User Service', () => {
  beforeEach(() => {
    LoopBackConfig.filterOnUrl();
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot()
      ]
    });
  });

  it('should contain authentication methods',
    async(inject([UserApi], (service: UserApi) => {
      expect(service).toBeTruthy();
      expect(service.login).toBeTruthy();
      expect(service.logout).toBeTruthy();
      expect(service.getAccessTokens).toBeTruthy();
      expect(service.getCurrent).toBeTruthy();
      expect(service.getCurrentId).toBeTruthy();
    })
  ));

  it('should create a new instance',
    async(inject([UserApi], (userApi: UserApi) => {
      return Helpers.create(userApi).subscribe(
        (instance: User) => expect(instance.id).toBeTruthy()
      );
    })
  ));

  it('should login the user',
    async(inject([UserApi], (userApi: UserApi) => {
      return Helpers.create(userApi)
        .subscribe((instance: User)   => userApi.login({
          email: instance.email,
          password: 'test'
        })
        .subscribe((token: AccessToken) => {
          expect(token.id).toBeTruthy();
          expect(token.userId).toBe(instance.id);
        }));
    })
  ));

  it('should logout the user',
    async(inject([UserApi], (userApi: UserApi) => {
      return Helpers.create(userApi)
        .subscribe((instance: User)   => userApi.login({
          email: instance.email,
          password: 'test'
        }, true)
        .subscribe((token: AccessToken)   => {
          expect(token.id).toBeTruthy();
          expect(token.userId).toBe(instance.id);
          userApi.logout().subscribe((res) => {
            expect(res).toBeNull();
          });
        }));
    })
  ));

  it('should fail login the user',
    async(inject([UserApi], (userApi: UserApi) => {
      return userApi.login({ email: 'not@existing.com', password: 'duh' })
        .subscribe((res) => { }, err => expect(err.statusCode).toEqual(401));
    })
  ));

  it('should get current user',
    async(inject([UserApi], (userApi: UserApi) => {
      return Helpers.create(userApi)
        .subscribe((instance: User)   => userApi.login({
          email: instance.email,
          password: 'test'
        }, true)
        .subscribe((token: AccessToken) =>
          userApi.getCurrent().subscribe((current: User) => {
          expect(current.id).toBe(instance.id);
        }))
      );
  })));
});
