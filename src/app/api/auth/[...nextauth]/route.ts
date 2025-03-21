import { config } from '@config/config'
import NextAuth from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ApiResponseDto, User } from '@/types'

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
			}
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Usuario', type: 'text' },
				password: { label: 'Contraseña', type: 'password' },
			},
			async authorize(credentials) {
				const res = await fetch(`${config.apiUrl}/auth/login`, {
					method: 'POST',
					body: JSON.stringify({ userName: credentials?.username, password: credentials?.password }),
					headers: { 'Content-Type': 'application/json' }
				})

				const { data } = await res.json() as ApiResponseDto<{ accessToken: string, user: User }>

				if (res.ok && data) {
					return {
						id: data.user.userId,
						name: data.user.name,
						email: data.user.email,
						image: data.user.picture,
						accessToken: data.accessToken
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

				const res = await fetch(`${config.apiUrl}/auth/login/google`, {
					method: 'POST',
					body: JSON.stringify({ token: account.id_token }),
					headers: { 'Content-Type': 'application/json' }
				})

				const json = await res.json() as ApiResponseDto<{ accessToken: string, user: User }>

				if (res.ok && json?.data) {
					account.accessToken = json.data.accessToken
					user.id = json.data.user.userId
					user.name = json.data.user.name
					user.email = json.data.user.email
					user.image = json.data.user.picture

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