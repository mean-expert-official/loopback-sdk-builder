import { LoopBackConfig } from './../app/shared/sdk';
import { User, AccessToken } from './../app/shared/sdk/models';
import { UserApi } from './../app/shared/sdk/services';


let Helpers = {
  create : (userApi) => {
    let user = new User();
    user.email = Date.now() + '@test.com';
    user.password = 'test';
    return userApi.create(user);
  }
}
let userApi;

describe('Service: User Service', () => {
  beforeEach(() => {
    userApi = new UserApi;
  });

  it('should contain authentication methods', () => {
    expect(userApi).toBeTruthy();
    expect(userApi.login).toBeTruthy();
    expect(userApi.logout).toBeTruthy();
    expect(userApi.getAccessTokens).toBeTruthy();
    expect(userApi.getCurrent).toBeTruthy();
    expect(userApi.getCurrentId).toBeTruthy();
  });

  it('should create a new instance', async () => {
      await Helpers.create(userApi).subscribe(
        (instance) => expect(instance.id).toBeTruthy()
      );
  });

  it('should login the user', async () => {
    await Helpers.create(userApi)
        .subscribe((instance)   => userApi.login({
          email: instance.email,
          password: 'test'
        })
        .subscribe((token) => {
          expect(token.id).toBeTruthy();
          expect(token.userId).toBe(instance.id);
        }));
  });

  it('should logout the user',async () => {
    await Helpers.create(userApi)
      .subscribe((instance)   => userApi.login({
        email: instance.email,
        password: 'test'
      }, true)
      .subscribe((token)   => {
        expect(token.id).toBeTruthy();
        expect(token.userId).toBe(instance.id);
        userApi.logout().subscribe((res) => {
          expect(res).toBeTruthy();
        });
      }));
  });

  it('should fail login the user', async () => {
    await userApi.login({ email: 'not@existing.com', password: 'duh' })
      .subscribe((res) => { }, err => expect(err.statusCode).toEqual(401));
  });

  it('should get current user', async () => {
    await Helpers.create(userApi)
      .subscribe((instance)   => userApi.login({
        email: instance.email,
        password: 'test'
      }, true)
      .subscribe((token) =>
        userApi.getCurrent().subscribe((current) => {
        expect(current.id).toBe(instance.id);
      }))
    );
  });
});
