export const config = {
	apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
	googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
	authSecret: process.env.AUTH_SECRET
}