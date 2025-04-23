import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Skeleton from '@components/ui/skeleton'
import { config } from '@config/config'
import { ServiceResponseDto } from '@stateManagement/models/service/create'
import { Star } from 'lucide-react'
import Link from 'next/link'

interface ServiceListProps {
	data: ServiceResponseDto[];
	isLoading?: boolean;
	gridCols?: number;
}

const ServiceCard: React.FC<ServiceListProps> = ({ data, isLoading = false, gridCols }) => {
	const urlImage = config.imagePublicApiUrl
	const getGridColsClass = (colsLg = 4) => {
		switch (colsLg) {
			case 1:
				return 'lg:grid-cols-1'
			case 2:
				return 'lg:grid-cols-2'
			case 3:
				return 'lg:grid-cols-3'
			case 5:
				return 'lg:grid-cols-5'
			case 6:
				return 'lg:grid-cols-6'
			default:
				return 'lg:grid-cols-4'
		}
	}
	return (
		<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${getGridColsClass(gridCols)} gap-4 w-full`}>
			{isLoading &&
				Array(gridCols||12).fill(null).map((_, index) => (
					<div key={index} className="flex flex-col h-full transition">
						<div className="relative w-full h-40 overflow-hidden rounded-t-lg">
							<Skeleton className="h-full w-full rounded-t-lg" />
						</div>
						<div className="flex-grow flex flex-col justify-between p-3">
							<Skeleton className="h-4 w-[90%]" />
							<Skeleton className="h-4 w-[80%] mt-2" />
						</div>
					</div>
				))
			}
			{!isLoading &&
				data.map((item) => (
					<Link key={item?.documentId} href={`/service/${item?.documentId}`} className="h-full">
						<Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition min-h-[300px] w-full">
							<div className="relative w-full h-40 overflow-hidden rounded-t-lg">
								<img
									src={urlImage + (item?.fileImage?.[0]?.url || '')}
									alt={item?.fileImage?.[0]?.name || 'Imagen sin nombre'}
									width={400}
									height={250}
									className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
								/>
							</div>
							<CardHeader className="flex flex-col justify-between flex-1 pr-3 pl-3">
								<div className="flex justify-between items-center w-full gap-2">
									<CardTitle className="truncate text-base">{item?.name}</CardTitle>
									<div className="flex items-center">
										{[...Array(5)].map((_, index) => (
											<Star
												key={index}
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
										Desde: <span className="text-red-500 ml-1">S/{item?.priceMin}</span>
									</CardDescription>
									<CardDescription className="font-bold">
										Hasta: <span className="text-red-500 ml-1">S/{item?.priceMax}</span>
									</CardDescription>
								</div>
							</CardHeader>
						</Card>
					</Link>
				))}
		</div>
	)
}

export default ServiceCard