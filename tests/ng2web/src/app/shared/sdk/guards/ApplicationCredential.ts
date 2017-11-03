/* tslint:disable */
import { take, map, switchMap, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ApplicationCredentialApi } from '../services/index';
import { getApplicationCredentialById } from '../reducers/ApplicationCredential';
import { ApplicationCredentialActions } from '../actions/ApplicationCredential';

@Injectable()
export class ApplicationCredentialExistsGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private ApplicationCredential: ApplicationCredentialApi
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasEntity(route.params['ApplicationCredentialId'] || route.params['id']);
  }

  protected hasEntityInStore(id: string): Observable<boolean> {
    return this.store.select(getApplicationCredentialById(id)).pipe(
      map((entitie) => !!entitie),
      take(1)
    );
  }

  protected hasEntityInApi(id: string): Observable<boolean> {
    return this.ApplicationCredential.exists(id).pipe(
      map((response: any) => !!response.exists),
      catchError(() => {
        this.store.dispatch(new ApplicationCredentialActions.guardFail());
        return of(false);
      })
    );
  }

  protected hasEntity(id: string): Observable<boolean> {
    return this.hasEntityInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasEntityInApi(id);
      })
    );
  }
}
