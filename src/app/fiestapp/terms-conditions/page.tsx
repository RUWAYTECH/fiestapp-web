'use client'

import AppLayout from '@components/containers/layout/layout'
import Head from 'next/head'

const TermsConditionsPage: React.FC = () => {

	return (
		<AppLayout>
			<div className="container mx-auto p-4">
				<Head>
					<title>Términos y Condiciones | FiestApp</title>
					<meta name="description" content="Términos y condiciones de uso de FiestApp" />
				</Head>
				<main className="max-w-4xl mx-auto p-6">
					<h1 className="text-3xl font-bold mb-4">Términos y Condiciones</h1>

					<p className="mb-4">
						Bienvenido a <strong>FiestApp</strong>. Al usar nuestros servicios, aceptas los siguientes términos y condiciones.
						Por favor, léelos cuidadosamente.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">1. Aceptación de los términos</h2>
					<p className="mb-4">
						Al registrarte o usar la aplicación, estás de acuerdo con estos términos. Si no estás de acuerdo, no debes usar la app.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">2. Uso adecuado de la plataforma</h2>
					<p className="mb-4">
						No se permite el uso de FiestApp para actividades ilegales, ofensivas o que infrinjan derechos de terceros.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">3. Responsabilidad</h2>
					<p className="mb-4">
						FiestApp no se hace responsable por el contenido generado por usuarios ni por los eventos organizados. Los usuarios son
						responsables de la veracidad y legalidad de la información que comparten.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">4. Modificaciones</h2>
					<p className="mb-4">
						Podemos modificar estos términos en cualquier momento. Te notificaremos si se hacen cambios importantes.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">5. Cancelación de cuenta</h2>
					<p className="mb-4">
						Podemos suspender o cancelar tu cuenta si se detecta un uso indebido o violación de estos términos.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">6. Contacto legal</h2>
					<p className="mb-4">
						Para dudas o consultas legales, puedes escribirnos a:{' '}
						<a href="mailto:legal@fiestapp.com" className="text-blue-600 underline">legal@fiestapp.com</a>
					</p>

					<p className="text-sm text-gray-500 mt-6">
						Última actualización: 16 de abril de 2025
					</p>
				</main>
			</div>
		</AppLayout>
	)
}

export default TermsConditionsPage