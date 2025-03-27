import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryListProps {
	categories: { id: number; title: string; description: string; image: string; count: number; rating: number; priceMin: number; priceMax: number; address: string }[];
}

const CategoryServiceList: React.FC<CategoryListProps> = ({ categories }) => {

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
			{categories.map(category => (
				<Link key={category.id} href={`/category/${category.id}`} passHref>
					<Card className="h-full flex flex-col hover:shadow-lg transition">
						<div className="relative w-full h-40 overflow-hidden rounded-t-lg">
							<Image
								src={category.image}
								alt={category.title}
								width={400}
								height={250}
								className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-110"
							/>
						</div>
						<CardHeader className="flex-grow flex flex-col justify-between pl-2 pr-2 pt-0 pb-2">
							<div>
								<div className="flex justify-between items-center w-full gap-4">
									<CardTitle>{category.title}</CardTitle>
									<div className="flex items-center ml-auto">
										{[...Array(5)].map((_, index) => (
											<Star
												key={index}
												size={16}
												className={index < category.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
											/>
										))}
									</div>
								</div>
								<CardDescription>{category.address}</CardDescription>
								<CardDescription>{category.description}</CardDescription>
							</div>
							<div className="flex justify-between items-center w-full">
								<CardDescription className="font-bold mb-2 inline-flex items-center">
									Desde: <span className="text-red-500 ml-1">S/{category.priceMin}</span>
								</CardDescription>
								<CardDescription className="font-bold mb-2 inline-flex items-center">
									Hasta: <span className="text-red-500 ml-1">S/{category.priceMax}</span>
								</CardDescription>
							</div>
						</CardHeader>
					</Card>
				</Link>
			))}
		</div>
	)
}

export default CategoryServiceList