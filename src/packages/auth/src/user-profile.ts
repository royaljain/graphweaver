import { BaseDataEntity } from '@exogee/graphweaver';
import { AuthProvider } from './authentication/base-auth-token-provider';

export type UserProfileData = {
	provider: AuthProvider;
	id?: string;
	displayName?: string;
	name?: {
		familyName?: string;
		givenName?: string;
		middleName?: string;
	};
	email?: string;
	roles?: string[];
};

export class UserProfile implements BaseDataEntity {
	provider: AuthProvider;
	id?: string; // A unique identifier for the user, as generated by the service provider.
	displayName?: string; //The name of this user, suitable for display.
	name?: {
		familyName?: string; // The family name of this user, or "last name" in most Western languages.
		givenName?: string; // The given name of this user, or "first name" in most Western languages.
		middleName?: string; // The middle name of this user.
	};
	email?: string; // This users email address
	roles?: string[]; // The roles assigned to this user.

	constructor(userProfileData: UserProfileData) {
		this.provider = userProfileData.provider;
		this.id = userProfileData.id;
		this.displayName = userProfileData.displayName;
		this.name = userProfileData.name;
		this.email = userProfileData.email;
		this.roles = userProfileData.roles;
	}

	isReference(fieldName: string, dataField: any) {
		return false;
	}
	isCollection(fieldName: string, dataField: any) {
		return false;
	}
}