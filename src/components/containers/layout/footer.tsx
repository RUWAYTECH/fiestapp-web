import Link from 'next/link'

const Footer = () => {
	return (
		<footer className="w-full bg-pink-700 text-white py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 gap-8">
					<div className="space-y-3">
						<h3 className="font-semibold text-lg mb-4">FiestApp</h3>
						<nav className="flex flex-col space-y-2">
							<Link href="/fiestapp/about-us" className="hover:underline">
								Sobre nosotros
							</Link>
							<Link href="/fiestapp/privacy" className="hover:underline">
								Privacidad
							</Link>
						</nav>
					</div>
					<div className="space-y-3">
						<h3 className="font-semibold text-lg mb-4">Legal</h3>
						<nav className="flex flex-col space-y-2">
							<Link href="/fiestapp/terms-conditions" className="hover:underline">
								Términos y Condiciones
							</Link>
							<Link href="/registro-proveedor" className="hover:underline">
								Regístrate como proveedor
							</Link>
						</nav>
					</div>
				</div>
				<div className="mt-8 pt-6 border-t border-pink-500">
					<p className="text-sm">FiestApp © {new Date().getFullYear()}</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer