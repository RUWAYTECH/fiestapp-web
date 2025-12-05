export const configEnv = {
	apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
	googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
	authSecret: process.env.AUTH_SECRET,
	cloudinary: {
		url: process.env.NEXT_PUBLIC_CLOUDINARY_URL ?? '',
		prset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET ?? ''
	},
	paymentNumber: process.env.NEXT_PUBLIC_PAYMENT_NUMBER ?? '',
	paymentBank: process.env.NEXT_PUBLIC_PAYMENT_BANK ?? '',
	gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
	googleSearchConsole: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE ?? '',
	providerWebsite: process.env.NEXT_PUBLIC_PROVIDER_WEBSITE ?? ''
};
