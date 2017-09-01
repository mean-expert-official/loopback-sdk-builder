/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { AppEffects } from './shared/app.effects';
import * as fromApp from './shared/app.reducer';
import { SDKBrowserModule, LoopbackEffects, LoopbackReducer, LoopbackStateInterface } from './shared/sdk/index';
import { Account, AccessToken } from './shared/sdk/models';
import { AccountActions, getLoopbackAuthState, SDKToken } from './shared/sdk';
import { OrmModule } from './shared/sdk/orm';

const Helpers: {
  create: Function
} = {
  create : function() {
    const user: Account = new Account();
    user.email = Date.now() + '@test.com';
    user.password = 'test';
    return user;
  }
};

describe('Ngrx: Account', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        StoreModule.provideStore(Object.assign({}, LoopbackReducer, {
          app: fromApp.reducer
        })),
        ...LoopbackEffects,
        EffectsModule.run(AppEffects),
        OrmModule.forRoot()
      ]
    });
  });

  it('should signup and login the user',
    async(inject([Store], (store: Store<any>) => {
      store.dispatch(new AccountActions.signup(Helpers.create()));
      return store.select(getLoopbackAuthState)
        .debounceTime(2000)
        .subscribe((token: SDKToken) => {
          expect(token.id).toBeTruthy();
        });
    })
  ));

  it('should fail login the user',
    async(inject([Store], (store: Store<any>) => {
      store.dispatch(new AccountActions.login({ email: 'not@existing.com', password: 'duh' }));
      return store.let(fromApp.getAppState())
        .debounceTime(2000)
        .subscribe((state: fromApp.IAppState) => {
          expect(state.error.statusCode).toEqual(401);
        });
    })
  ));
});
