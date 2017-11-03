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
import { Core, CoreInterface, LoopBackFilter } from '../../models';
import { CoreActions } from '../../actions';

export class OrmCore extends OrmBase<Core | CoreInterface> {
  constructor(protected store: Store<Core>, protected realTime?: RealTime) {
    super(store, Core, CoreActions, realTime);
  }
}
