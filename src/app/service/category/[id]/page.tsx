'use client'
import AppLayout from '@components/containers/layout/layout'
import { usePathname } from 'next/navigation'
import ServiceSearch from '@app/service/components/service-search'
import ServiceCard from '@app/service/components/service-card'
import { useLazySearchUbigeoQuery } from '@stateManagement/apiSlices/ubigeoApi'
import { useLazyAllSearchServiceCategoryUbigeoQuery } from '@stateManagement/apiSlices/serviceApi'
import { useState } from 'react'

const RutaPage: React.FC = () => {
	const pathname = usePathname()
	const id = pathname.split('/').pop()
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
		const categoryId = [id]
		const search = data.search || ''

		setSelectedCategories(
			data?.category ? (Array.isArray(data.category) ? data.category : [data.category]) : undefined
		)

		setSelectedServices(
			data?.services ? (Array.isArray(data.services) ? data.services : [data.services]) : undefined
		)
		setSortBy(data?.sortBy)

		const idCategory = Array.isArray(categoryId) ? categoryId.join(',') : categoryId
		const idUbigeo = Array.isArray(data.ubigeo) ? data.ubigeo.join(',') : data.ubigeo
		const idServices = Array.isArray(data.services) ? data.services.join(',') : data.services

		dataSearchService({
			search,
			idCategory,
			idUbigeo,
			idServices,
			priceMin:priceMin ? priceMin : data.priceMin,
			priceMax:priceMax ? priceMax : data.priceMax,
			sortBy: data.sortBy
		})
	}

	const handleSearch = () => {
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

	return (
		<AppLayout>
			<div className="container mx-auto p-4">
				<div>
					<ServiceSearch onSubmited={dataSearch} ubigeo={UbigeoFilterData?.data || []} searchUbigeo={handleSearchUbigeo} categoryId={id} />
				</div>
				<>
					<div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
						<aside  className="hidden md:block bg-white p-4 rounded-lg shadow-md border border-gray-200 w-[250px]">
							<h2 className="text-lg font-semibold mb-4">Filtrar por</h2>
							<div className="mb-4">
								<h3 className="text-sm font-semibold text-gray-700 mb-2">Precio</h3>
								<div className="flex items-center space-x-2">
									<input
										type="number"
										placeholder="Mínimo"
										className="w-1/2 p-1 border rounded-md text-sm"
										onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : undefined)}
									/>
									<span>-</span>
									<input
										type="number"
										placeholder="Máximo"
										className="w-1/2 p-1 border rounded-md text-sm"
										onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : undefined)}
									/>
								</div>
							</div>
							<button className="w-full bg-blue-500 text-white py-2 rounded-md mt-2 hover:bg-blue-600" onClick={handleSearch}>
								Aplicar filtros
							</button>
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
export default RutaPage