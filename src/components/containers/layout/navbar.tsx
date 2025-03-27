'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
	const { data: auth } = useSession()
	const pathname = usePathname()
	return (
		<>
			<header className="bg-background text-foreground border-b sticky top-0 z-50 shadow-sm h-10">
				<div className="max-w-5xl mx-auto flex items-center justify-between py-2 px-4">
					<div className="flex items-center space-x-4 text-sm text-accent-foreground">
						<span>FiestApp</span>
						<nav className="flex items-center">
							<Link href="/" className={`px-2 ${pathname === '/' ? 'text-red-500 font-bold' : ''}`}>Inicio</Link>
							<Link href="/category" className={`px-2 ${pathname === '/category' ? 'text-red-500 font-bold' : ''}`}>Categorías</Link>
							<Link href="/contact" className='px-2'>Contacto</Link>
						</nav>
					</div>
					<div className="hidden sm:flex items-center space-x-4">
						{auth ? (
							<>
								<Link href="#">{auth.user?.name}</Link>
								<button className="cursor-pointer " onClick={() => signOut()}>Cerrar sesión</button>
							</>
						) : (
							<>
								<Link href='/auth/login' className="cursor-pointer">Iniciar sesión</Link>
								<Link href="/auth/register">Registrarse</Link>
							</>
						)}
					</div>
				</div>
			</header>
		</>
	)
}

export default Navbar