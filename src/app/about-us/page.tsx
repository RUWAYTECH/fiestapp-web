import { Container } from '@/components/custom/container';

export default function AboutUsPage() {
	return (
		<Container className="pt-10">
			<h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>

			<p className="mb-4">
				En <strong>FiestApp</strong>, creemos que las mejores experiencias nacen de compartir momentos. Nuestra misión
				es ayudarte a organizar eventos inolvidables con facilidad, seguridad y diversión.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">¿Quiénes somos?</h2>
			<p className="mb-4">
				Somos un equipo apasionado por la tecnología y la celebración. Combinamos innovación y experiencia en desarrollo
				de software para crear una plataforma pensada para conectar a personas a través de eventos.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">Nuestra visión</h2>
			<p className="mb-4">
				Convertirnos en la app número uno para organizar, descubrir y disfrutar de fiestas y eventos sociales en toda
				Latinoamérica.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">Contacto</h2>
			<p className="mb-4">
				¿Tienes alguna idea, sugerencia o simplemente quieres saludarnos? Escríbenos a:{' '}
				<a href="mailto:hola@fiestapp.com" className="text-blue-600 underline">
					hola@fiestapp.com
				</a>
			</p>
		</Container>
	);
}
