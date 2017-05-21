import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { Core, LoopBackFilter } from '../../models';
import { CoreActions } from '../../actions';

export class OrmCore extends OrmBase<Core> {
  constructor(protected store: Store<Core>) {
    super(store, Core, CoreActions);
  }
}
