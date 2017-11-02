/* tslint:disable */

import { map, finalize } from 'rxjs/operators'
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';
import { createIO } from '../io';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter, toArray, filterById } from '../filter';

import * as models from '../../models';
import { UserCredential, UserCredentialInterface, LoopBackFilter } from '../../models';
import { UserCredentialActions } from '../../actions';

export class OrmUserCredential extends OrmBase<UserCredential | UserCredentialInterface> {
  constructor(protected store: Store<UserCredential>, protected realTime?: RealTime) {
    super(store, UserCredential, UserCredentialActions, realTime);
  }
}
