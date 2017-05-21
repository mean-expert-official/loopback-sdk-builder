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
import { UserCredential, LoopBackFilter } from '../../models';
import { UserCredentialActions } from '../../actions';

export class OrmUserCredential extends OrmBase<UserCredential> {
  constructor(protected store: Store<UserCredential>, protected realTime?: RealTime) {
    super(store, UserCredential, UserCredentialActions, realTime);
  }
}
