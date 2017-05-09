/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { getLoopbackAuthAccountId } from '../reducers/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  public canActivate(): Observable<boolean> {
    return this.store.let(getLoopbackAuthAccountId())
      .flatMap((userId) => {
        return userId ? of(true) : of(false);
      });
  }
}
