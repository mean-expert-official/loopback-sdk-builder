import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { LoopbackErrorActionTypes } from './sdk';

export interface IAppState {
  error: string;
};

const initialState: IAppState = {
  error: null
};

export function reducer(state = initialState, action: Action): IAppState {
  switch (action.type) {
    case LoopbackErrorActionTypes.ERROR: {
      return {
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export function getAppState() {
  return (state$: Observable<any>) => state$
    .select((s) => s.app);
}
