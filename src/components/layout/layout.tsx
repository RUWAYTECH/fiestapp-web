import { Footer } from './footer';
import { Navbar } from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="grow py-4 flex flex-col">{children}</main>
			<Footer />
		</div>
	);
}
