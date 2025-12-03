'use client';

import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
	return (
		<Button variant="ghost" onClick={() => signOut()} className="w-full justify-start">
			<LogOut className="size-4 text-current" />
			Cerrar Sesión
		</Button>
	);
}
