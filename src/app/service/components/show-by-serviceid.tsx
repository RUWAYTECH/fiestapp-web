'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react'
import { Card } from '@components/ui/card'
import BreadcrumbNavigation from '@components/containers/bread-crumb/bread-crumb'
import { ServiceResponseDto } from '@stateManagement/models/service/create'
import { config } from '@config/config'

interface ServiceDetailProps {
	service: ServiceResponseDto;
}
export default function ShowByServiceId({ service }: ServiceDetailProps) {
	const urlImage = config.imagePublicApiUrl

	const images = service?.fileImage?.map(img => img?.url || '') || []

	const [selectedImage, setSelectedImage] = useState(images[0] || '')
	const [isFavorite, setIsFavorite] = useState(false)

	const [scale, setScale] = useState(1)
	const [offset, setOffset] = useState({ x: 0, y: 0 })

	const handleNextImage = () => {
		if (!images.length) return

		const currentIndex = images.indexOf(selectedImage)
		const nextIndex = (currentIndex + 1) % images.length
		setSelectedImage(images[nextIndex])
	}

	const handlePrevImage = () => {
		if (!images.length) return

		const currentIndex = images.indexOf(selectedImage)
		const prevIndex = (currentIndex - 1 + images.length) % images.length
		setSelectedImage(images[prevIndex])
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
			<Card className="p-6 mb-8 bg-gray-100">
				<div className="flex flex-wrap items-center">
					<BreadcrumbNavigation inicio="Inicio" secondLink="Service" currentPage="Current Page" />
				</div>
				<div className="flex flex-col md:flex-row gap-6">
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
									<div className="relative max-w-[700px] max-h-[450px] flex items-center justify-center overflow-hidden">
										<Image
											src={urlImage + selectedImage}
											alt={service?.name || ''}
											width={600}
											height={450}
											className="rounded-lg shadow-lg object-cover w-full h-auto max-w-[600px] max-h-[450px]"
										/>
									</div>
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
							{service.fileImage && service.fileImage.map((img, index) => (
								<Image
									key={index}
									src={urlImage +`${img.url}` || ''}
									alt={img.name || ''}
									width={80}
									height={80}
									className={`cursor-pointer rounded-lg border-2 transition ${selectedImage === img.url || ''? 'border-red-500' : 'border-gray-300'}`}
									onClick={() => setSelectedImage(img.url || '')}
								/>
							))}
						</div>
					</div>

					<div className='w-full md:w-1/2 pl-6'>
						<div className="flex justify-between items-center w-full">
							<h1 className="text-3xl font-bold mb-2">{service.name}</h1>
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
										index < service?.score ? 'text-yellow-500' : 'text-gray-300'
									}
								/>
							))}
						</div>
						<p className='text-gray-600 mb-4'>{service.description}</p>

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

						<div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
							<i className='fas fa-map-marker-alt'></i>
							<span>{service.address}</span>
						</div>

						<div className='flex gap-4'>
							<button className='bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition'>
								Solicitar cotización
							</button>
						</div>
					</div>
				</div>
			</Card>
			<Card className="p-6 bg-gray-100 rounded-lg shadow-lg">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
					<div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
						<span className="text-xl font-semibold text-gray-700 border-b-2 border-gray-700 pb-1">Especificaciones</span>
						<table className="mt-6 w-full text-left text-sm text-gray-600">
							<tbody>
								<tr className="border-b bg-gray-100">
									<td className="font-semibold pr-4 py-2 w-1/4">Material:</td>
									<td>Acero inoxidable</td>
								</tr>
								<tr className="border-b">
									<td className="font-semibold pr-4 py-2 w-1/4">Peso:</td>
									<td>500g</td>
								</tr>
								<tr className="border-b bg-gray-100">
									<td className="font-semibold pr-4 py-2 w-1/4">Dimensiones:</td>
									<td>30x20x10 cm</td>
								</tr>
								<tr>
									<td className="font-semibold pr-4 py-2 w-1/4">Color:</td>
									<td>Negro</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-span-1 md:col-span-3 flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
						<div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-4">
							<span className="text-xl font-semibold text-gray-700 border-b-2 border-gray-700 pb-1">Descripción</span>
							<p className=" text-gray-600 mt-6">
								Este producto es ideal para quienes buscan una solución duradera
								y de alta calidad. Su diseño elegante y funcional lo hace perfecto
								para cualquier entorno. Hecho con materiales de alta resistencia, ofrece un rendimiento excepcional.
							</p>
						</div>
					</div>
				</div>
			</Card>
		</>
	)
}