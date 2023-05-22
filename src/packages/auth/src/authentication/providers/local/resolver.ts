import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { AuthorizationContext } from '../../../types';
import { LocalAuthProvider } from './provider';
import { Token } from '../../schema/token';

@Resolver((of) => Token)
export class LocalAuthResolver {
	@Mutation(() => Token)
	async login(
		@Arg('email', () => String) email: string,
		@Arg('password', () => String) password: string,
		@Ctx() ctx: AuthorizationContext
	): Promise<Token> {
		const authProvider = new LocalAuthProvider();
		const userProfile = await authProvider.login(email, password);
		const authToken = await authProvider.generateAuthToken(userProfile);

		const token = Token.fromBackendEntity(authToken);
		if (!token) throw new Error('Login unsuccessful.');

		return token;
	}

	@Mutation(() => Boolean)
	logout(@Ctx() ctx: AuthorizationContext): boolean {
		return true;
	}

	@Mutation(() => Token)
	async refreshSession(
		@Arg('refreshToken', () => String) refreshToken: string,
		@Ctx() ctx: AuthorizationContext
	): Promise<Token> {
		const authProvider = new LocalAuthProvider();
		const authToken = await authProvider.refreshAuthToken(refreshToken);
		const token = Token.fromBackendEntity(authToken);

		if (!token) throw new Error('Auth Token not refreshed.');

		return token;
	}
}
