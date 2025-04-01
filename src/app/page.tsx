'use client'
import AppLayout from '@components/containers/layout/layout'
import CategoryCard from '@components/containers/category-card/category-card'
import { useGetAllCategoryQuery } from '@stateManagement/apiSlices/categoryApi'
import { useGetAllServicesQuery } from '@stateManagement/apiSlices/serviceApi'
import HomeSearch from '@components/containers/home-search/home-search'

export default function Home() {
	const { data: dataCategories = { data: [] }, isLoading } = useGetAllCategoryQuery({})
	
	const { data: dataServices = { data: [] }, isLoading: isLoadingServices } = useGetAllServicesQuery({})

	return (
		<AppLayout>
			<HomeSearch services={dataServices?.data ?? []} />
			
			<div className='container mx-auto p-4 border border-radius-lg bg-base-100 shadow-xl rounded-lg'>
				{isLoading ? (
					<p className="text-center text-lg font-semibold">Cargando categorías...</p>
				) : (
					<CategoryCard categories={dataCategories?.data ?? []} />
				)}
			</div>
		</AppLayout>
	)
}