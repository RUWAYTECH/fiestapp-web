'use client';

import { cn } from '@/core/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LinkProps {
	href: string;
	className?: string;
	exact?: boolean;
	children: React.ReactNode;
}

export function NavLink({ href, className, exact, children }: LinkProps) {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href);

	return (
		<Link
			href={href}
			className={cn('px-2 text-gray-600 hover:text-primary', isActive ? 'text-primary font-medium' : '', className)}
		>
			{children}
		</Link>
	);
}
