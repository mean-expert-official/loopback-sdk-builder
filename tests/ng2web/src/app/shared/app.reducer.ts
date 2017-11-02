import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { LoopbackAction, LoopbackErrorActionTypes } from './sdk';

export interface IAppState {
  error: string;
};

const initialState: IAppState = {
  error: null
};

export function reducer(state = initialState, action: LoopbackAction): IAppState {
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
