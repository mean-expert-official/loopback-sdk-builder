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

import { UserCredentialActionTypes, UserCredentialActions } from '../actions/UserCredential';
import { LoopbackErrorActions } from '../actions/error';
import { UserCredentialApi } from '../services/index';

@Injectable()
export class UserCredentialEffects extends BaseLoopbackEffects {
  @Effect()
  protected patchOrCreate: Observable<LoopbackAction> = this.actions$
    .ofType(UserCredentialActionTypes.PATCH_OR_CREATE)
    .mergeMap((action: LoopbackAction) =>
      this.usercredential.patchOrCreate(action.payload.data)
              .map((response) => new UserCredentialActions.patchOrCreateSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new UserCredentialActions.patchOrCreateFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected patchAttributes: Observable<LoopbackAction> = this.actions$
    .ofType(UserCredentialActionTypes.PATCH_ATTRIBUTES)
    .mergeMap((action: LoopbackAction) =>
      this.usercredential.patchAttributes(action.payload.id, action.payload.data)
              .map((response) => new UserCredentialActions.patchAttributesSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new UserCredentialActions.patchAttributesFail(error, action.meta)),
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
    @Inject(UserCredentialApi) public usercredential: UserCredentialApi
  ) {
    super(actions$, usercredential, 'UserCredential', UserCredentialActionTypes, UserCredentialActions);
  }
}
