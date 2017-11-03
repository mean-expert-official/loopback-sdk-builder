/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, RoomCategory } from '../models';

export const RoomCategoryActionTypes = Object.assign(BaseLoopbackActionTypesFactory('RoomCategory'));

export const RoomCategoryActions = Object.assign(BaseLoopbackActionsFactory<RoomCategory>(RoomCategoryActionTypes));
