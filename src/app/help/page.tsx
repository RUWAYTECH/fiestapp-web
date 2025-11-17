'use client'

import AppLayout from '@components/containers/layout/layout'
import FAQAccordion from './components/FAQAccordion'

export default function HelpCenterPage() {
	return (
		<AppLayout>
			<section className="py-12">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl font-bold text-center text-primary mb-8">
						Centro de Ayuda
					</h1>
					<p className="text-center text-gray-700 mb-12">
						Encuentra respuestas a tus preguntas frecuentes sobre nuestros
						servicios.
					</p>
					<FAQAccordion />
				</div>
			</section>
		</AppLayout>
	)
}