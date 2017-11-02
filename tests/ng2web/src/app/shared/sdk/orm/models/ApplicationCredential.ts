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
import { ApplicationCredential, ApplicationCredentialInterface, LoopBackFilter } from '../../models';
import { ApplicationCredentialActions } from '../../actions';

export class OrmApplicationCredential extends OrmBase<ApplicationCredential | ApplicationCredentialInterface> {
  constructor(protected store: Store<ApplicationCredential>, protected realTime?: RealTime) {
    super(store, ApplicationCredential, ApplicationCredentialActions, realTime);
  }
}
