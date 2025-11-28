'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { BriefcaseBusiness, HelpCircle, Home, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function MenuMobile() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" className="md:hidden px-2" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[250px] p-0">
				<SheetHeader>
					<SheetTitle></SheetTitle>
				</SheetHeader>
				<ul className="flex flex-col gap-4 px-6 text-lg">
					<Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
						<Home className="size-5" /> Inicio
					</Link>
					<Link href="/services" className="flex items-center gap-2" onClick={() => setOpen(false)}>
						<BriefcaseBusiness className="size-5" /> Servicios
					</Link>
					<Link href="/help" className="flex items-center gap-2" onClick={() => setOpen(false)}>
						<HelpCircle className="size-5" /> Centro de ayuda
					</Link>
				</ul>
			</SheetContent>
		</Sheet>
	);
}
