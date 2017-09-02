/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, ApplicationCredential } from '../models';

export const ApplicationCredentialActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('ApplicationCredential'), {
});
export const ApplicationCredentialActions =
Object.assign(BaseLoopbackActionsFactory<ApplicationCredential>(ApplicationCredentialActionTypes), {
});