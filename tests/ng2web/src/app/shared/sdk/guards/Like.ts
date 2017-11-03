/* tslint:disable */
import { take, map, switchMap, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { LikeApi } from '../services/index';
import { getLikeById } from '../reducers/Like';
import { LikeActions } from '../actions/Like';

@Injectable()
export class LikeExistsGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private Like: LikeApi
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasEntity(route.params['LikeId'] || route.params['id']);
  }

  protected hasEntityInStore(id: string): Observable<boolean> {
    return this.store.select(getLikeById(id)).pipe(
      map((entitie) => !!entitie),
      take(1)
    );
  }

  protected hasEntityInApi(id: string): Observable<boolean> {
    return this.Like.exists(id).pipe(
      map((response: any) => !!response.exists),
      catchError(() => {
        this.store.dispatch(new LikeActions.guardFail());
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
