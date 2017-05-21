import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { ApplicationCredential, LoopBackFilter } from '../../models';
import { ApplicationCredentialActions } from '../../actions';

export class OrmApplicationCredential extends OrmBase<ApplicationCredential> {
  constructor(protected store: Store<ApplicationCredential>) {
    super(store, ApplicationCredential, ApplicationCredentialActions);
  }
}
