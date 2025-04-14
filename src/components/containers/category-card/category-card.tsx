'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryResponseDto } from '@stateManagement/models/category/create'
import Image from 'next/image'
import Link from 'next/link'
import { config } from '@config/config'

interface CategoryListProps {
	categories: CategoryResponseDto[];
}

const CategoryCard: React.FC<CategoryListProps> = ({ categories }) => {
	const urlImage = config.imagePublicApiUrl
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-4 mb-4">
			{categories.slice(0, 6).map(category => (
				<Link key={category.id} href={`/service?cat=${category.id}`}>
					<Card className="h-full flex flex-col hover:shadow-lg transition p-4">
						<div className="relative w-34 h-34 mx-auto overflow-hidden rounded-full">
							<Image
								src={urlImage + `${category.categoryImage[0].url}` || ''}
								alt={category.categoryImage[0].name || ''}
								width={200}
								height={200}
								className="w-full h-full object-cover"
							/>
						</div>
						<CardHeader className="flex-grow flex flex-col justify-between pl-2 pr-2 pt-0  items-center">
							<div className="flex items-center text-center">
								<CardTitle className="text-sm">{category.name}</CardTitle>
							</div>
						</CardHeader>
					</Card>
				</Link>
			))}
		</div>
	)
}


export default CategoryCard