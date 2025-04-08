import { Button } from '@components/ui/button'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { Filter, MapPin, Search, SortAsc, X } from 'lucide-react'
import { Input } from '@components/ui/input'
import { UbigeoResponseDto } from '@stateManagement/models/ubigeo/ubigeo'
import { useGetAllCategoryQuery } from '@stateManagement/apiSlices/categoryApi'
import { useLazyGetAllUbigeoServicesByUbigeoQuery } from '@stateManagement/apiSlices/ubigeoServicesApi'
import { ca } from 'date-fns/locale'

interface ServiceSearchProps {
	onSubmited: (data: {
		search: string,
		category?: string | string[],
		ubigeo?: string | string[],
		services?: string | string[],
		priceMin?: number,
		priceMax?: number,
		sortBy?: string}) => void;

	ubigeo: UbigeoResponseDto[];
	searchUbigeo: (search: string) => void;
	categoryId?: string;
}

const ServiceSearch: React.FC<ServiceSearchProps> = ({ onSubmited, ubigeo, searchUbigeo, categoryId }) => {
	const {data: categoryData} = useGetAllCategoryQuery({})
	const [getUbigeoServices] = useLazyGetAllUbigeoServicesByUbigeoQuery()

	const [activeDropdownCategory, setActiveDropdownCategory] = useState<string | null>(null)
	const [activeDropdownSort, setActiveDropdownSort] = useState<string | null>(null)
	const [activeDropdownAddress, setActiveDropdownAddress] = useState<string | null>(null)

	const [searchInput, setSearchInput] = useState('')

	const [openCategory, setOpenCategory] = useState(false)
	const [openOrdenar, setOpenOrdenar] = useState(false)
	const [openAddress, setOpenAddress] = useState(false)

	const dropdownRefCategory = useRef<HTMLDivElement>(null)
	const dropdownRefSort = useRef<HTMLDivElement>(null)
	const dropdownRefAddress = useRef<HTMLDivElement>(null)

	const [selectedCategory, setSelectedCategory] = useState<string[]>([])
	const [selectedSortOption, setSelectedSortOption] = useState('')
	const [selectedAddressOptions, setSelectedAddressOptions] = useState<string[]>([])

	const [searchTermAddress, setSearchTermAddress] = useState('')
	const [idServices, setIdServices] = useState<string[]>([])

	const sortOptions = [
		{ id: 'priceLow', label: 'Precio más bajo' },
		{ id: 'bestRating', label: 'Mejor valoración' },
	]

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRefCategory.current && !dropdownRefCategory.current.contains(event.target as Node)) {
				setActiveDropdownCategory(null)
			}
			if (dropdownRefSort.current && !dropdownRefSort.current.contains(event.target as Node)) {
				setActiveDropdownSort(null)
			}
			if (dropdownRefAddress.current && !dropdownRefAddress.current.contains(event.target as Node)) {
				setActiveDropdownAddress(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])


	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
	}

	const handleAddressChange = async (optionId: string) => {
		const updatedOptions = selectedAddressOptions.includes(optionId)
			? selectedAddressOptions.filter(id => id !== optionId)
			: [...selectedAddressOptions, optionId]

		setSelectedAddressOptions(updatedOptions)
		await dataUbigeosId(updatedOptions)
	}

	const handleSelectAllAddress = async () => {
		if (selectedAddressOptions.length === ubigeo.length) {
			setSelectedAddressOptions([])
			await dataUbigeosId([])
		} else {
			setSelectedAddressOptions(ubigeo?.map((filter) => filter.id) || [])
			await dataUbigeosId(ubigeo?.map((filter) => filter.id) || [])
		}

	}

	const handleCategoryChange = (filterId: string) => {
		setSelectedCategory(prevSelectedCategory => {
			if (prevSelectedCategory.includes(filterId)) {
				return prevSelectedCategory.filter(id => id !== filterId)
			} else {
				return [...prevSelectedCategory, filterId]
			}
		})
	}

	const handleSelectAllCategory = () => {
		if (selectedCategory.length === categoryData?.data?.length) {
			setSelectedCategory([])
		} else {
			setSelectedCategory(categoryData?.data?.map((filter) => filter.id)|| [])
		}
		handleSubmitSearch()
	}

	const dataUbigeosId = (data: string[]) => {
		const dataServicesId = data.join(',')
		getUbigeoServices({ idUbigeo: dataServicesId })
			.unwrap()
			.then((response) => {
				const dataServicesId: string[] = response?.data
					?.map(item => item?.service?.id?.toString())
					.filter(Boolean) || []

				if (dataServicesId.length > 0) {
					setIdServices(dataServicesId)
				}
				else if (data.length > 0 && dataServicesId.length === 0) {
					setIdServices(['none'])
				}
				else if (data.length === 0) {
					setIdServices([''])
				}
			})
	}

	useEffect(() => {
		if (searchInput === '') {
			handleSubmitSearch()
		}
	}, [searchInput])

	useEffect(() => {
		if (selectedAddressOptions.length > 0) {
			dataUbigeosId(selectedAddressOptions)
		}
	}, [selectedAddressOptions])

	useEffect(() => {
		searchUbigeo(searchTermAddress)

	}, [searchTermAddress])

	useEffect(() => {
		handleSubmitSearch()
	}, [selectedCategory,selectedSortOption,idServices])

	const handleSubmitSearch = () => {
		onSubmited({
			search: searchInput,
			category: selectedCategory,
			ubigeo: selectedAddressOptions,
			services: idServices,
			sortBy: selectedSortOption,
		})
	}

	return (
		<div>
			<div className="flex justify-center items-center mt-4">
				<div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center mb-6">
					<div className="flex-1 min-w-[250px] w-full">
						<div className="relative">
							<Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
							<Input
								className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								type="text"
								value={searchInput}
								onChange={handleSearchChange}
								placeholder="Buscar servicio..."
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										handleSubmitSearch()
									}
								}}
							/>
							{searchInput && (
								<X
									className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
									size={18}
									onClick={() => setSearchInput('')}
								/>
							)}
						</div>
					</div>

					{/* modo desktop */}
					<div className="hidden md:block">
						<div className="flex gap-2">
							{!categoryId && (
								<div className="relative">
									<Button
										className="flex items-center gap-1 px-4 py-2"
										variant="outline"
										onClick={() => {
											setActiveDropdownCategory(activeDropdownCategory === 'categories' ? null : 'categories')
											setActiveDropdownSort(null)
											setActiveDropdownAddress(null)
										}}
									>
										<Filter size={16} />
										<span>Categoría</span>
									</Button>
									<div
										ref={dropdownRefCategory}
										className={cn(
											'absolute left-0 mt-1 w-60 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50',
											activeDropdownCategory === 'categories' ? 'block' : 'hidden'
										)}
									>
										<div className="max-h-60 overflow-y-auto">
											<ul className="mt-2 space-y-2 divide-y divide-gray-200">
												<li>
													<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1">
														<input
															type="checkbox"
															checked={selectedCategory.length === categoryData?.data?.length}
															onChange={handleSelectAllCategory}
															className="mr-2 accent-blue-500"
														/>
														<span className="font-bold text-sm">Seleccionar todo</span>
													</label>
												</li>
												{categoryData?.data?.map((filter) => (
													<li key={filter.id}>
														<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1">
															<input
																type="checkbox"
																checked={selectedCategory.includes(filter.id)}
																onChange={() => handleCategoryChange(filter.id)}
																className="mr-2 accent-blue-500"
															/>
															{filter.name}
														</label>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							)}

							<div className="relative">
								<Button
									className="flex items-center gap-1 px-2 py-2"
									variant="outline"
									onClick={() => {
										setActiveDropdownSort(activeDropdownSort === 'sort' ? null : 'sort')
										setActiveDropdownCategory(null)
										setActiveDropdownAddress(null)
									}}
								>
									<SortAsc size={16} />
									<span>Ordenar</span>
								</Button>
								<div
									ref={dropdownRefSort}
									className={cn(
										'absolute left-0 mt-1 w-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50',
										activeDropdownSort === 'sort' ? 'block' : 'hidden'
									)}
								>
									<ul className="mt-2 space-y-2 divide-y divide-gray-200">
										{sortOptions?.map((option) => (
											<li key={option?.id}>
												<label
													className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1"
												>
													<input
														type="checkbox"
														name="sortOption"
														checked={selectedSortOption === option.id }
														onChange={() => {
															setSelectedSortOption((prev) =>
																prev === option.id ? '' : option.id
															)
														}}
														className="mr-2 accent-blue-500"
													/>
													{option?.label}
												</label>
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="relative group">
								<Button
									className="flex items-center gap-1 px-4 py-2 border rounded-md"
									variant="outline"
									onClick={() => {
										setActiveDropdownAddress(activeDropdownAddress === 'address' ? null : 'address')
										setActiveDropdownCategory(null)
										setActiveDropdownSort(null)
									}}
								>
									<MapPin size={16} />
									<span>Ubigeo</span>
								</Button>
								<div
									ref={dropdownRefAddress}
									className={cn(
										'absolute mt-1 w-76 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50',
										'group-[.right]:end-0 group-[.left]:start-0 group-[.center]:left-2/3 -translate-x-2/3',
										activeDropdownAddress === 'address' ? 'block' : 'hidden'
									)}
								>
									<input
										type="text"
										placeholder="Buscar lugares..."
										value={searchTermAddress}
										onChange={(e) => setSearchTermAddress(e.target.value)}
										className="text-xs mb-2 p-2 w-full border border-gray-300 rounded-md"
									/>
									<div className="max-h-64 overflow-y-auto">
										<ul className="mt-2 space-y-2 divide-y divide-gray-200">
											<li>
												<label className="flex items-center text-[8px] text-gray-600 hover:text-blue-500 cursor-pointer m-1">
													<input
														type="checkbox"
														checked={selectedAddressOptions?.length === ubigeo?.length}
														onChange={handleSelectAllAddress}
														className="mr-2 accent-blue-500 w-3 h-3"
													/>
													<span className="text-[12px] font-bold">Seleccionar todo</span>
												</label>
											</li>
											{ubigeo?.map((option) => (
												<li key={option.id}>
													<label className="flex items-center text-[8px] text-gray-600 hover:text-blue-500 cursor-pointer m-1">
														<input
															type="checkbox"
															checked={selectedAddressOptions.includes(option?.id)}
															onChange={() => handleAddressChange(option?.id)}
															className="mr-2 accent-blue-500 w-3 h-3"
														/>
														<span className="text-[10px] font-bold">{`${option?.department} - ${option?.province} - ${option?.district}`}</span>
													</label>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* modo mobile */}
			<div className="md:hidden flex justify-between items-center bg-white shadow-md p-2 rounded-md mb-6">
				<button className="text-gray-700 font-semibold" onClick={() => setOpenCategory(true)}>Categoría</button>
				<button className="text-gray-700 font-semibold" onClick={() => setOpenOrdenar(true)}>Ordenar</button>
				<button className="text-gray-700 font-semibold flex items-center" onClick={() => setOpenAddress(true)}>
					Ubigeo
				</button>
			</div>
			{
				openCategory && (
					<div
						className="fixed inset-0 bg-black/50 z-40 sm:hidden"
						onClick={() => setOpenCategory(false)}
					></div>
				)
			}
			<div
				className={`fixed bottom-0 left-0 w-full bg-white h-[70vh] rounded-t-2xl shadow-lg transform transition-transform ${openCategory ? 'translate-y-0' : 'translate-y-full'
				} z-50 p-4 flex flex-col`}
			>
				<div className="flex justify-between items-center border-b pb-2">
					<h2 className="text-lg font-semibold">Categoría</h2>
					<button onClick={() => setOpenCategory(false)} className="text-gray-600">
						✖
					</button>
				</div>
				<div className="overflow-y-auto flex-grow p-2 bg-white rounded-lg shadow-md">
					<ul className="mt-2 space-y-2 divide-y divide-gray-200">
						<li>
							<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1">
								<input
									type="checkbox"
									checked={selectedCategory.length === categoryData?.data?.length}
									onChange={handleSelectAllCategory}
									className="mr-2 accent-blue-500"
								/>
								<span className="font-bold text-sm">Seleccionar todo</span>
							</label>
						</li>
						{categoryData?.data?.map((filter) => (
							<li key={filter.id}>
								<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1">
									<input
										type="checkbox"
										checked={selectedCategory.includes(filter.id)}
										onChange={() => handleCategoryChange(filter.id)}
										className="mr-2 accent-blue-500"
									/>
									{filter.name}
								</label>
							</li>
						))}
					</ul>
				</div>
				<div className="border-t p-4 bg-white">
					<button
						className="w-full bg-red-500 text-white py-2 rounded-md"
						onClick={() => setOpenCategory(false)}
					>
						Cerrar
					</button>
				</div>
			</div>

			{openOrdenar && (
				<div
					className="fixed inset-0 bg-black/50 z-40 sm:hidden"
					onClick={() => setOpenOrdenar(false)}
				></div>
			)}

			<div
				className={`fixed bottom-0 left-0 w-full bg-white h-[70vh] rounded-t-2xl shadow-lg transform transition-transform ${openOrdenar ? 'translate-y-0' : 'translate-y-full'
				} z-50 p-4 flex flex-col`}
			>
				<div className="flex justify-between items-center border-b pb-2">
					<h2 className="text-lg font-semibold">Ordenar</h2>
					<button onClick={() => setOpenOrdenar(false)} className="text-gray-600">
						✖
					</button>
				</div>

				<div className="overflow-y-auto flex-grow p-2 bg-white rounded-lg shadow-md">
					<ul className="mt-2 space-y-2 divide-y divide-gray-200">
						{sortOptions.map((option) => (
							<li key={option.id}>
								<label
									className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1"
								>
									<input
										type="checkbox"
										name="sortOption"
										checked={selectedSortOption === option.id}
										onChange={() => {
											setSelectedSortOption((prev) =>
												prev === option.id ? '' : option.id
											)
										}}
										className="mr-2 accent-blue-500"
									/>
									{option.label}
								</label>
							</li>
						))}
					</ul>
				</div>

				<div className="border-t p-4 bg-white">
					<button
						className="w-full bg-red-500 text-white py-2 rounded-md"
						onClick={() => setOpenOrdenar(false)}
					>
						Cerrar
					</button>
				</div>
			</div>


			{
				openAddress && (
					<div
						className="fixed inset-0 bg-black/50 z-40 sm:hidden"
						onClick={() => setOpenAddress(false)}
					></div>
				)
			}
			<div
				className={`fixed bottom-0 left-0 w-full bg-white h-[70vh] rounded-t-2xl shadow-lg transform transition-transform ${openAddress ? 'translate-y-0' : 'translate-y-full'
				} z-50 p-4 flex flex-col`}
			>
				<div className="flex justify-between items-center border-b pb-2">
					<h2 className="text-lg font-semibold">Direcciones</h2>
					<button onClick={() => setOpenAddress(false)} className="text-gray-600">
						✖
					</button>
				</div>

				<div className="overflow-y-auto flex-grow p-2 bg-white rounded-lg shadow-md">
					<input
						type="text"
						placeholder="Buscar lugares..."
						value={searchTermAddress}
						onChange={(e) => setSearchTermAddress(e.target.value)}
						className="text-xs mb-2 p-2 w-full border border-gray-300 rounded-md"
					/>
					<div className="overflow-y-auto">
						<ul className="mt-2 space-y-2 divide-y divide-gray-200">
							<li>
								<label className="flex items-center text-[8px] text-gray-600 hover:text-blue-500 cursor-pointer m-1">
									<input
										type="checkbox"
										checked={selectedAddressOptions.length === ubigeo.length}
										onChange={handleSelectAllAddress}
										className="mr-2 accent-blue-500 w-3 h-3"
									/>
									<span className="text-[12px] font-bold">Seleccionar todo</span>
								</label>
							</li>

							{/* Lista de opciones */}
							{ubigeo.map((option) => (
								<li key={option.id}>
									<label className="flex items-center text-[8px] text-gray-600 hover:text-blue-500 cursor-pointer m-1">
										<input
											type="checkbox"
											checked={selectedAddressOptions.includes(option.id)}
											onChange={() => handleAddressChange(option.id)}
											className="mr-2 accent-blue-500 w-3 h-3"
										/>
										<span className="text-[11px] font-bold">{`${option.department} - ${option.province} - ${option.district}`}</span>
									</label>
								</li>
							))}
						</ul>
					</div>
				</div>
				{/* Botón de Cerrar Fijo */}
				<div className="border-t p-4 bg-white">
					<button
						className="w-full bg-red-500 text-white py-2 rounded-md"
						onClick={() => setOpenAddress(false)}
					>
						Cerrar
					</button>
				</div>
			</div>

		</div >
	)
}

export default ServiceSearch