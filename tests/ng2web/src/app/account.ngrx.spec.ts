/* tslint:disable:no-unused-variable */
import 'rxjs/add/operator/auditTime';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './shared/app.effects';
import { SDKBrowserModule, LoopbackStateInterface } from './shared/sdk/index';
import { Account, AccessToken } from './shared/sdk/models';
import { getLoopbackAuthState, SDKToken, AccountActions } from './shared/sdk';
import { IAppState, reducerToken, reducerProvider, effects, getApplicationState } from './shared/app.state';

import * as fromApp from './shared/app.reducer';

class RouterStub {
    navigate(url: String) { return url; }
}

const Helpers: {
  create: Function
} = {
  create : function() {
    const user: Account = new Account();
    user.email = Date.now() + '@account.ngrx';
    user.password = 'test';
    return user;
  }
};

describe('Ngrx: Account', () => {
  let store: Store<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        StoreModule.forRoot(reducerToken, {}),
        EffectsModule.forRoot(effects)
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        reducerProvider
      ]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should contain authentication actions', () => {
    expect(AccountActions).toBeTruthy();
    expect(AccountActions.signup).toBeTruthy();
    expect(AccountActions.login).toBeTruthy();
    expect(AccountActions.logout).toBeTruthy();
    expect(AccountActions.getAccessTokens).toBeTruthy();
  });

  it('should signup and login the user', () => {
    store.dispatch(new AccountActions.signup(Helpers.create()));
    store.select(getLoopbackAuthState)
      .auditTime(2000)
      .subscribe((token: SDKToken) => {
        expect(token.id).toBeTruthy();
      });
  });

  it('should fail login the user', () => {
    store.dispatch(new AccountActions.login({ email: 'not@existing.com', password: 'duh' }));
    store.select(getApplicationState)
      .auditTime(2000)
      .subscribe((state: fromApp.IAppState) => {
        expect((state.error as any).statusCode).toEqual(401);
      });
  });
});
