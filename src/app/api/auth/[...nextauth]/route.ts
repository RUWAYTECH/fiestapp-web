import { config } from '@config/config'
import NextAuth from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ApiResponseDto } from '@/types'
import { LoginResponseDto } from '@stateManagement/models/auth/login'

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: config.googleClientId,
			clientSecret: config.googleClientSecret,
			authorization: {
				params: {
					prompt: 'select_account',
					access_type: 'offline',
					response_type: 'code',
				}
			},
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Correo electrónico', type: 'email' },
				password: { label: 'Contraseña', type: 'password' },
			},
			async authorize(credentials) {
				const res = await fetch(`${config.apiUrl}/auth/local`, {
					method: 'POST',
					body: JSON.stringify({ identifier: credentials?.email, password: credentials?.password }),
					headers: { 'Content-Type': 'application/json' }
				})

				const data = await res.json() as ApiResponseDto<LoginResponseDto>

				if (res.ok && data) {
					return {
						id: data.user.id.toString(),
						name: data.user.username,
						email: data.user.email,
						image: '',
						accessToken: data.jwt
					}
				} else {
					return null
				}
			}
		})
	],
	pages: {
		signIn: '/auth/login',
		error: '/auth/login'
	},
	callbacks: {
		async signIn({ user, account }) {// 1. only signin
			if (account?.provider === 'google') {
				if (!account.id_token) return false

				const res = await fetch(`${config.apiUrl}/auth/${account.provider}/callback?access_token=${account.access_token}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' }
				})

				const data = await res.json() as ApiResponseDto<LoginResponseDto>

				if (res.ok && data?.user) {
					account.accessToken = data.jwt
					user.id = data.user.id.toString()
					user.name = data.user.username
					user.email = data.user.email
					user.image = ''

					return true
				}

				return false
			}

			if (account?.provider === 'credentials') {
				account.accessToken = user.accessToken

				return true
			}

			return false
		},
		async jwt({ token, account }) {// 2.
			if (account) {
				token.accessToken = account.accessToken
			}

			return token
		},
		async session({ session, token }) {// 3.
			session.accessToken = token.accessToken as string

			return session
		},
		async redirect({ baseUrl, url }) {
			if (url.includes('auth/login')) {
				return baseUrl
			}

			return url
		}
	},
	secret: config.authSecret
})

export { handler as GET, handler as POST }