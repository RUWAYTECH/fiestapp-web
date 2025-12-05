import type { Metadata } from 'next';
import './globals.css';
import { geistMono, geistSans } from './fonts';
import Providers from './providers';
import { Layout } from '@/components/layout/layout';
import { Toaster } from '@/components/ui/sonner';
import { ConfirmDialog } from '@/components/custom/confirm-dialog';
import { GoogleAnalytics } from '@next/third-parties/google';
import { configEnv } from '@/core/config';

export const metadata: Metadata = {
	title: {
		default: 'FiestApp - Encuentra Servicios para tu Fiesta | Locales, Decoración y Más',
		template: '%s | FiestApp'
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', type: 'image/x-icon' },
			{ url: '/logo.png', type: 'image/png' }
		],
		shortcut: '/logo.png',
		apple: '/logo.png'
	},
	description:
		'Descubre y contrata los mejores servicios para fiestas: locales, decoración, tortas, animación, catering y más. Organiza eventos inolvidables en un solo lugar.',
	keywords: [
		'servicios para fiestas',
		'organizar eventos',
		'locales para fiestas',
		'decoración de fiestas',
		'tortas personalizadas',
		'animación infantil',
		'catering para eventos',
		'fiestas infantiles',
		'cumpleaños',
		'eventos sociales',
		'alquiler de locales',
		'fiestas Perú'
	],
	authors: [{ name: 'FiestApp' }],
	creator: 'RuwayTech',
	publisher: 'RuwayTech',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	openGraph: {
		type: 'website',
		locale: 'es_PE',
		url: 'https://fiestapp.pe',
		siteName: 'FiestApp',
		title: 'FiestApp - Encuentra Todo para tu Fiesta en un Solo Lugar',
		description:
			'Descubre y contrata los mejores servicios para fiestas: locales, decoración, tortas, animación y más.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'FiestApp - Servicios para Fiestas'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'FiestApp - Servicios para Fiestas',
		description: 'Encuentra locales, decoración, tortas y más para tu próximo evento.',
		images: ['/og-image.png']
	},
	verification: {
		google: configEnv.googleSearchConsole || ''
	},
	alternates: {
		canonical: 'https://fiestapp.pe'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-background text-foreground flex flex-col`}
			>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
				<Toaster position="top-center" richColors />
				<ConfirmDialog />
				<GoogleAnalytics gaId={configEnv.gaId} />
			</body>
		</html>
	);
}
