import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import Link from 'next/link';
import SignOutButton from './sign-out-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function UserDropdown() {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	return (
		<>
			{user ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="cursor-pointer">
							<AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
							<AvatarFallback className="bg-transparent hover:text-primary">
								<User className="h-5 w-5" />
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuLabel>
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{user.name}</p>
								<p className="text-xs leading-none text-muted-foreground">{user.email}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/profile" className="cursor-pointer">
								Mi Perfil
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/requests" className="cursor-pointer">
								Mis cotizaciones
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/profile/favorites" className="cursor-pointer">
								Favoritos
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/help" className="cursor-pointer">
								Ayuda y Soporte
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<SignOutButton />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Link href="/auth/login" className="p-2 rounded-md hover:text-primary transition-colors">
					<User className="h-5 w-5" />
				</Link>
			)}
		</>
	);
}
