import { Container } from '@/components/custom/container';
import FAQAcordion from '@/features/help/components/faq-acordion';

export default function HelpPage() {
	return (
		<Container>
			<h1 className="text-3xl font-bold text-center text-primary mb-8">Centro de Ayuda</h1>
			<p className="text-center text-gray-700 mb-12">
				Encuentra respuestas a tus preguntas frecuentes sobre nuestros servicios.
			</p>
			<FAQAcordion />
		</Container>
	);
}
