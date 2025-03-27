'use client'

import { Search, Filter, SortAsc, MapPin } from 'lucide-react'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'

const CategorySearch = () => {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setActiveDropdown(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div ref={dropdownRef}>
			<h1 className="text-xl font-semibold mb-3 text-gray-800">Locales para fiestas</h1>

			<div className="flex flex-wrap items-center gap-3">
				<div className="relative flex-1 min-w-[200px] max-w-full">
					<Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
					<Input
						type="text"
						placeholder="Buscar categoría..."
						className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex gap-2 relative">
					<div className="relative">
						<Button
							className="flex items-center gap-1 px-4 py-2"
							variant="outline"
							onClick={() =>
								setActiveDropdown(activeDropdown === 'filters' ? null : 'filters')
							}
						>
							<Filter size={16} />
							<span>Filtrar</span>
						</Button>
						<div
							className={cn(
								'absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-3',
								activeDropdown === 'filters' ? 'block' : 'hidden'
							)}
						>
							<ul className="mt-2 space-y-2">
								<li><button className="text-sm text-gray-600 hover:text-blue-500">Por precio</button></li>
								<li><button className="text-sm text-gray-600 hover:text-blue-500">Por ubicación</button></li>
								<li><button className="text-sm text-gray-600 hover:text-blue-500">Por valoración</button></li>
							</ul>
						</div>
					</div>

					<div className="relative">
						<Button
							className="flex items-center gap-1 px-4 py-2"
							variant="outline"
							onClick={() =>
								setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')
							}
						>
							<SortAsc size={16} />
							<span>Ordenar</span>
						</Button>

						<div
							className={cn(
								'absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-3',
								activeDropdown === 'sort' ? 'block' : 'hidden'
							)}
						>
							<ul className="mt-2 space-y-2">
								<li><button className="text-sm text-gray-600 hover:text-blue-500">Precio más bajo</button></li>
								<li><button className="text-sm text-gray-600 hover:text-blue-500">Mejor valoración</button></li>
								<li><button className="text-sm text-gray-600 hover:text-blue-500">Más reservados</button></li>
							</ul>
						</div>
					</div>

					<Button className="flex items-center gap-1 px-4 py-2" variant="outline">
						<MapPin size={16} />
						<span>Ver Mapa</span>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default CategorySearch