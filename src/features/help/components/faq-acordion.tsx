import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Cake, Store, Users, WandSparkles } from 'lucide-react';

const faqs = [
	{
		title: 'Locales para eventos',
		icon: <Store className="w-6 h-6 text-primary" />,
		questions: [
			{
				question: '¿Cómo puedo reservar un local?',
				answer:
					'Puedes reservar un local seleccionando la fecha y el lugar en nuestra plataforma. Luego, sigue las instrucciones para confirmar tu reserva.'
			},
			{
				question: '¿Los locales incluyen mobiliario?',
				answer:
					'Algunos locales incluyen mobiliario básico como mesas y sillas. Consulta los detalles en la descripción del local.'
			}
		]
	},
	{
		title: 'Tortas y catering',
		icon: <Cake className="w-6 h-6 text-primary" />,
		questions: [
			{
				question: '¿Puedo personalizar mi torta?',
				answer: 'Sí, ofrecemos opciones de personalización para tortas. Puedes elegir el diseño, sabor y tamaño.'
			},
			{
				question: '¿Cuánto tiempo antes debo hacer un pedido?',
				answer: 'Recomendamos hacer tu pedido al menos 7 días antes del evento para garantizar disponibilidad.'
			}
		]
	},
	{
		title: 'Decoración y animación',
		icon: <WandSparkles className="w-6 h-6 text-primary" />,
		questions: [
			{
				question: '¿Qué incluye el servicio de decoración?',
				answer:
					'El servicio de decoración incluye globos, centros de mesa, y otros elementos según el paquete seleccionado.'
			},
			{
				question: '¿Ofrecen animación para niños?',
				answer: 'Sí, contamos con animadores especializados en eventos infantiles.'
			}
		]
	},
	{
		title: 'Organización de eventos',
		icon: <Users className="w-6 h-6 text-primary" />,
		questions: [
			{
				question: '¿Pueden organizar eventos corporativos?',
				answer:
					'Sí, ofrecemos servicios de organización para eventos corporativos, incluyendo reuniones y conferencias.'
			},
			{
				question: '¿Qué incluye el servicio de planificación?',
				answer: 'Incluye la coordinación de proveedores, decoración, catering y supervisión durante el evento.'
			}
		]
	}
];

export default function FAQAcordion() {
	return (
		<Accordion type="multiple" className="w-full space-y-4 my-2">
			{faqs.map((faq, index) => (
				<AccordionItem key={index} value={`item-${index}`} className="border! rounded-lg">
					<AccordionTrigger className="flex items-center gap-3 py-4 px-5">
						<span className="text-lg font-medium flex items-center gap-3">
							{faq.icon} {faq.title}
						</span>
					</AccordionTrigger>
					<AccordionContent>
						{faq.questions.map((q, qIndex) => (
							<div key={qIndex} className="border-t px-5 py-4 first:border-t-0">
								<h4 className="font-semibold">{q.question}</h4>
								<p className="mt-2 text-sm text-muted-foreground">{q.answer}</p>
							</div>
						))}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
