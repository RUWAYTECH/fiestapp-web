'use client'
import { useAuthStore } from '@stores/auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Navbar = () => {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	const user = useAuthStore(state => state.user)
	const [isClient, setIsClient] = useState(false)
	const { data: auth } = useSession()

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<>
			<header className="bg-background text-foreground border-b sticky top-0 z-50 shadow-sm h-10">
				<div className="max-w-5xl mx-auto flex items-center justify-between py-2 px-4">
					<div className="flex items-center space-x-4 text-sm text-accent-foreground">
						<span>FiestApp</span>
						<nav className="flex items-center">
							<Link href="/" className='px-2 '>Inicio</Link>
							<Link href="/categories" className='px-2'>Categorías</Link>
							<Link href="/contact" className='px-2'>Contacto</Link>
						</nav>
					</div>
					<div className="hidden sm:flex items-center space-x-4">
						<div className="hidden">
							{isAuthenticated() && isClient ? (
								<>
									<Link href="/profile">{user?.name}</Link>
									<button className="cursor-pointer ">Cerrar sesión</button>
								</>
							) : (
								<>
									<button className="cursor-pointer">Iniciar sesión</button>
									<Link href="/register">Registrarse</Link>
								</>
							)}
						</div>
						{auth ? (
							<>
								<Link href="/profile">{auth.user?.name}</Link>
								<button className="cursor-pointer " onClick={() => signOut()}>Cerrar sesión</button>
							</>
						) : (
							<>
								<Link href='/auth/login' className="cursor-pointer">Iniciar sesión</Link>
								<Link href="/register">Registrarse</Link>
							</>
						)}
					</div>
				</div>
			</header>
		</>
	)
}

export default Navbar