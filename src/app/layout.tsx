import type { Metadata } from 'next';
import './globals.css';
import { geistMono, geistSans } from './fonts';
import Providers from './providers';
import { Layout } from '@/components/layout/layout';
import { Toaster } from '@/components/ui/sonner';
import { ConfirmDialog } from '@/components/custom/confirm-dialog';

export const metadata: Metadata = {
	title: 'FiestApp',
	description: 'Encuentra todo para tu fiesta en un solo lugar.',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/favicon.ico'
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
			</body>
		</html>
	);
}
