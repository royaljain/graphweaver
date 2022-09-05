import { logger } from '@exogee/logger';
import { Role } from '@exogee/shared';
import { ForbiddenError } from 'apollo-server-lambda';

class AuthorizationContextImplementation {
	private currentUserRole?: Role;

	public clear() {
		this.currentUserRole = undefined;
	}

	public set(role: Role) {
		logger.trace(`Setting AuthorizationContext.currentUserRole to ${role}`);
		this.currentUserRole = role;
	}

	public get role() {
		if (!this.currentUserRole)
			throw new ForbiddenError('No roles have been set for the currently logged in user');
		return this.currentUserRole;
	}
}
export const AuthorizationContext = new AuthorizationContextImplementation();
