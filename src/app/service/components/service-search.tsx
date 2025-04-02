import { Button } from '@components/ui/button'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { Filter, MapPin, Search, SortAsc, X } from 'lucide-react'
import { Input } from '@components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'

interface ServiceSearchProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmited: (data: any) => void;
}

const ServiceSearch: React.FC<ServiceSearchProps> = ({ onSubmited }) => {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
	const [activeDropdownSort, setActiveDropdownSort] = useState<string | null>(null)
	const [activeDropdownAddress, setActiveDropdownAddress] = useState<string | null>(null)

	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(false)
	const [selectedFilters, setSelectedFilters] = useState<string[]>([])
	const dropdownRef = useRef<HTMLDivElement>(null)
	const dropdownRefSort = useRef<HTMLDivElement>(null)
	const dropdownRefAddress = useRef<HTMLDivElement>(null)
	const [selectedSortOptions, setSelectedSortOptions] = useState<string[]>([])
	const [selectedAddressOptions, setSelectedAddressOptions] = useState<string[]>([])
	const [searchTerm, setSearchTerm] = useState('')

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
	]

	const sortOptions = [
		{ id: 'priceLow', label: 'Precio más bajo' },
		{ id: 'bestRating', label: 'Mejor valoración' },
		{ id: 'mostBooked', label: 'Más reservados' }
	]
	const mockData = [
		{ value: 'NY', label: 'Nueva York' },
		{ value: 'LA', label: 'Los Ángeles' },
		{ value: 'CHI', label: 'Chicago' },
		{ value: 'HOU', label: 'Houston' },
		{ value: 'PHX', label: 'Phoenix' },
		{ value: 'PHI', label: 'Filadelfia' },
		{ value: 'SA', label: 'San Antonio' },
		{ value: 'SD', label: 'San Diego' },
		{ value: 'DAL', label: 'Dallas' },
		{ value: 'SJ', label: 'San José' }
	]

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setActiveDropdown(null)
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
		setSearch(e.target.value)
	}

	const handleSubmitSearch = () => {
		console.log('Busqueda realizada con:', search)
		onSubmited({ search: search, filter: selectedFilters, sort: selectedSortOptions, location: selectedAddressOptions })
	}

	// Cambiar filtros seleccionados
	const handleFilterChange = (filterId: string) => {
		setSelectedFilters(prevSelectedFilters => {
			if (prevSelectedFilters.includes(filterId)) {
				return prevSelectedFilters.filter(id => id !== filterId)
			} else {
				return [...prevSelectedFilters, filterId]
			}
		})
		handleSubmitSearch()
	}

	// Cambiar opciones de orden
	const handleSortChange = (optionId: string) => {
		setSelectedSortOptions(prevSelectedOptions => {
			if (prevSelectedOptions.includes(optionId)) {
				return prevSelectedOptions.filter(id => id !== optionId)
			} else {
				return [...prevSelectedOptions, optionId]
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

	// Mostrar en consola los filtros y orden seleccionados
	useEffect(() => {
		if (selectedFilters.length > 0) {
			console.log('Filtros seleccionados:', selectedFilters)
		}
	}, [selectedFilters])

	useEffect(() => {
		if (selectedSortOptions.length > 0) {
			console.log('Opciones de orden seleccionadas:', selectedSortOptions)
		}
	}, [selectedSortOptions])

	useEffect(() => {
		if (selectedAddressOptions.length > 0) {
			console.log('Opciones de lugares seleccionadas:', selectedAddressOptions)
		}
	}, [selectedAddressOptions])

	const filteredData = mockData.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	)

	useEffect(() => {
		if (search === '') {
			handleSubmitSearch()
		}
	}, [search])

	const [selectedCategories, setSelectedCategories] = useState([])

	const handleCategoryChange = (id: any) => {
		//setSelectedCategories((prev) => prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]	)
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
								value={search}
								onChange={handleSearchChange}
								placeholder="Buscar servicio..."
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										handleSubmitSearch()
									}
								}}
							/>
							{search && (
								<X
									className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
									size={18}
									onClick={() => setSearch('')}
								/>
							)}
						</div>
					</div>
					<div className="hidden md:block">
						<div className="flex gap-2">
							<div className="relative">
								<Button
									className="flex items-center gap-1 px-4 py-2"
									variant="outline"
									onClick={() => {
										setActiveDropdown(activeDropdown === 'filters' ? null : 'filters')
										setActiveDropdownSort(null)
									}}
								>
									<Filter size={16} />
									<span>Filtrar</span>
								</Button>
								<div
									ref={dropdownRef}
									className={cn(
										'absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50',
										activeDropdown === 'filters' ? 'block' : 'hidden'
									)}
								>
									<div className="max-h-60 overflow-y-auto">
										<ul className="mt-2 space-y-2 divide-y divide-gray-200">
											{categories.map((filter) => (
												<li key={filter.id}>
													<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer">
														<input
															type="checkbox"
															checked={selectedFilters.includes(filter.id)}
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
									className="flex items-center gap-1 px-4 py-2"
									variant="outline"
									onClick={() => {
										setActiveDropdownSort(activeDropdownSort === 'sort' ? null : 'sort')
										setActiveDropdown(null)
									}}
								>
									<SortAsc size={16} />
									<span>Ordenar</span>
								</Button>
								<div
									ref={dropdownRefSort}
									className={cn(
										'absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50',
										activeDropdownSort === 'sort' ? 'block' : 'hidden'
									)}
								>
									 <div className="max-h-60 overflow-y-auto">
										<ul className="mt-2 space-y-2 divide-y divide-gray-200">
											{sortOptions.map((option) => (
												<li key={option.id}>
													<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer">
														<input
															type="checkbox"
															checked={selectedSortOptions.includes(option.id)}
															onChange={() => handleSortChange(option.id)}
															className="mr-2 accent-blue-500"
														/>
														{option.label}
													</label>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className="relative">
								<Button
									className="flex items-center gap-1 px-4 py-2"
									variant="outline"
									onClick={() => {
										setActiveDropdownAddress(activeDropdownAddress === 'sort' ? null : 'sort')
										setActiveDropdown(null)
									}}
								>
									<MapPin size={16} />
									<span>Lugares</span>
								</Button>
								<div
									ref={dropdownRefAddress}
									className={cn(
										'absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50',
										activeDropdownAddress === 'sort' ? 'block' : 'hidden'
									)}
								>
									<input
										type="text"
										placeholder="Buscar lugares..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="mb-2 p-2 w-full border border-gray-300 rounded-md"
									/>
									<div className="max-h-64 overflow-y-auto">
										<ul className="mt-2 space-y-2 divide-y divide-gray-200">
											{filteredData.slice(0, 10).map((option) => (
												<li key={option.value}>
													<label className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer">
														<input
															type="checkbox"
															checked={selectedAddressOptions.includes(option.value)}
															onChange={() => handleAddressChange(option.value)}
															className="mr-2 accent-blue-500"
														/>
														{option.label}
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
				<button className="text-gray-700 font-semibold">Categoría</button>
				<button className="text-gray-700 font-semibold">Lugar</button>
				<button className="text-gray-700 font-semibold flex items-center" onClick={() => setOpen(true)}>
					Filtros <span className="ml-1">▼</span>
				</button>
			</div>

			{
				open && (
					<div
						className="fixed inset-0 bg-black/50 z-40 sm:hidden"
						onClick={() => setOpen(false)}
					></div>
				)
			}
			<div
				className={`fixed bottom-0 left-0 w-full bg-white h-[70vh] rounded-t-2xl shadow-lg transform transition-transform ${open ? 'translate-y-0' : 'translate-y-full'
				} z-50 p-4 flex flex-col`}
			>
				<div className="flex justify-between items-center border-b pb-2">
					<h2 className="text-lg font-semibold">Filtrar por</h2>
					<button onClick={() => setOpen(false)} className="text-gray-600">
						✖
					</button>
				</div>

				<div className="overflow-y-auto flex-grow p-2">
					<Accordion type="single" collapsible className="w-full border rounded-lg">
						<AccordionItem value="category-1">
							<AccordionTrigger className="flex justify-between items-center p-4 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 border-b w-full">
								<span>Categoría</span>
							</AccordionTrigger>
							<AccordionContent className="p-4">
								<ul className="space-y-2">
									{categories.map((category) => (
										<li key={category.id} className="flex items-center">
											<input
												type="checkbox"
												id={category.id}
												onChange={() => handleCategoryChange(category.id)}
												className="mr-2 accent-blue-500"
											/>
											<label
												htmlFor={category.id}
												className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer"
											>
												{category.label}
											</label>
										</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="category-2">
							<AccordionTrigger className="flex justify-between items-center p-4 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 border-b w-full">
								<span>Categoría 2</span>
							</AccordionTrigger>
							<AccordionContent className="p-4">
								<ul className="space-y-2">
									{categories.map((category) => (
										<li key={category.id} className="flex items-center">
											<input
												type="checkbox"
												id={category.id}
												onChange={() => handleCategoryChange(category.id)}
												className="mr-2 accent-blue-500"
											/>
											<label
												htmlFor={category.id}
												className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer"
											>
												{category.label}
											</label>
										</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				{/* Botón de Cerrar Fijo */}
				<div className="border-t p-4 bg-white">
					<button
						className="w-full bg-red-500 text-white py-2 rounded-md"
						onClick={() => setOpen(false)}
					>
						Cerrar
					</button>
				</div>
			</div>

		</div >
	)
}

export default ServiceSearch