'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CartModal from '@app/request/components/modal-car'
import { LuShoppingCart, LuMenu, LuX } from 'react-icons/lu'
import useCartStore from '@stores/cart'

const Navbar = () => {
	const { data: auth } = useSession()
	const items = useCartStore((state) => state.items)

	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	const [isModalOpen, setIsModalOpen] = useState(false)

	// Función para abrir el modal del carrito
	const openCartModal = () => setIsModalOpen(true)
	const closeCartModal = () => setIsModalOpen(false)

	const isActive = (path: string) => {
		// Verifica si la ruta incluye "service" o "category" y si es la correcta
		if (pathname.includes('service') && path === '/service') {
			return 'text-red-500 font-bold'
		}
		if (pathname.includes('category') && path === '/category') {
			return 'text-red-500 font-bold'
		}
		if (pathname === path) {
			return 'text-red-500 font-bold'
		}
		return ''
	}
	return (
		<header className="bg-background text-foreground border-b sticky top-0 z-50 shadow-sm h-12">
			<div className="max-w-5xl mx-auto flex items-center justify-between py-2 px-4">
				{/* Logo y menú de escritorio */}
				<div className="flex items-center space-x-4 text-sm text-accent-foreground">
					<span className="font-bold text-lg">FiestApp</span>
					<nav className="hidden sm:flex items-center">
						<Link href="/" className={`px-2 ${isActive('/')}`}>Inicio</Link>
						<Link href="/service" className={`px-2 ${isActive('/service')}`}>Servicios</Link>
						<Link href="/contact" className='px-2'>Contacto</Link>
					</nav>
				</div>

				{/* Menú de usuario en escritorio */}
				<div className="hidden sm:flex items-center space-x-4">
					{auth ? (
						<>
							<Link href="#" className="font-medium">{auth.user?.name}</Link>
							<button className="cursor-pointer text-red-500" onClick={() => signOut()}>Cerrar sesión</button>
						</>
					) : (
						<>
							<Link href='/auth/login' className="cursor-pointer">Iniciar sesión</Link>
							<Link href="/auth/register">Registrarse</Link>
						</>
					)}
				</div>

				<div>
					<button onClick={openCartModal} className="relative">
						<LuShoppingCart className='size-6' />

						{items.length > 0 && (
							<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
								{items.length}
							</span>
						)}
					</button>
					<CartModal isOpen={isModalOpen} onClose={closeCartModal} />
				</div>

				{/* Botón de menú hamburguesa para móviles */}
				<button className="sm:hidden text-gray-600" onClick={() => setIsOpen(true)}>
					<LuMenu className="w-6 h-6" />
				</button>
			</div>

			{/* Fondo oscuro que cubre toda la pantalla, pero no sobre el Drawer */}
			<div className={`fixed inset-0 bg-black/50 z-40 ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>

			{/* Sidebar en móviles */}
			<div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
				<div className="p-[10px] flex justify-between items-center border-b">
					<span className="text-lg font-semibold">Menú</span>
					<button onClick={() => setIsOpen(false)} className="text-gray-600">
						<LuX className="w-6 h-6" />
					</button>
				</div>
				<nav className="flex flex-col p-4 space-y-4">
					<Link href="/" className={`px-2 ${isActive('/')}`} onClick={() => setIsOpen(false)}>Inicio</Link>
					<Link href="/service" className={`px-2 ${isActive('/service')}`} onClick={() => setIsOpen(false)}>Servicios</Link>
					<Link href="/contact" className='px-2' onClick={() => setIsOpen(false)}>Contacto</Link>
					<hr />
					{auth ? (
						<>
							<span className="text-gray-900 font-medium">{auth.user?.name}</span>
							<button className="text-red-500" onClick={() => { signOut(); setIsOpen(false) }}>Cerrar sesión</button>
						</>
					) : (
						<>
							<Link href='/auth/login' className="text-gray-700 hover:text-red-500" onClick={() => setIsOpen(false)}>Iniciar sesión</Link>
							<Link href="/auth/register" className="text-gray-700 hover:text-red-500" onClick={() => setIsOpen(false)}>Registrarse</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}

export default Navbar