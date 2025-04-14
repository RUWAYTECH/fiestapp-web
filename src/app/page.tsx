'use client'
import AppLayout from '@components/containers/layout/layout'
import CategoryCard from '@components/containers/category-card/category-card'
import { useGetAllCategoryQuery } from '@stateManagement/apiSlices/categoryApi'
import { useGetAllServicesQuery, useLastServiceQuery } from '@stateManagement/apiSlices/serviceApi'
import HomeSearch from '@components/containers/home-search/home-search'
import { Skeleton } from '@/components/ui/skeleton'
import ServiceCard from '@components/containers/service-card/service-card'

export default function Home() {
	const { data: dataCategories = { data: [] }, isLoading } = useGetAllCategoryQuery({})

	const { data: dataServices = { data: [] }} = useGetAllServicesQuery({})

	const {data: dataLastService, isLoading: isLoadingLastService} = useLastServiceQuery({})

	return (
		<AppLayout>
			<HomeSearch services={dataServices?.data ?? []} />

			<div className='container mx-auto p-4 border border-radius-lg bg-base-100 shadow-md rounded-lg mb-6'>
				<h1 className="text-lg font-bold text-center mb-4">Categorías</h1>
				{isLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-4">
						{Array(6).fill(null).map((_, index) => (
							<div key={index} className="flex flex-col h-full transition shadow-md rounded-lg overflow-hidden">
								<div className="relative w-full h-40 overflow-hidden">
									<Skeleton className="h-full w-full" />
								</div>
								<div className="flex-grow flex flex-col justify-between p-3">
									<Skeleton className="h-4 w-[90%]" />
									<Skeleton className="h-4 w-[80%] mt-2" />
								</div>
							</div>
						))}
					</div>
				) : (
					<CategoryCard categories={dataCategories?.data ?? []} />
				)}
			</div>
			<div className='container mx-auto p-4 border border-radius-lg bg-base-100 shadow-md rounded-lg mb-6'>
				<h1 className="text-lg font-bold text-center mb-4">Nuevos servicios</h1>
				<ServiceCard data={dataLastService?.data ?? []} isLoading={isLoadingLastService} gridCols={6}/>
			</div>
		</AppLayout>
	)
}