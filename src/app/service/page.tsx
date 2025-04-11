'use client'

import AppLayout from '@components/containers/layout/layout'
import { useLazyAllSearchServiceCategoryUbigeoQuery } from '@stateManagement/apiSlices/serviceApi'
import ServiceCard from './components/service-card'
import ServiceSearch from './components/service-search'
import { useState } from 'react'
import { useLazySearchUbigeoQuery } from '@stateManagement/apiSlices/ubigeoApi'

const ServicesPage: React.FC = () => {

	const [search, setSearch] = useState('')
	const [priceMin, setPriceMin] = useState<number | undefined>(undefined)
	const [priceMax, setPriceMax] = useState<number | undefined>(undefined)
	const [sortBy, setSortBy] = useState<string | undefined>(undefined)
	const [selectedServices, setSelectedServices] = useState<string[] | undefined>(undefined)
	const [selectedCategories, setSelectedCategories] = useState<string[] | undefined>(undefined)

	const [dataSearchService,{data:servicesFilterData, isLoading: isLoadingServices}] = useLazyAllSearchServiceCategoryUbigeoQuery()

	const [dataSearchUbigeo,{data:UbigeoFilterData}] = useLazySearchUbigeoQuery()

	const dataSearch = (data: {
		search?: string;
		category?: string | string[];
		ubigeo?: string | string[];
		services?: string | string[];
		priceMin?: number;
		priceMax?: number;
		sortBy?: string;
	}) => {
		setSearch(data?.search || '')
		setSelectedCategories(
			data?.category ? (Array.isArray(data.category) ? data.category : [data.category]) : undefined
		)
		setSelectedServices(
			data?.services ? (Array.isArray(data.services) ? data.services : [data.services]) : undefined
		)
		setSortBy(data?.sortBy)

		const search = data.search || ''
		const idCategory = Array.isArray(data.category) ? data.category.join(',') : data.category
		const idUbigeo = Array.isArray(data.ubigeo) ? data.ubigeo.join(',') : data.ubigeo
		const idServices = Array.isArray(data.services) ? data.services.join(',') : data.services

		dataSearchService({
			search,
			idCategory,
			idUbigeo,
			idServices,
			priceMin: data.priceMin ?? priceMin,
			priceMax: data.priceMax ?? priceMax,
			sortBy: data.sortBy
		})
	}

	const handleSearchPrice = () => {
		if (priceMin !== undefined && priceMax !== undefined && priceMin > priceMax) {
			return
		}
		dataSearch({
			search,
			priceMin,
			priceMax,
			sortBy,
			services: selectedServices,
			category: selectedCategories,
		})
	}

	const handleSearchUbigeo = (search: string) => {
		dataSearchUbigeo({
			search,
		})
	}

	const clearSearchPriceMinMax = () => {
		setPriceMin(undefined)
		setPriceMax(undefined)
		dataSearchService({
			search,
			priceMin: undefined,
			priceMax: undefined,
			sortBy,
			idServices: selectedServices ? selectedServices.join(',') : undefined,
			idCategory: selectedCategories ? selectedCategories.join(',') : undefined,
		})
	}

	return (
		<AppLayout>
			<div className="container mx-auto p-4">
				<div>
					<ServiceSearch onSubmited={dataSearch} ubigeo={UbigeoFilterData?.data || []} searchUbigeo={handleSearchUbigeo} />
				</div>
				<>
					<div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-2">
						<aside className="hidden md:block">
							<div className='rounded-lg shadow-md border border-gray-200 bg-white p-4  w-[250px] '>
								<h2 className="text-lg font-semibold mb-4">Filtrar por</h2>
								<div className="mb-4">
									<h3 className="text-sm font-semibold text-gray-700 mb-2">Precio</h3>
									<div className="flex items-center space-x-2">
										<input
											type="number"
											placeholder="Mínimo"
											className="w-1/2 p-1 border rounded-md text-sm"
											value={priceMin ?? ''}
											onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : undefined)}
										/>
										<span>-</span>
										<input
											type="number"
											placeholder="Máximo"
											className="w-1/2 p-1 border rounded-md text-sm"
											value={priceMax ?? ''}
											onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : undefined)}
										/>
									</div>
								</div>
								{(priceMin || priceMax) && (
									<button className="w-full bg-green-500 text-white py-2 rounded-md mt-2 hover:bg-green-600" onClick={clearSearchPriceMinMax}>
										Limpiar filtros
									</button>
								)}
								<button className="w-full bg-red-500 text-white py-2 rounded-md mt-2 hover:bg-red-600" onClick={handleSearchPrice}>
									Aplicar filtros
								</button>
							</div>
						</aside>
						<main className="flex-1">
							<ServiceCard data={servicesFilterData?.data || []} isLoading={isLoadingServices} />
						</main>
					</div>
				</>
			</div>
		</AppLayout>
	)
}

export default ServicesPage