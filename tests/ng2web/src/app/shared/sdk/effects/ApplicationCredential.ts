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

import { ApplicationCredentialActionTypes, ApplicationCredentialActions } from '../actions/ApplicationCredential';
import { LoopbackErrorActions } from '../actions/error';
import { ApplicationCredentialApi } from '../services/index';

@Injectable()
export class ApplicationCredentialEffects extends BaseLoopbackEffects {
  @Effect()
  protected patchOrCreate: Observable<LoopbackAction> = this.actions$
    .ofType(ApplicationCredentialActionTypes.PATCH_OR_CREATE)
    .mergeMap((action: LoopbackAction) =>
      this.applicationcredential.patchOrCreate(action.payload.data)
              .map((response) => new ApplicationCredentialActions.patchOrCreateSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new ApplicationCredentialActions.patchOrCreateFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected patchAttributes: Observable<LoopbackAction> = this.actions$
    .ofType(ApplicationCredentialActionTypes.PATCH_ATTRIBUTES)
    .mergeMap((action: LoopbackAction) =>
      this.applicationcredential.patchAttributes(action.payload.id, action.payload.data)
              .map((response) => new ApplicationCredentialActions.patchAttributesSuccess(action.payload, action.meta))
              .catch((error) => concat(
          of(new ApplicationCredentialActions.patchAttributesFail(error, action.meta)),
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
    @Inject(ApplicationCredentialApi) public applicationcredential: ApplicationCredentialApi
  ) {
    super(actions$, applicationcredential, 'ApplicationCredential', ApplicationCredentialActionTypes, ApplicationCredentialActions);
  }
}
