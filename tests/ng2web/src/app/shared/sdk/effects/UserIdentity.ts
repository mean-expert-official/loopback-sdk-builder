/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';

import { UserIdentityActionTypes, UserIdentityActions } from '../actions/UserIdentity';
import { LoopbackErrorActions } from '../actions/error';
import { UserIdentityApi } from '../services/index';

@Injectable()
export class UserIdentityEffects extends BaseLoopbackEffects {
  @Effect()
  protected getUser: Observable<LoopbackAction> = this.actions$
    .ofType(UserIdentityActionTypes.GET_USER)
    .mergeMap((action: LoopbackAction) =>
      this.useridentity.getUser(action.payload.id, action.payload.refresh)
        .map((response) => new UserIdentityActions.getUserSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new UserIdentityActions.getUserFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() protected create;
  @Effect() protected createMany;
  @Effect() protected findById;
  @Effect() protected find;
  @Effect() protected findOne;
  @Effect() protected updateAll;
  @Effect() protected deleteById;
  @Effect() protected updateAttributes;
  @Effect() protected upsert;
  @Effect() protected upsertWithWhere;
  @Effect() protected replaceOrCreate;
  @Effect() protected replaceById;
  @Effect() protected patchOrCreate;
  @Effect() protected patchAttributes;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(UserIdentityApi) public useridentity: UserIdentityApi
  ) {
    super(actions$, useridentity, 'UserIdentity', UserIdentityActionTypes, UserIdentityActions);
  }
}
