import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceResDto } from '../dto/responses/service-res.dto';
import { Star } from 'lucide-react';
import { Image } from '@/components/custom/image';

interface ServiceCardProps {
	data: ServiceResDto;
}

export function ServiceCard({ data: item }: ServiceCardProps) {
	return (
		<Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition min-h-[300px] w-full pt-0">
			<figure className="relative w-full h-40 overflow-hidden rounded-t-lg">
				<Image
					src={item.images?.[0] || ''}
					alt={item.name}
					width={400}
					height={250}
					className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
				/>
			</figure>
			<CardHeader className="flex flex-col justify-between flex-1 pr-3 pl-3">
				<div className="flex justify-between items-center w-full gap-2">
					<CardTitle className="truncate text-base">{item.name}</CardTitle>
					<div className="flex items-center">
						{[...Array(5)].map((_, index) => (
							<Star
								key={index}
								size={16}
								className={index < item.score ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
							/>
						))}
					</div>
				</div>
				{/* <CardDescription className="truncate text-sm">{item.address}</CardDescription> */}
				<CardDescription className="truncate text-sm text-primary">{item.provider.name}</CardDescription>
				<p className="text-muted-foreground line-clamp-2 text-xs">{item.description}</p>
				<div className="flex justify-between items-center w-full mb-4 text-sm">
					<CardDescription className="font-bold">
						Desde: <span className="text-red-500 ml-1">S/{item.priceMin}</span>
					</CardDescription>
					<CardDescription className="font-bold">
						Hasta: <span className="text-red-500 ml-1">S/{item.priceMax}</span>
					</CardDescription>
				</div>
			</CardHeader>
		</Card>
	);
}
