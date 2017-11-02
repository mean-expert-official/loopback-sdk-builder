/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Storage } from '../models';

export const StorageActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Storage'), {
  GET_CONTAINERS: type('[Storage] getContainers'),
  GET_CONTAINERS_SUCCESS: type('[Storage] getContainers success'),
  GET_CONTAINERS_FAIL: type('[Storage] getContainers fail'),

  CREATE_CONTAINER: type('[Storage] createContainer'),
  CREATE_CONTAINER_SUCCESS: type('[Storage] createContainer success'),
  CREATE_CONTAINER_FAIL: type('[Storage] createContainer fail'),

  DESTROY_CONTAINER: type('[Storage] destroyContainer'),
  DESTROY_CONTAINER_SUCCESS: type('[Storage] destroyContainer success'),
  DESTROY_CONTAINER_FAIL: type('[Storage] destroyContainer fail'),

  GET_CONTAINER: type('[Storage] getContainer'),
  GET_CONTAINER_SUCCESS: type('[Storage] getContainer success'),
  GET_CONTAINER_FAIL: type('[Storage] getContainer fail'),

  GET_FILES: type('[Storage] getFiles'),
  GET_FILES_SUCCESS: type('[Storage] getFiles success'),
  GET_FILES_FAIL: type('[Storage] getFiles fail'),

  GET_FILE: type('[Storage] getFile'),
  GET_FILE_SUCCESS: type('[Storage] getFile success'),
  GET_FILE_FAIL: type('[Storage] getFile fail'),

  REMOVE_FILE: type('[Storage] removeFile'),
  REMOVE_FILE_SUCCESS: type('[Storage] removeFile success'),
  REMOVE_FILE_FAIL: type('[Storage] removeFile fail'),

  UPLOAD: type('[Storage] upload'),
  UPLOAD_SUCCESS: type('[Storage] upload success'),
  UPLOAD_FAIL: type('[Storage] upload fail'),

  DOWNLOAD: type('[Storage] download'),
  DOWNLOAD_SUCCESS: type('[Storage] download success'),
  DOWNLOAD_FAIL: type('[Storage] download fail'),

});
export const StorageActions =
Object.assign(BaseLoopbackActionsFactory<Storage>(StorageActionTypes), {

  /**
   * getContainers Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {any} meta (optional).
   * 
   */
  getContainers: class implements Action {
    public readonly type = StorageActionTypes.GET_CONTAINERS;
      
    constructor(public meta?: any) {}
  },
  /**
   * getContainersSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getContainersSuccess: class implements Action {
    public readonly type = StorageActionTypes.GET_CONTAINERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getContainersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getContainersFail: class implements Action {
    public readonly type = StorageActionTypes.GET_CONTAINERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createContainer Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createContainer: class implements Action {
    public readonly type = StorageActionTypes.CREATE_CONTAINER;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * createContainerSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createContainerSuccess: class implements Action {
    public readonly type = StorageActionTypes.CREATE_CONTAINER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createContainerFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createContainerFail: class implements Action {
    public readonly type = StorageActionTypes.CREATE_CONTAINER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyContainer Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {any} meta (optional).
   * 
   */
  destroyContainer: class implements Action {
    public readonly type = StorageActionTypes.DESTROY_CONTAINER;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * destroyContainerSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `` – `{}` - 
   * @param {any} meta (optional).
   * 
   */
  destroyContainerSuccess: class implements Action {
    public readonly type = StorageActionTypes.DESTROY_CONTAINER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * destroyContainerFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyContainerFail: class implements Action {
    public readonly type = StorageActionTypes.DESTROY_CONTAINER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getContainer Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {any} meta (optional).
   * 
   */
  getContainer: class implements Action {
    public readonly type = StorageActionTypes.GET_CONTAINER;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * getContainerSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getContainerSuccess: class implements Action {
    public readonly type = StorageActionTypes.GET_CONTAINER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getContainerFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getContainerFail: class implements Action {
    public readonly type = StorageActionTypes.GET_CONTAINER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getFiles Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {any} meta (optional).
   * 
   */
  getFiles: class implements Action {
    public readonly type = StorageActionTypes.GET_FILES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * getFilesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getFilesSuccess: class implements Action {
    public readonly type = StorageActionTypes.GET_FILES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getFilesFail: class implements Action {
    public readonly type = StorageActionTypes.GET_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getFile Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {string} file 
   * @param {any} meta (optional).
   * 
   */
  getFile: class implements Action {
    public readonly type = StorageActionTypes.GET_FILE;
      public payload: {container: any, file: any};

    constructor(container: any, file: any, customHeaders?: Function, public meta?: any) {
      this.payload = {container, file};
    }
  },
  /**
   * getFileSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getFileSuccess: class implements Action {
    public readonly type = StorageActionTypes.GET_FILE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getFileFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getFileFail: class implements Action {
    public readonly type = StorageActionTypes.GET_FILE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * removeFile Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {string} file 
   * @param {any} meta (optional).
   * 
   */
  removeFile: class implements Action {
    public readonly type = StorageActionTypes.REMOVE_FILE;
      public payload: {container: any, file: any};

    constructor(container: any, file: any, customHeaders?: Function, public meta?: any) {
      this.payload = {container, file};
    }
  },
  /**
   * removeFileSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `` – `{}` - 
   * @param {any} meta (optional).
   * 
   */
  removeFileSuccess: class implements Action {
    public readonly type = StorageActionTypes.REMOVE_FILE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * removeFileFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  removeFileFail: class implements Action {
    public readonly type = StorageActionTypes.REMOVE_FILE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * upload Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {object} data Request data.
   *
   *  - `req` – `{object}` - 
   *
   *  - `res` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  upload: class implements Action {
    public readonly type = StorageActionTypes.UPLOAD;
      public payload: {container: any, req: any, res: any};

    constructor(container: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {container, req, res};
    }
  },
  /**
   * uploadSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  uploadSuccess: class implements Action {
    public readonly type = StorageActionTypes.UPLOAD_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * uploadFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  uploadFail: class implements Action {
    public readonly type = StorageActionTypes.UPLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * download Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {string} file 
   * @param {object} req 
   * @param {object} res 
   * @param {any} meta (optional).
   * 
   */
  download: class implements Action {
    public readonly type = StorageActionTypes.DOWNLOAD;
      public payload: {container: any, file: any, req: any, res: any};

    constructor(container: any, file: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {container, file, req, res};
    }
  },
  /**
   * downloadSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  downloadSuccess: class implements Action {
    public readonly type = StorageActionTypes.DOWNLOAD_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * downloadFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  downloadFail: class implements Action {
    public readonly type = StorageActionTypes.DOWNLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});