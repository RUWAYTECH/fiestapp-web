'use client'

import AppLayout from '@components/containers/layout/layout'
import Head from 'next/head'

const PrivacyPage: React.FC = () => {

	return (
		<AppLayout>
			<div className="container mx-auto p-4">
				<Head>
					<title>Política de Privacidad | FiestApp</title>
					<meta name="description" content="Política de privacidad de FiestApp" />
				</Head>
				<main className="max-w-4xl mx-auto p-6">
					<h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
					<p className="mb-4">
						En FiestApp, respetamos tu privacidad y nos comprometemos a proteger la información personal que compartes con nosotros.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">1. Información que recopilamos</h2>
					<ul className="list-disc pl-6 mb-4">
						<li>Datos personales (nombre, correo electrónico, etc.)</li>
						<li>Información sobre eventos creados o a los que te unes</li>
						<li>Datos de uso de la aplicación</li>
					</ul>

					<h2 className="text-2xl font-semibold mt-6 mb-2">2. Uso de la información</h2>
					<p className="mb-4">
						Utilizamos la información para mejorar FiestApp, ofrecerte una mejor experiencia, y mantener la seguridad de la plataforma.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">3. Compartir información</h2>
					<p className="mb-4">
						No compartimos tu información personal con terceros sin tu consentimiento, salvo en casos requeridos por ley.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">4. Seguridad</h2>
					<p className="mb-4">
						Implementamos medidas de seguridad adecuadas para proteger tu información.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">5. Tus derechos</h2>
					<p className="mb-4">
						Puedes acceder, modificar o eliminar tus datos personales en cualquier momento desde tu perfil o contactándonos.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">6. Cambios en esta política</h2>
					<p className="mb-4">
						Podemos actualizar esta política ocasionalmente. Te notificaremos si se realizan cambios importantes.
					</p>

					<h2 className="text-2xl font-semibold mt-6 mb-2">7. Contacto</h2>
					<p className="mb-4">
						Si tienes preguntas, puedes contactarnos a: <a href="mailto:privacidad@fiestapp.com" className="text-blue-600 underline">privacidad@fiestapp.com</a>
					</p>

					<p className="text-sm text-gray-500 mt-6">
						Última actualización: 16 de abril de 2025
					</p>
				</main>
			</div>
		</AppLayout>
	)
}

export default PrivacyPage