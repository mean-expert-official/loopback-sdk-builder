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
import { resolver } from './resolver';

import { StorageActionTypes, StorageActions } from '../actions/Storage';
import { LoopbackErrorActions } from '../actions/error';
import { StorageApi } from '../services/index';

@Injectable()
export class StorageEffects extends BaseLoopbackEffects {
  @Effect()
  protected getContainers: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.GET_CONTAINERS)
    .mergeMap((action: LoopbackAction) =>
      this.storage.getContainers()
        .map((response) => new StorageActions.getContainersSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.getContainersFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createContainer: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.CREATE_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.storage.createContainer(action.payload.options)
        .map((response) => new StorageActions.createContainerSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.createContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyContainer: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.DESTROY_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.storage.destroyContainer(action.payload.container)
        .map((response) => new StorageActions.destroyContainerSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.destroyContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getContainer: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.GET_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.storage.getContainer(action.payload.container)
        .map((response) => new StorageActions.getContainerSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.getContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getFiles: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.GET_FILES)
    .mergeMap((action: LoopbackAction) =>
      this.storage.getFiles(action.payload.container)
        .map((response) => new StorageActions.getFilesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.getFilesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getFile: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.GET_FILE)
    .mergeMap((action: LoopbackAction) =>
      this.storage.getFile(action.payload.container, action.payload.file)
        .map((response) => new StorageActions.getFileSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.getFileFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected removeFile: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.REMOVE_FILE)
    .mergeMap((action: LoopbackAction) =>
      this.storage.removeFile(action.payload.container, action.payload.file)
        .map((response) => new StorageActions.removeFileSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.removeFileFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected upload: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.UPLOAD)
    .mergeMap((action: LoopbackAction) =>
      this.storage.upload(action.payload.req, action.payload.res)
        .map((response) => new StorageActions.uploadSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new StorageActions.uploadFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected download: Observable<LoopbackAction> = this.actions$
    .ofType(StorageActionTypes.DOWNLOAD)
    .mergeMap((action: LoopbackAction) =>
      this.storage.download(action.payload.container, action.payload.file, action.payload.req, action.payload.res)
        .map((response) => new StorageActions.downloadSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new StorageActions.downloadFail(error, action.meta)),
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
    @Inject(StorageApi) public storage: StorageApi
  ) {
    super(actions$, storage, 'Storage', StorageActionTypes, StorageActions);
  }
}
