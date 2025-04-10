'use client'

import { useState } from 'react'
import { FaStore, FaBirthdayCake, FaMagic, FaUsers } from 'react-icons/fa'

const faqCategories = [
	{
		title: 'Locales para eventos',
		icon: <FaStore className="w-6 h-6 text-primary" />,
		questions: [
			{
				question: '¿Cómo puedo reservar un local?',
				answer:
					'Puedes reservar un local seleccionando la fecha y el lugar en nuestra plataforma. Luego, sigue las instrucciones para confirmar tu reserva.',
			},
			{
				question: '¿Los locales incluyen mobiliario?',
				answer:
					'Algunos locales incluyen mobiliario básico como mesas y sillas. Consulta los detalles en la descripción del local.',
			},
		],
	},
	{
		title: 'Tortas y catering',
		icon: <FaBirthdayCake className="w-6 h-6 text-primary" />,
		questions: [
			{
				question: '¿Puedo personalizar mi torta?',
				answer:
					'Sí, ofrecemos opciones de personalización para tortas. Puedes elegir el diseño, sabor y tamaño.',
			},
			{
				question: '¿Cuánto tiempo antes debo hacer un pedido?',
				answer:
					'Recomendamos hacer tu pedido al menos 7 días antes del evento para garantizar disponibilidad.',
			},
		],
	},
	{
		title: 'Decoración y animación',
		icon: <FaMagic className="w-6 h-6 text-primary" />,
		questions: [
			{
				question: '¿Qué incluye el servicio de decoración?',
				answer:
					'El servicio de decoración incluye globos, centros de mesa, y otros elementos según el paquete seleccionado.',
			},
			{
				question: '¿Ofrecen animación para niños?',
				answer:
					'Sí, contamos con animadores especializados en eventos infantiles.',
			},
		],
	},
	{
		title: 'Organización de eventos',
		icon: <FaUsers className="w-6 h-6 text-primary" />,
		questions: [
			{
				question: '¿Pueden organizar eventos corporativos?',
				answer:
					'Sí, ofrecemos servicios de organización para eventos corporativos, incluyendo reuniones y conferencias.',
			},
			{
				question: '¿Qué incluye el servicio de planificación?',
				answer:
					'Incluye la coordinación de proveedores, decoración, catering y supervisión durante el evento.',
			},
		],
	},
]

export default function FAQAccordion() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	const toggleAccordion = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index)
	}

	return (
		<div className="space-y-8">
			{faqCategories.map((category, index) => (
				<div key={index} className="border rounded-lg shadow-md">
					<div
						className="flex items-center justify-between p-4 cursor-pointer"
						onClick={() => toggleAccordion(index)}
					>
						<div className="flex items-center gap-4">
							{category.icon}
							<h2 className="text-lg font-semibold text-gray-800">
								{category.title}
							</h2>
						</div>
						<span className="text-gray-600">
							{activeIndex === index ? '-' : '+'}
						</span>
					</div>
					{activeIndex === index && (
						<div className="p-4 space-y-4 bg-gray-50">
							{category.questions.map((faq, i) => (
								<div key={i}>
									<h3 className="text-base font-medium text-gray-700">
										{faq.question}
									</h3>
									<p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	)
}