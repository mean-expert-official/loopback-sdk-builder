/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { Account } from '../models';
import { getLoopbackAuthAccount } from '../reducers/auth';

@Injectable()
export class AuthAccountResolver implements Resolve<Account> {
  constructor(private store: Store<any>) { }

  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.store.select(getLoopbackAuthAccount);
  }
}
