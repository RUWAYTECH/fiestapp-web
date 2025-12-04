import { CategoryService } from '@/features/category/services/category.service';
import { CategoryCarousel } from './category-carousel';

export async function CategoryList() {
	const res = await CategoryService.getAll({
		page: 1,
		pageSize: 6
	});

	return <CategoryCarousel categories={res?.data || []} />;
}
