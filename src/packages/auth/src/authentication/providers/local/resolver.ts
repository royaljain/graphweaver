import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { AuthorizationContext } from '../../../types';
import { LocalAuthTokenProvider } from './provider';
import { Token } from '../../schema/token';
import { UserProfile } from '../../user-profile';

@Resolver((of) => Token, { isAbstract: true })
export abstract class LocalAuthResolver {
	abstract authenticate(username: string, password: string): Promise<UserProfile>;
	abstract authenticate(username: string, password: string): Promise<UserProfile>;

	@Mutation(() => Token)
	async login(
		@Arg('email', () => String) email: string,
		@Arg('password', () => String) password: string,
		@Ctx() ctx: AuthorizationContext
	): Promise<Token> {
		const tokenProvider = new LocalAuthTokenProvider();
		const userProfile = await this.authenticate(email, password);
		const authToken = await tokenProvider.generateToken(userProfile);

		const token = Token.fromBackendEntity(authToken);
		if (!token) throw new Error('Login unsuccessful.');

		return token;
	}
}
