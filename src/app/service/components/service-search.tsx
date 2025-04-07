import { Button } from '@components/ui/button'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { Filter, MapPin, Search, SortAsc, X } from 'lucide-react'
import { Input } from '@components/ui/input'
import { UbigeoResponseDto } from '@stateManagement/models/ubigeo/ubigeo'

interface ServiceSearchProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmited: (data: any) => void;
	ubigeo: UbigeoResponseDto[];
}

const ServiceSearch: React.FC<ServiceSearchProps> = ({ onSubmited, ubigeo }) => {

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

	// Manejo de dropdowns
	const categories = [
		{ id: 'venues', label: 'Locales para eventos' },
		{ id: 'clowns', label: 'Payasos' },
		{ id: 'animators', label: 'Animadores' },
		{ id: 'magicians', label: 'Magos' },
		{ id: 'decor', label: 'Decoración y ambientación' },
		{ id: 'catering', label: 'Catering y comida' },
		{ id: 'music', label: 'DJ y música en vivo' },
		{ id: 'photography', label: 'Fotografía y video' },
		{ id: 'games', label: 'Juegos y entretenimiento' },
		{ id: 'kids_shows', label: 'Shows infantiles' },
		{ id: 'costumes', label: 'Vestuario y disfraces' },
		{ id: 'invitations', label: 'Invitaciones y recuerdos' },
		{ id: 'event_packages', label: 'Planes y paquetes completos' },
		{ id: 'game', label: 'Juegos y entretenimiento' },
		{ id: 'kids_show', label: 'Shows infantiles' },
		{ id: 'costume', label: 'Vestuario y disfraces' },
		{ id: 'invitation', label: 'Invitaciones y recuerdos' },
		{ id: 'event_package', label: 'Planes y paquetes completos' },
	]

	const sortOptions = [
		{ id: 'priceLow', label: 'Precio más bajo' },
		{ id: 'bestRating', label: 'Mejor valoración' },
		{ id: 'mostBooked', label: 'Más reservados' }
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

	const handleSubmitSearch = () => {
		onSubmited({ search: searchInput, filter: selectedCategory, sort: selectedSortOption, location: selectedAddressOptions })
	}

	const handleFilterChange = (filterId: string) => {
		setSelectedCategory(prevSelectedCategory => {
			if (prevSelectedCategory.includes(filterId)) {
				return prevSelectedCategory.filter(id => id !== filterId)
			} else {
				return [...prevSelectedCategory, filterId]
			}
		})
		handleSubmitSearch()
	}

	const handleAddressChange = (optionId: string) => {
		setSelectedAddressOptions(prevSelectedAddress => {
			if (prevSelectedAddress.includes(optionId)) {
				return prevSelectedAddress.filter(id => id !== optionId)
			} else {
				return [...prevSelectedAddress, optionId]
			}
		})
		handleSubmitSearch()
	}

	const filteredData = ubigeo.filter((option) =>
		option.department.toLowerCase().includes(searchTermAddress.toLowerCase()) ||
		option.province.toLowerCase().includes(searchTermAddress.toLowerCase()) ||
		option.district.toLowerCase().includes(searchTermAddress.toLowerCase())
	)

	useEffect(() => {
		if (searchInput === '') {
			handleSubmitSearch()
		}
	}, [searchInput])

	const handleSelectAllAddress = () => {
		if (selectedAddressOptions.length === filteredData.length) {
			setSelectedAddressOptions([])
		} else {
			setSelectedAddressOptions(filteredData.map((option) => option.code))
		}
	}
	const handleSelectAllCategory = () => {
		if (selectedCategory.length === categories.length) {
			setSelectedCategory([])
		} else {
			setSelectedCategory(categories.map((filter) => filter.id))
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRefSort.current && !dropdownRefSort.current.contains(event.target as Node)) {
				setActiveDropdownSort(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

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
					<div className="hidden md:block">
						<div className="flex gap-2">
							{/* Sección categorias */}
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
											{/* Seleccionar todo en filtros */}
											<li>
												<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1">
													<input
														type="checkbox"
														checked={selectedCategory.length === categories.length}
														onChange={handleSelectAllCategory}
														className="mr-2 accent-blue-500"
													/>
													<span className="font-bold text-sm">Seleccionar todo</span>
												</label>
											</li>

											{/* Lista de filtros */}
											{categories.map((filter) => (
												<li key={filter.id}>
													<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1">
														<input
															type="checkbox"
															checked={selectedCategory.includes(filter.id)}
															onChange={() => handleFilterChange(filter.id)}
															className="mr-2 accent-blue-500"
														/>
														{filter.label}
													</label>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>

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
										{sortOptions.map((option) => (
											<li key={option.id}>
												<label
													className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1"
													onClick={() => {
														setSelectedSortOption(option.id)
													}}
												>
													<input
														type="radio"
														name="sortOption"
														checked={selectedSortOption === option.id}
														onChange={() => {
															setSelectedSortOption(option.id)
														}}
														className="mr-2 accent-blue-500"
													/>
													{option.label}
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

								{/* Dropdown con ajuste automático */}
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
														checked={selectedAddressOptions.length === filteredData.length}
														onChange={handleSelectAllAddress}
														className="mr-2 accent-blue-500 w-3 h-3"
													/>
													<span className="text-[12px] font-bold">Seleccionar todo</span>
												</label>
											</li>

											{/* Lista de opciones */}
											{filteredData.map((option) => (
												<li key={option.code}>
													<label className="flex items-center text-[8px] text-gray-600 hover:text-blue-500 cursor-pointer m-1">
														<input
															type="checkbox"
															checked={selectedAddressOptions.includes(option.code)}
															onChange={() => handleAddressChange(option.code)}
															className="mr-2 accent-blue-500 w-3 h-3"
														/>
														<span className="text-[10px] font-bold">{`${option.department} - ${option.province} - ${option.district}`}</span>
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
					{/* Checkbox "Seleccionar Todo" */}
					<ul className="mt-2 space-y-2 divide-y divide-gray-200">
						{/* Seleccionar todo en filtros */}
						<li>
							<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1">
								<input
									type="checkbox"
									checked={selectedCategory.length === categories.length}
									onChange={handleSelectAllCategory}
									className="mr-2 accent-blue-500"
								/>
								<span className="font-bold text-sm">Seleccionar todo</span>
							</label>
						</li>

						{/* Lista de filtros */}
						{categories.map((filter) => (
							<li key={filter.id}>
								<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer m-1">
									<input
										type="checkbox"
										checked={selectedCategory.includes(filter.id)}
										onChange={() => handleFilterChange(filter.id)}
										className="mr-2 accent-blue-500"
									/>
									{filter.label}
								</label>
							</li>
						))}
					</ul>
				</div>

				{/* Botón de Cerrar Fijo */}
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
									onClick={() => {
										setSelectedSortOption(option.id)
									}}
								>
									<input
										type="radio"
										name="sortOption"
										checked={selectedSortOption === option.id}
										onChange={() => {
											setSelectedSortOption(option.id)
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
										checked={selectedAddressOptions.length === filteredData.length}
										onChange={handleSelectAllAddress}
										className="mr-2 accent-blue-500 w-3 h-3"
									/>
									<span className="text-[12px] font-bold">Seleccionar todo</span>
								</label>
							</li>

							{/* Lista de opciones */}
							{filteredData.map((option) => (
								<li key={option.code}>
									<label className="flex items-center text-[8px] text-gray-600 hover:text-blue-500 cursor-pointer m-1">
										<input
											type="checkbox"
											checked={selectedAddressOptions.includes(option.code)}
											onChange={() => handleAddressChange(option.code)}
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