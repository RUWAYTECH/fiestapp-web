import { configEnv } from '@/core/config';
import { AuthProviderEnum } from '@/core/constants/auth-provider';
import { AuthService } from '@/features/auth/services/auth.service';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: configEnv.googleClientId || '',
			clientSecret: configEnv.googleClientSecret || '',
			authorization: {
				params: {
					prompt: 'select_account',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Correo electrónico', type: 'email' },
				password: { label: 'Contraseña', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials) return null;

				try {
					const { data } = await AuthService.login({
						email: credentials.email,
						password: credentials.password
					});

					if (data.user) {
						return {
							id: data.user.id,
							name: data.user.name,
							email: data.user.email,
							image: data.user.picture,
							accessToken: data.token
						};
					} else {
						return null;
					}
				} catch (error) {
					console.error('Error during authentication:', error);
					return null;
				}
			}
		})
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === 'credentials') {
				account.accessToken = user.accessToken;
				return true;
			} else if (account?.provider === 'google') {
				try {
					if (!account.id_token) return false;

					const { data } = await AuthService.signInWithOauthProvider({
						provider: AuthProviderEnum.GOOGLE,
						token: account.id_token
					});

					account.accessToken = data?.token;

					user.id = data.user.id;
					user.name = data.user.name;
					user.email = data.user.email;
					user.image = data.user.picture;

					return true;
				} catch (error) {
					console.log('Error during Provider sign in:', error);
					return false;
				}
			}

			return false;
		},
		async jwt({ token, account, session, trigger }) {
			if (trigger === 'update' && session?.user) {
				token.name = session.user.name;
			} else {
				if (account) {
					token.accessToken = account.accessToken;
				}
			}

			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string;
			if (session.user) {
				session.user.id = token.sub as string;
			}

			return session;
		},
		async redirect({ url, baseUrl }) {
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		}
	},
	pages: {
		signIn: '/auth/login',
		signOut: '/auth/login',
		error: '/auth/login',
		newUser: '/auth/register',
		verifyRequest: '/auth/verify-request'
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
