import { FileText, Heart, HelpCircle, Home } from 'lucide-react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { Container } from '@/components/custom/container';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import SignOutButton from '@/components/layout/sign-out-button';

interface MenuItem {
	id: string;
	label: string;
	href: string;
	icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
	{
		id: 'profile',
		label: 'Perfil',
		href: '/profile',
		icon: <Home className="w-5 h-5 text-gray-600" />
	},
	{
		id: 'requests',
		label: 'Mis Cotizaciones',
		href: '/requests',
		icon: <FileText className="w-5 h-5 text-gray-600" />
	},
	{
		id: 'favorites',
		label: 'Favoritos',
		href: '/profile/favorites',
		icon: <Heart className="w-5 h-5 text-gray-600" />
	},
	{
		id: 'help',
		label: 'Ayuda y Soporte',
		href: '/help',
		icon: <HelpCircle className="w-5 h-5 text-gray-600" />
	}
];

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<Container className="flex flex-col md:grid md:grid-cols-[24rem_1fr] md:[grid-template-areas:'aside_content'] gap-4">
			<aside className="hidden md:block md:[grid-area:aside]">
				<Card className="p-4 gap-y-0">
					<h1 className="text-xl font-bold text-center">Mi Perfil</h1>
					<div className="flex items-center justify-center mt-4">
						<Avatar className="w-24 h-24">
							<AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || 'User Avatar'} />
							<AvatarFallback>{session?.user?.name ? session.user.name.charAt(0) : 'U'}</AvatarFallback>
						</Avatar>
					</div>
					<h2 className="text-xl font-bold mt-2 text-center">{session?.user?.name}</h2>
					<p className="text-gray-500 text-sm text-center">{session?.user?.email}</p>
					<nav className="mt-6">
						<ul className="flex flex-col space-y-2">
							{menuItems.map(item => (
								<li key={item.id}>
									<Link href={item.href} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
										{item.icon}
										{item.label}
									</Link>
								</li>
							))}
							<li>
								<SignOutButton />
							</li>
						</ul>
					</nav>
				</Card>
			</aside>
			<div className="md:[grid-area:content]">{children}</div>
		</Container>
	);
}
