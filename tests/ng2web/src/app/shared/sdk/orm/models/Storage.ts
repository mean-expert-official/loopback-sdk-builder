/* tslint:disable */

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { Storage, LoopBackFilter } from '../../models';
import { StorageActions } from '../../actions';

export class OrmStorage extends OrmBase<Storage> {
  constructor(protected store: Store<Storage>, protected realTime?: RealTime) {
    super(store, Storage, StorageActions, realTime);
  }

	public getContainers(meta?: any): void {
    this.store.dispatch(new this.actions.getContainers(meta));
  }
  
	public createContainer(options: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createContainer(options, meta));
  }
  
	public destroyContainer(container: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.destroyContainer(container, meta));
  }
  
	public getContainer(container: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.getContainer(container, meta));
  }
  
	public getFiles(container: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.getFiles(container, meta));
  }
  
	public getFile(container: any = {}, file: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.getFile(container, file, meta));
  }
  
	public removeFile(container: any = {}, file: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.removeFile(container, file, meta));
  }
  
	public upload(req: any = {}, res: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.upload(req, res, meta));
  }
  
	public download(container: any = {}, file: any = {}, req: any = {}, res: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.download(container, file, req, res, meta));
  }
  }
