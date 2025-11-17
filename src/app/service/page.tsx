'use client'

import AppLayout from '@components/containers/layout/layout'
import { useLazyAllSearchServiceCategoryUbigeoQuery } from '@stateManagement/apiSlices/serviceApi'
import ServiceSearch from './components/service-search'
import { useEffect, useRef, useState } from 'react'
import { useLazySearchUbigeoQuery } from '@stateManagement/apiSlices/ubigeoApi'
import ServiceCard from '@components/containers/service-card/service-card'
import { useSearchParams } from 'next/navigation'

const ServicesPage: React.FC = () => {
	const searchParams = useSearchParams()
	const idParam = searchParams.get('cat')
	const id = idParam !== null ? Number(idParam) : undefined
	const previousCatRef = useRef<string | null>(null)

	const [search, setSearch] = useState('')
	const [priceMin, setPriceMin] = useState<number | undefined>(undefined)
	const [priceMax, setPriceMax] = useState<number | undefined>(undefined)
	const [sortBy, setSortBy] = useState<string | undefined>(undefined)
	const [selectedUbigeo, setSelectedUbigeo] = useState<string[] | undefined>(undefined)
	const [selectedCategories, setSelectedCategories] = useState<string[] | undefined>(undefined)

	const [dataSearchService,{data:servicesFilterData, isLoading: isLoadingServices}] = useLazyAllSearchServiceCategoryUbigeoQuery()

	const [dataSearchUbigeo,{data:UbigeoFilterData}] = useLazySearchUbigeoQuery()

	const dataSearch = (data: {
		search?: string;
		category?: string | string[];
		ubigeo?: string | string[];
		priceMin?: number;
		priceMax?: number;
		sortBy?: string;
	}) => {

		setSearch(data?.search || '')

		setSelectedCategories(
			data?.category ? (Array.isArray(data.category) ? data.category : [data.category]) : undefined
		)

		setSelectedUbigeo(
			data?.ubigeo ? (Array.isArray(data.ubigeo) ? data.ubigeo : [data.ubigeo]) : undefined
		)
		setSortBy(data?.sortBy)

		const search = data.search || ''

		const idCategory = Array.isArray(data.category) ? data.category.join(',') : data.category
		const idUbigeo = Array.isArray(data.ubigeo) ? data.ubigeo.join(',') : data.ubigeo

		dataSearchService({
			search,
			idCategory,
			idUbigeo,
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
			ubigeo: selectedUbigeo,
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
			idUbigeo: selectedUbigeo ? selectedUbigeo.join(',') : undefined,
			idCategory: selectedCategories ? selectedCategories.join(',') : undefined,
		})
	}

	useEffect(() => {
		const currentCat = searchParams.get('cat')
		if (previousCatRef.current !== null && currentCat === null) {
			window.location.reload()
		}
		previousCatRef.current = currentCat
	}, [searchParams])

	return (
		<AppLayout>
			<div className="container mx-auto p-4">
				<div>
					<ServiceSearch onSubmited={dataSearch} dataUbigeo={UbigeoFilterData || []} searchUbigeo={handleSearchUbigeo} categoryId={id} />
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
											min="0"
											placeholder="Mínimo"
											className="w-1/2 p-1 border rounded-md text-sm"
											value={priceMin ?? ''}
											onKeyDown={(e) => {
												if (e.key === '-' || e.key === 'e') {
													e.preventDefault()
												}
											}}
											onChange={(e) => {
												const value = Number(e.target.value)
												if (value >= 0 || e.target.value === '') {
													setPriceMin(e.target.value ? value : undefined)
												}
											}}
										/>
										<span>-</span>
										<input
											type="number"
											min="0"
											placeholder="Máximo"
											className="w-1/2 p-1 border rounded-md text-sm"
											value={priceMax ?? ''}
											onKeyDown={(e) => {
												if (e.key === '-' || e.key === 'e') {
													e.preventDefault()
												}
											}}
											onChange={(e) => {
												const value = Number(e.target.value)
												if (value >= 0 || e.target.value === '') {
													setPriceMax(e.target.value ? value : undefined)
												}
											}}
										/>
									</div>
								</div>
								{(priceMin || priceMax) && (
									<button className="w-full bg-ring text-popover py-2 rounded-md mt-2 hover:bg-sidebar-ring" onClick={clearSearchPriceMinMax}>
										Limpiar filtros
									</button>
								)}
								<button className="w-full bg-primary text-popover py-2 rounded-md mt-2 hover:bg-primary-900" onClick={handleSearchPrice}>
									Aplicar filtros
								</button>
							</div>
						</aside>
						<main className="flex-1">
							<ServiceCard data={servicesFilterData || []} isLoading={isLoadingServices} />
						</main>
					</div>
				</>
			</div>
		</AppLayout>
	)
}

export default ServicesPage