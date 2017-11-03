/* tslint:disable */
import { take, map, switchMap, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { RoomAccountApi } from '../services/index';
import { getRoomAccountById } from '../reducers/RoomAccount';
import { RoomAccountActions } from '../actions/RoomAccount';

@Injectable()
export class RoomAccountExistsGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private RoomAccount: RoomAccountApi
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasEntity(route.params['RoomAccountId'] || route.params['id']);
  }

  protected hasEntityInStore(id: string): Observable<boolean> {
    return this.store.select(getRoomAccountById(id)).pipe(
      map((entitie) => !!entitie),
      take(1)
    );
  }

  protected hasEntityInApi(id: string): Observable<boolean> {
    return this.RoomAccount.exists(id).pipe(
      map((response: any) => !!response.exists),
      catchError(() => {
        this.store.dispatch(new RoomAccountActions.guardFail());
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
