import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import { LoopbackAction, LoopbackAuthActionTypes, AccountActionTypes, AccountActions } from './sdk';

@Injectable()
export class AppEffects {

  @Effect({dispatch: false})
  public loginSuccess$ = this.actions$
    .ofType(AccountActionTypes.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/ngrx-home']));

  @Effect()
  public signupSuccess$ = this.actions$
    .ofType(AccountActionTypes.SIGNUP_SUCCESS)
    .map((action: LoopbackAction) =>
      new AccountActions.login(action.payload.credentials, 'user'));

  constructor(
    private router: Router,
    private actions$: Actions
  ) {}
}
