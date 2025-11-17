'use client'
import CategoryCard from '@components/containers/category-card/category-card'
import AppLayout from '@components/containers/layout/layout'
import { useGetAllCategoryQuery } from '@stateManagement/apiSlices/categoryApi'


const CategoryPage: React.FC = () => {

	const { data: dataCategories = { data: [] }, isLoading } = useGetAllCategoryQuery({})

	return (
		<AppLayout>
			<h1 className="text-3xl font-extrabold tracking-tight text-center sm:text-4xl mt-8 mb-8">
				Categorías
			</h1>
			<div className="container mx-auto p-4">
				<div className="container mx-auto p-8 border bg-base-100 shadow-sm rounded-lg">
					{isLoading ? (
						<p className="text-center text-lg font-semibold">Cargando categorías...</p>
					) : (
						<CategoryCard categories={Array.isArray(dataCategories) ? dataCategories : dataCategories?.data ?? []} />
					)}
				</div>
			</div>
		</AppLayout>
	)
}
export default CategoryPage