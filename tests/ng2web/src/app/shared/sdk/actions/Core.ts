/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Core } from '../models';

export const CoreActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Core'), {
});
export const CoreActions =
Object.assign(BaseLoopbackActionsFactory<Core>(CoreActionTypes), {
});