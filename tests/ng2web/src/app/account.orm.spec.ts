/* tslint:disable:no-unused-variable */
import 'rxjs/add/operator/auditTime';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './shared/app.effects';
import { SDKBrowserModule, LoopbackEffects, LoopbackStateInterface } from './shared/sdk/index';
import { Account, AccessToken } from './shared/sdk/models';
import { AccountActions, getLoopbackAuthState, SDKToken } from './shared/sdk';
import { IAppState, reducerToken, reducerProvider, effects, getApplicationState } from './shared/app.state';
import { OrmModule, Orm } from './shared/sdk/orm';

import * as fromApp from './shared/app.reducer';

class RouterStub {
    navigate(url: String) { return url; }
}

const Helpers: {
  create: Function
} = {
  create : function() {
    const user: Account = new Account();
    user.email = Date.now() + '@account.orm';
    user.password = 'test';
    return user;
  }
};

describe('ORM: Account', () => {
  let store: Store<IAppState>;
  let orm: Orm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        StoreModule.forRoot(reducerToken, {}),
        EffectsModule.forRoot(effects),
        OrmModule.forRoot()
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        reducerProvider
      ]
    });

    store = TestBed.get(Store);
    orm = TestBed.get(Orm);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should signup and login the user', () => {
    orm.Account.signup(Helpers.create());
    store.select(getLoopbackAuthState)
      .auditTime(2000)
      .subscribe((token: SDKToken) => {
        expect(token.id).toBeTruthy();
      });
  });

  it('should fail login the user', () => {
    orm.Account.login({ email: 'not@existing.com', password: 'duh' });
    store.select(getApplicationState)
      .auditTime(2000)
      .subscribe((state: fromApp.IAppState) => {
        expect((state.error as any).statusCode).toEqual(401);
      });
  });
});
