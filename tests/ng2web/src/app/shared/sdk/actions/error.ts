/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';

/**
 * @module LoopbackErrorActionTypes
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack error action types to centralize error message handling.
 */
export const LoopbackErrorActionTypes = {
  ERROR: type('[LoopbackError] Error'),
};

/**
 * @module LoopbackErrorActions
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack error actions to centralize error message handling.
 */
export const LoopbackErrorActions = {
  error: class implements Action {
    public readonly type = LoopbackErrorActionTypes.ERROR;

    constructor(public payload: any, public meta?: any) { }
  }
};
