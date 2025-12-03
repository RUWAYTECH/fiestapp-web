import { NavLink } from '../custom/nav-link';
import { Container } from '../custom/container';
import { UserDropdown } from './user-dropdown';
import { CartDrawer } from '@/features/cart/components/cart-drawer';
import { MenuMobile } from './menu-mobile';

export async function Navbar() {
	return (
		<header className="bg-background text-foreground border-b sticky top-0 z-50 shadow-sm h-12">
			<Container className="flex items-center gap-x-4 py-2 px-4">
				{/* Logo y menú de escritorio */}
				<nav className="flex items-center gap-x-4 text-sm text-accent-foreground flex-1">
					<NavLink href="/" className="font-bold text-lg flex">
						<span className="text-foreground dark:text-popover">FIEST</span>
						<span className="text-primary">APP</span>
					</NavLink>
					<ul className="hidden sm:flex items-center">
						<NavLink href="/" exact>
							Inicio
						</NavLink>
						<NavLink href="/services">Servicios</NavLink>
						<NavLink href="/help">Centro de ayuda</NavLink>
					</ul>
				</nav>
				<CartDrawer />
				<UserDropdown />
				<div className="block sm:hidden">
					<MenuMobile />
				</div>
			</Container>
		</header>
	);
}
