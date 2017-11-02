/* tslint:disable */
import { AuthGuard } from './auth.guard';
import { UserExistsGuard } from './User';
import { AccountExistsGuard } from './Account';
import { ApplicationCredentialExistsGuard } from './ApplicationCredential';
import { CategoryExistsGuard } from './Category';
import { CoreExistsGuard } from './Core';
import { LikeExistsGuard } from './Like';
import { MessageExistsGuard } from './Message';
import { RoomExistsGuard } from './Room';
import { RoomAccountExistsGuard } from './RoomAccount';
import { RoomAdminExistsGuard } from './RoomAdmin';
import { StorageExistsGuard } from './Storage';
import { UserCredentialExistsGuard } from './UserCredential';
import { UserIdentityExistsGuard } from './UserIdentity';

export const LOOPBACK_GUARDS_PROVIDERS = [
  AuthGuard,
	UserExistsGuard,
	AccountExistsGuard,
	ApplicationCredentialExistsGuard,
	CategoryExistsGuard,
	CoreExistsGuard,
	LikeExistsGuard,
	MessageExistsGuard,
	RoomExistsGuard,
	RoomAccountExistsGuard,
	RoomAdminExistsGuard,
	StorageExistsGuard,
	UserCredentialExistsGuard,
	UserIdentityExistsGuard,
];

export * from './auth.guard';
export * from './User';
export * from './Account';
export * from './ApplicationCredential';
export * from './Category';
export * from './Core';
export * from './Like';
export * from './Message';
export * from './Room';
export * from './RoomAccount';
export * from './RoomAdmin';
export * from './Storage';
export * from './UserCredential';
export * from './UserIdentity';
