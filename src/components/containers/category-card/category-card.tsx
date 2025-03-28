import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryListProps {
	categories: { id: number; title: string; description: string; image: string; count: number; rating: number; priceMin: number; priceMax: number; address: string }[];
}

const CategoryCard: React.FC<CategoryListProps> = ({ categories }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
			{categories.map(category => (
				<Link key={category.id} href={`/category/${category.id}`} passHref>
					<Card className="h-full flex flex-col hover:shadow-lg transition p-4">
						<div className="relative w-48 h-48 mx-auto overflow-hidden rounded-full">
							<Image
								src={category.image}
								alt={category.title}
								width={200}
								height={200}
								className="w-full h-full object-cover"
							/>
						</div>
						<CardHeader className="flex-grow flex flex-col justify-between pl-2 pr-2 pt-0 items-center">
							<div className="flex items-center text-center">
								<CardTitle>{category.description}</CardTitle>
							</div>
						</CardHeader>
					</Card>
				</Link>
			))}
		</div>
	)
}


export default CategoryCard