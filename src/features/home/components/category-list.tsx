import { CategoryCard } from '@/features/category/components/category-card';
import { CategoryService } from '@/features/category/services/category.service';
import Link from 'next/link';

export async function CategoryList() {
	const res = await CategoryService.getAll({
		page: 1,
		pageSize: 6
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
			{res?.data.map(item => (
				<Link key={item.id} href={`/services?cat=${item.id}`}>
					<CategoryCard data={item} />
				</Link>
			))}
		</div>
	);
}
