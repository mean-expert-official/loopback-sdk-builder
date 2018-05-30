/* tslint:disable */
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { getLoopbackAuthAccountId } from '../reducers/auth';
import { LoopbackAuthActions } from '../actions/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  public canActivate(): Observable<boolean> {
    return this.store.select(getLoopbackAuthAccountId).pipe(
      flatMap((userId) => {
        if (userId) {
      		return of(true);
      	} else {
      		this.store.dispatch(new LoopbackAuthActions.guardFail());
      		return of(false);
      	}
      })
    );
  }
}
