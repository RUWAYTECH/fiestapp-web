import { Image } from '@/components/custom/image';
import { CategoryResDto } from '../dto/responses/category-res.dto';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryCardProps {
	data: CategoryResDto;
}

export function CategoryCard({ data }: CategoryCardProps) {
	return (
		<Card className="h-full flex flex-col hover:shadow-lg transition p-4">
			<figure className="relative h-28 max-w-32 aspect-square mx-auto overflow-hidden rounded-full">
				<Image src={data.image} alt={data.name || ''} className="w-full h-full object-cover" />
			</figure>
			<CardHeader className="grow flex flex-col justify-between pl-2 pr-2 pt-0  items-center">
				<div className="flex items-center text-center">
					<CardTitle className="text-sm">{data.name}</CardTitle>
				</div>
			</CardHeader>
		</Card>
	);
}
