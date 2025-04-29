'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart, Star, LoaderCircle  } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import BreadcrumbNavigation from '@components/containers/bread-crumb/bread-crumb'
import { ServiceResponseDto } from '@stateManagement/models/service/create'
import { config } from '@config/config'
import { useGetServiceByProviderDocumentIdQuery } from '@stateManagement/apiSlices/serviceApi'
import Skeleton from '@components/ui/skeleton'
import Link from 'next/link'
import useCartStore from '@stores/cart'
import { useSession } from 'next-auth/react'
import { useAddFavoriteMutation, useDeleteFavoriteMutation, useLazyGetFavoriteByserviceIdQuery } from '@stateManagement/apiSlices/favoriteApi'
import { jwtDecode } from 'jwt-decode'
import { Dialog, DialogHeader, DialogFooter, DialogContent, DialogTitle, DialogDescription } from '@components/ui/dialog'
import { Button } from '@components/ui/button'

interface ServiceDetailProps {
	service: ServiceResponseDto;
}
interface tokkenJWT {
	exp: number;
	iat: number;
	id:	number | string;
}
export default function ShowByServiceId({ service }: ServiceDetailProps) {
	const addToCart = useCartStore((state) => state.addItem)
	const items = useCartStore((state) => state.items)
	const clearCart = useCartStore((state) => state.clearCart)
	const [showConfirmation, setShowConfirmation] = useState(false)

	const { data: auth } = useSession()

	const urlImage = config.imagePublicApiUrl

	const images = service?.fileImage?.map(img => img?.url || '') || []

	const [selectedImage, setSelectedImage] = useState(images[0] || '')
	const [isFavorite, setIsFavorite] = useState(false)

	const [scale, setScale] = useState(1)
	const [offset, setOffset] = useState({ x: 0, y: 0 })

	const { data: servicesData, isLoading } = useGetServiceByProviderDocumentIdQuery({
		documentId: service?.provider?.documentId || '', documentServiceId: service?.documentId
	})

	const [getFavoriteByserviceId] = useLazyGetFavoriteByserviceIdQuery()
	const [addFavorite,{isLoading:isLoadingFavorite}] = useAddFavoriteMutation()
	const [deleteFavorite,{isLoading:isLoadingDeleteFavorite}] = useDeleteFavoriteMutation()


	const handleNextImage = () => {
		if (!images?.length) return

		const currentIndex = images.indexOf(selectedImage)
		const nextIndex = (currentIndex + 1) % images?.length
		setSelectedImage(images[nextIndex])
	}

	const handlePrevImage = () => {
		if (!images.length) return

		const currentIndex = images.indexOf(selectedImage)
		const prevIndex = (currentIndex - 1 + images?.length) % images?.length
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

	const getUserIdFromToken = (token: string): string => {
		const decoded: tokkenJWT = jwtDecode(token)
		return decoded?.id?.toString() || ''
	}

	const allFavoriteByUserIdByServiceId = async (userId: string, serviceId: string): Promise<string | null> => {
		try {
			const response = await getFavoriteByserviceId({ serviceId, userId }).unwrap()
			if (response?.data?.length > 0) {
				const favorite = response?.data[0]
				return favorite?.documentId ?? null
			} else {
				return null
			}
		} catch {
			setIsFavorite(false)
			return null
		}
	}

	const handleFavoriteClick = async () => {
		if (!auth) {
			localStorage.setItem('redirectServiceUrl', window.location.href)
			localStorage.setItem('pendingFavoriteServiceId', service.id)
			window.location.href = '/auth/login'
			return
		}

		const userId = getUserIdFromToken(auth?.accessToken || '')
		if (!userId) return

		let favoriteId: number | null = null
		try {
			const response = await getFavoriteByserviceId({ serviceId: service.id, userId }).unwrap()
			if (response?.data?.length > 0) {
				favoriteId = Number(response?.data[0]?.id)
			}
		} catch {
			// Silenciar error
		}

		try {
			if (favoriteId) {
				await deleteFavorite({ favoriteId}).unwrap()
				setIsFavorite(false)
			} else {
				await addFavorite({ userId, service: service.id }).unwrap()
				setIsFavorite(true)
			}
		} catch {
			setIsFavorite(prev => !prev)
		}
	}

	const hasRun = useRef(false)
	useEffect(() => {
		if (hasRun.current || !auth) return
		hasRun.current = true

		const runAsync = async () => {
			const userId = getUserIdFromToken(auth.accessToken || '')
			if (!userId) return

			const favoriteId = await allFavoriteByUserIdByServiceId(userId, service.id)
			const pendingServiceId = localStorage.getItem('pendingFavoriteServiceId')

			if (pendingServiceId && !favoriteId) {
				await addFavorite({ userId, service: pendingServiceId }).unwrap()
					.then(() => {
						setIsFavorite(true)
					})
					.catch(() => {
						setIsFavorite(false)
					})
					.finally(() => {
						localStorage.removeItem('pendingFavoriteServiceId')
						localStorage.removeItem('redirectServiceUrl')
					})
			} else if(favoriteId){
				localStorage.removeItem('pendingFavoriteServiceId')
				localStorage.removeItem('redirectServiceUrl')
				setIsFavorite(true)
			}
		}

		runAsync()
	}, [auth])

	const handleAddToCart = () => {
		// si existe algun servicio en el carrito que tiene como provider differente al provider del servicio actual, eliminarlo
		const differentProviderItems = items.filter(item => item.provider?.id !== service?.provider?.id)
		if (differentProviderItems.length > 0) {
			setShowConfirmation(true)
			return
		}

		addToCart({
			...service,
			quantity: 1,
		})
	}

	const handleConfirmAddToCart = () => {
		clearCart()
		addToCart({
			...service,
			quantity: 1,
		})

		setShowConfirmation(false)
	}

	return (
		<>
			<Card className="p-6 mb-8 bg-gray-100">
				<div className="flex flex-wrap items-center">
					<BreadcrumbNavigation inicio="Inicio" secondLink="Servicios" currentPage={service?.name} />
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
										{images[0] ? (
											<Image
												src={images[0] ? (urlImage + selectedImage) : ''}
												alt={service?.name || ''}
												width={600}
												height={450}
												className="rounded-lg shadow-lg object-cover w-full h-auto max-w-[600px] max-h-[450px]"
											/>
										) :
											(
												<div className="w-full h-full bg-gray-100 rounded-lg shadow-lg flex items-center justify-center text-gray-500 text-lg">
													Sin imagen
												</div>
											)}
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
							{service?.fileImage && service?.fileImage?.[0] && service?.fileImage?.map((img, index) => (
								<Image
									key={index}
									src={urlImage +`${img?.url}` || ''}
									alt={img?.name || ''}
									width={80}
									height={80}
									className={`cursor-pointer rounded-lg border-2 transition ${selectedImage === img?.url || ''? 'border-red-500' : 'border-gray-300'}`}
									onClick={() => setSelectedImage(img?.url || '')}
								/>
							))}
						</div>
					</div>

					<div className='w-full md:w-1/2 pl-6'>
						<div className="flex justify-between items-center w-full">
							<h1 className="text-3xl font-bold mb-2">{service?.name}</h1>
							<button
								className="ml-auto p-2 rounded-full transition"
								onClick={handleFavoriteClick}
								disabled={isLoadingFavorite || isLoadingDeleteFavorite}
							>
								{isLoadingFavorite||isLoadingDeleteFavorite ? (
									<LoaderCircle className="animate-spin text-gray-500" size={24} />
								) : (
									<Heart
										size={24}
										className={`${isFavorite
											? 'text-pink-500 fill-primary'
											: 'text-gray-400 fill-transparent'
										}`}
									/>
								)}
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
								<p className='text-2xl text-primary'>S/{service.priceMin}</p>
							</div>
							<div>
								<p className='text-xl font-bold'>Hasta</p>
								<p className='text-2xl text-primary'>S/{service.priceMax}</p>
							</div>
						</div>

						<div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
							<i className='fas fa-map-marker-alt'></i>
							<span>{service.address}</span>
						</div>

						<div className='flex gap-4'>
							<button
								className="bg-primary text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
								onClick={handleAddToCart}
							>
								Añadir a la solicitud
							</button>
						</div>
					</div>
				</div>
			</Card>
			<Card className="p-6 bg-gray-100 rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold mb-2">Servicios</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
					{isLoading &&
						Array(8).fill(null).map((_, index) => (
							<div key={index} className="flex flex-col h-full hover:shadow-lg transition">
								<div className="relative w-full h-40 overflow-hidden rounded-t-lg">
									<Skeleton className="h-full w-full rounded-t-lg" />
								</div>
								<div className="flex-grow flex flex-col justify-between p-3">
									<Skeleton className="h-4 w-[90%]" />
									<Skeleton className="h-4 w-[80%]" />
								</div>
							</div>
						))
					}
					{!isLoading &&
						servicesData?.data?.map((item) => (
							<Link key={item?.documentId} href={`/service/${item?.documentId}`} className="h-full">
								<Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition min-h-[300px] w-full">
									<div className="relative w-full h-40 overflow-hidden rounded-t-lg">
										{item?.fileImage?.[0] && (
											<Image
												src={urlImage + (item?.fileImage?.[0]?.url || '')}
												alt={item?.fileImage?.[0]?.name || 'Imagen sin nombre'}
												width={400}
												height={250}
												className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
											/>
										)}
									</div>
									<CardHeader className="flex flex-col justify-between flex-1 pr-3 pl-3">
										<div className="flex justify-between items-center w-full gap-2">
											<CardTitle className="truncate text-base">{item?.name}</CardTitle>
											<div className="flex items-center">
												{[...Array(5)].map((_, index) => (
													<Star
														key={`${item?.documentId}-star-${index}`}
														size={16}
														className={index < item?.score ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
													/>
												))}
											</div>
										</div>
										<CardDescription className="truncate text-sm">{item?.address}</CardDescription>
										<CardDescription className="line-clamp-2 text-xs">{item?.description}</CardDescription>
										<div className="flex justify-between items-center w-full mb-4 text-sm">
											<CardDescription className="font-bold">
												Desde: <span className="text-primary ml-1">S/{item?.priceMin}</span>
											</CardDescription>
											<CardDescription className="font-bold">
												Hasta: <span className="text-primary ml-1">S/{item?.priceMax}</span>
											</CardDescription>
										</div>
									</CardHeader>
								</Card>
							</Link>
						))
					}
				</div>
			</Card>

			<Dialog open={showConfirmation} onOpenChange={(open) => setShowConfirmation(open)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>¿Estás seguro?</DialogTitle>
						<DialogDescription>
							Al añadir este servicio al carrito, se eliminarán los servicios de otros proveedores. ¿Deseas continuar?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-end gap-2">
						<Button variant="secondary" onClick={() => setShowConfirmation(false)}>
							No, Cancelar
						</Button>
						<Button variant="destructive" onClick={handleConfirmAddToCart}>
							Sí, Continuar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}