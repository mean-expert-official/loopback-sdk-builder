import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { go } from '@ngrx/router-store';

import { LoopbackAction, LoopbackAuthActionTypes, AccountActionTypes, AccountActions } from './sdk';

@Injectable()
export class AppEffects {

  @Effect()
  public loginSuccess$ = this.actions$
    .ofType(AccountActionTypes.LOGIN_SUCCESS)
    .map(() => go(['/ngrx-home']));

  @Effect()
  public signupSuccess$ = this.actions$
    .ofType(AccountActionTypes.SIGNUP_SUCCESS)
    .map((action: LoopbackAction) =>
      new AccountActions.login(action.payload.credentials, 'user'));

  constructor(
    private actions$: Actions
  ) {}
}
