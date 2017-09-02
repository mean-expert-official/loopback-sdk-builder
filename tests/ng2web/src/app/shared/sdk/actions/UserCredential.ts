/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, UserCredential } from '../models';

export const UserCredentialActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('UserCredential'), {
});
export const UserCredentialActions =
Object.assign(BaseLoopbackActionsFactory<UserCredential>(UserCredentialActionTypes), {
});