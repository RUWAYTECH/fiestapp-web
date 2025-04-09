import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { Toaster } from '@/components/ui/sonner'
import { geistMono, geistSans } from './fonts'
import './globals.css'
import Providers from './providers'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
	title: 'FiestApp',
	description: 'Encuentra todo para tu fiesta en un solo lugar.',
}

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const locale = await getLocale()

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-background text-foreground flex flex-col`}
			>
				<Providers>
					<NextIntlClientProvider>{children}</NextIntlClientProvider>
				</Providers>
				<Toaster position="top-right" expand closeButton />
				<GoogleAnalytics gaId="G-9T1XQ9MR26" />
			</body>
		</html>
	)
}