import { Star } from 'lucide-react'
import Image from 'next/image'

interface ServiceByIdProps {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
    rating: number;
    priceMin: number;
    priceMax: number;
    address: string;
  }
}

const ShowByServiceId: React.FC<ServiceByIdProps> = ({ service }) => {

	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-col md:flex-row gap-6">
				<div className="w-full md:w-1/3">
					<Image
						src={service.image}
						alt={service.title}
						width={400}
						height={400}
						className="object-contain rounded-lg"
					/>
				</div>

				<div className="w-full md:w-2/3">
					<h1 className="text-3xl font-bold mb-2">{service.title}</h1>
					<div className="flex items-center mb-4">
						{[...Array(5)].map((_, index) => (
							<Star
								key={index}
								size={20}
								className={index < service.rating ? 'text-yellow-500' : 'text-gray-300'}
							/>
						))}
					</div>
					<p className="text-gray-600 mb-4">{service.description}</p>

					{/* Precio */}
					<div className="flex gap-6 mb-6">
						<div>
							<p className="text-xl font-bold">Desde</p>
							<p className="text-2xl text-red-500">S/{service.priceMin}</p>
						</div>
						<div>
							<p className="text-xl font-bold">Hasta</p>
							<p className="text-2xl text-red-500">S/{service.priceMax}</p>
						</div>
					</div>

					{/* Dirección del servicio */}
					<div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
						<i className="fas fa-map-marker-alt"></i> {/* Icono de ubicación */}
						<span>{service.address}</span>
					</div>

					{/* Botón de agregar al carrito */}
					<button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">
						Agregar al carrito
					</button>
				</div>
			</div>
		</div>
	)
}

export default ShowByServiceId