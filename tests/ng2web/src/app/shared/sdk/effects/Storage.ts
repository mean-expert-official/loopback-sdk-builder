/* tslint:disable */
import { map, catchError, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver } from './resolver';

import * as actions from '../actions';
import { StorageActionTypes, StorageActions } from '../actions/Storage';
import { LoopbackErrorActions } from '../actions/error';
import { StorageApi } from '../services/index';

@Injectable()
export class StorageEffects extends BaseLoopbackEffects {
  @Effect()
  public getContainers$ = this.actions$
    .ofType(StorageActionTypes.GET_CONTAINERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.getContainers().pipe(
          map((response: any) => new StorageActions.getContainersSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.getContainersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createContainer$ = this.actions$
    .ofType(StorageActionTypes.CREATE_CONTAINER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.createContainer(action.payload.options).pipe(
          map((response: any) => new StorageActions.createContainerSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.createContainerFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyContainer$ = this.actions$
    .ofType(StorageActionTypes.DESTROY_CONTAINER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.destroyContainer(action.payload.container).pipe(
          map((response: any) => new StorageActions.destroyContainerSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.destroyContainerFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getContainer$ = this.actions$
    .ofType(StorageActionTypes.GET_CONTAINER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.getContainer(action.payload.container).pipe(
          map((response: any) => new StorageActions.getContainerSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.getContainerFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getFiles$ = this.actions$
    .ofType(StorageActionTypes.GET_FILES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.getFiles(action.payload.container).pipe(
          map((response: any) => new StorageActions.getFilesSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.getFilesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getFile$ = this.actions$
    .ofType(StorageActionTypes.GET_FILE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.getFile(action.payload.container, action.payload.file).pipe(
          map((response: any) => new StorageActions.getFileSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.getFileFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public removeFile$ = this.actions$
    .ofType(StorageActionTypes.REMOVE_FILE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.removeFile(action.payload.container, action.payload.file).pipe(
          map((response: any) => new StorageActions.removeFileSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.removeFileFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public upload$ = this.actions$
    .ofType(StorageActionTypes.UPLOAD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.upload(action.payload.container, action.payload.req, action.payload.res).pipe(
          map((response: any) => new StorageActions.uploadSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.uploadFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public download$ = this.actions$
    .ofType(StorageActionTypes.DOWNLOAD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storage.download(action.payload.container, action.payload.file, action.payload.req, action.payload.res).pipe(
          map((response: any) => new StorageActions.downloadSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new StorageActions.downloadFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() public create$;
  @Effect() public createMany$;
  @Effect() public findById$;
  @Effect() public find$;
  @Effect() public findOne$;
  @Effect() public updateAll$;
  @Effect() public deleteById$;
  @Effect() public updateAttributes$;
  @Effect() public upsert$;
  @Effect() public upsertWithWhere$;
  @Effect() public replaceOrCreate$;
  @Effect() public replaceById$;
  @Effect() public patchOrCreate$;
  @Effect() public patchAttributes$;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(StorageApi) public storage: StorageApi
  ) {
    super(actions$, storage, 'Storage', StorageActionTypes, StorageActions);
  }
}
