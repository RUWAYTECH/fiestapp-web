'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react'

interface ServiceDetailProps {
	service: {
		title: string;
		description: string;
		rating: number;
		priceMin: number;
		priceMax: number;
		address: string;
		images: string[];
	}
}
export default function ShowByServiceId({ service }: ServiceDetailProps) {
	const [selectedImage, setSelectedImage] = useState(service.images?.[0])
	const [isFavorite, setIsFavorite] = useState(false)

	const [scale, setScale] = useState(1)
	const [offset, setOffset] = useState({ x: 0, y: 0 })

	const handleNextImage = () => {
		const currentIndex = service.images.indexOf(selectedImage)
		const nextIndex = (currentIndex + 1) % service.images.length
		setSelectedImage(service.images[nextIndex])
	}

	const handlePrevImage = () => {
		const currentIndex = service.images.indexOf(selectedImage)
		const prevIndex = (currentIndex - 1 + service.images.length) % service.images.length
		setSelectedImage(service.images[prevIndex])
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
		const x = (e.clientX - left) / width
		const y = (e.clientY - top) / height

		setOffset({ x, y })
	}

	const handleMouseEnter = () => {
		setScale(2)
	}

	const handleMouseLeave = () => {
		setScale(1)
	}

	return (
		<>
			<div className="mb-8 flex flex-wrap items-center">
				<button
					className="text-blue-600 hover:text-blue-700 flex items-center px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:underline"
				>
					<span>Home</span>
				</button>
				<span className="text-gray-500"> {'>'} </span>
				<button
					className="text-blue-600 hover:text-blue-700 flex items-center px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:underline"
				>
					<span>Categoria</span>
				</button>
				<span className="text-gray-500"> {'>'} </span>
				<button
					className="text-blue-600 hover:text-blue-700 flex items-center px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:underline"
				>
					<span>Smartphone XYZ Pro</span>
				</button>
			</div>
			<div className="flex flex-col md:flex-row gap-6">
				{/* Galería de imágenes */}
				<div className="w-full md:w-1/2 flex flex-col items-center relative">
					<div className="group relative overflow-hidden">
						<button
							className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition z-10"
							onClick={handlePrevImage}
						>
							<ChevronLeft size={24} />
						</button>
						<div
							className="relative w-full h-full"
							onMouseMove={handleMouseMove}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<div
								className="relative w-full h-full"
								style={{
									transform: `scale(${scale})`,
									transformOrigin: `${offset.x * 100}% ${offset.y * 100}%`,
									transition: 'transform 0.1s ease-out',
									maxWidth: '100%',
									maxHeight: '100%',
								}}
							>
								<Image
									src={selectedImage}
									alt={service.title}
									width={700}
									height={700}
									objectFit="cover"
									className="rounded-lg shadow-lg"
								/>
							</div>
						</div>
						<button
							className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
							onClick={handleNextImage}
						>
							<ChevronRight size={24} />
						</button>
					</div>
					<div className="flex gap-2 mt-4">
						{service.images.map((img, index) => (
							<Image
								key={index}
								src={img}
								alt={service.title}
								width={80}
								height={80}
								className={`cursor-pointer rounded-lg border-2 transition ${selectedImage === img ? 'border-red-500' : 'border-gray-300'
								}`}
								onClick={() => setSelectedImage(img)}
							/>
						))}
					</div>
				</div>

				{/* Información del producto */}
				<div className='w-full md:w-1/2'>
					<div className="flex justify-between items-center w-full">
						<h1 className="text-3xl font-bold mb-2">{service.title}</h1>
						<button
							className="ml-auto p-2 rounded-full transition"
							onClick={() => setIsFavorite(!isFavorite)}
						>
							<Heart
								size={24}
								className={`${isFavorite ? 'text-pink-500 fill-red-500' : 'text-gray-400 fill-transparent'}`}
							/>
						</button>
					</div>

					<div className='flex items-center mb-4'>
						{[...Array(5)].map((_, index) => (
							<Star
								key={index}
								size={20}
								className={
									index < service.rating ? 'text-yellow-500' : 'text-gray-300'
								}
							/>
						))}
					</div>
					<p className='text-gray-600 mb-4'>{service.description}</p>

					{/* Precio */}
					<div className='flex gap-6 mb-6'>
						<div>
							<p className='text-xl font-bold'>Desde</p>
							<p className='text-2xl text-red-500'>S/{service.priceMin}</p>
						</div>
						<div>
							<p className='text-xl font-bold'>Hasta</p>
							<p className='text-2xl text-red-500'>S/{service.priceMax}</p>
						</div>
					</div>

					{/* Dirección */}
					<div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
						<i className='fas fa-map-marker-alt'></i>
						<span>{service.address}</span>
					</div>

					{/* Botones de acción */}
					<div className='flex gap-4'>
						<button className='bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition'>
							Solicitar cotización
						</button>
					</div>
				</div>
			</div>
		</>
	)
}