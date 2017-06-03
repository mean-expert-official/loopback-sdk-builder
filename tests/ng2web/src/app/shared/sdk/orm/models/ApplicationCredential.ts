/* tslint:disable */

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';
import { createIO } from '../io';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { ApplicationCredential, LoopBackFilter } from '../../models';
import { ApplicationCredentialActions } from '../../actions';

export class OrmApplicationCredential extends OrmBase<ApplicationCredential> {
  constructor(protected store: Store<ApplicationCredential>, protected realTime?: RealTime) {
    super(store, ApplicationCredential, ApplicationCredentialActions, realTime);
  }
}
