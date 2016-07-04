import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject,
  injectAsync
} from '@angular/core/testing';

import {
  User,
  UserApi,
  UserInterface,
  API_PROVIDERS,
  LoopBackConfig,
  TokenInterface
} from './shared';

LoopBackConfig.setBaseURL('http://127.0.0.1:3000');
LoopBackConfig.setApiVersion('api');

describe('UserService Service', () => {
  beforeEachProviders(() => [API_PROVIDERS]);

  it('should contain authentication methods',
    inject([UserApi], (service: UserApi) => {
      expect(service).toBeTruthy();
      expect(service.login).toBeTruthy();
      expect(service.logout).toBeTruthy();
      expect(service.getAccessTokens).toBeTruthy();
      expect(service.getCurrent).toBeTruthy();
      expect(service.getCurrentId).toBeTruthy();
    })
  );

  it('should create a new instance',
    injectAsync([UserApi], (userApi: UserApi) => {
      let user: UserInterface = new User();
      user.email = Date.now() + '@test.com';
      user.password = 'test';
      return userApi.create(user)
        .subscribe((user: UserInterface) => expect(user.id).toBeTruthy());
    })
  );

  it('should login the user',
    injectAsync([UserApi], (userApi: UserApi) => {
      let user: UserInterface = new User();
      user.email = Date.now() + '@test.com';
      user.password = 'test';
      return userApi.create(user)
        .subscribe((instance: UserInterface)   => userApi.login(user)
        .subscribe((token: TokenInterface) => {
          expect(token.id).toBeTruthy();
          expect(token.userId).toBe(instance.id);
        }));
    })
  );

  it('should logout the user',
    injectAsync([UserApi], (userApi: UserApi) => {
      let user: UserInterface = new User();
      user.email = Date.now() + '@test.com';
      user.password = 'test';
      return userApi.create(user)
        .subscribe((instance: UserInterface) => userApi.login(user)
        .subscribe((token: TokenInterface)   => {
          expect(token.id).toBeTruthy();
          expect(token.userId).toBe(instance.id);
          userApi.logout().subscribe((res: boolean) => {
            expect(res).toBe(true);
          });
        }));
    })
  );

  it('should fail login the user',
    injectAsync([UserApi], (userApi: UserApi) => {
      return userApi.login({ email: 'not@existing.com', password: 'duh' })
        .subscribe((res) => { }, err => expect(err.status).toEqual(401));
    })
  );

  it('should get current user',
    injectAsync([UserApi], (userApi: UserApi) => {
      let user: UserInterface = new User();
      user.email = Date.now() + '@test.com';
      user.password = 'test';
      return userApi.create(user)
        .subscribe((instance: UserInterface) => userApi.login(user)
        .subscribe((token: TokenInterface)   => userApi.getCurrent()
        .subscribe((user: UserInterface)     => expect(user.id).toBe(instance.id)
      )));
  }));
});
