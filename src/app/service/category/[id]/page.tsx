'use client'
import AppLayout from '@components/containers/layout/layout'
import { usePathname } from 'next/navigation'
import ServiceSearch from '@app/service/components/service-search'
import ServiceCard from '@app/service/components/service-card'
import { useGetAllUbigeoQuery } from '@stateManagement/apiSlices/ubigeoApi'
import { useAllServiceCategoryByIdQuery } from '@stateManagement/apiSlices/serviceApi'
import { useState } from 'react'

const RutaPage: React.FC = () => {
	const pathname = usePathname()
	const id = pathname.split('/').pop()
	const [search, setSearch] = useState('')

	const { data: servicesCategoryByIdData, isLoading } = useAllServiceCategoryByIdQuery(id ?? '', {
		skip: !id,
	})

	const {data:ubigeoData} = useGetAllUbigeoQuery({})

	const dataSearch = (data: { search: string, filter: string[], sort: string[], location: string[] }) => {
		console.log('search', data)
		if (data.search==='') {
			setSearch('')
		}else{
			setSearch(data.search)
		}
	}
	return (
		<AppLayout>
			<div className="container mx-auto p-4">
				<div>
					<ServiceSearch onSubmited={dataSearch} ubigeo={ubigeoData?.data || []} />
					{!search && (<ServiceCard data={servicesCategoryByIdData?.data || []} isLoading={isLoading}/>)}
				</div>
				{search && (<>
					<div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
						<aside  className="hidden md:block bg-white p-4 rounded-lg shadow-md border border-gray-200 w-[250px]">
							<h2 className="text-lg font-semibold mb-4">Filtrar por</h2>
							<div className="mb-4">
								<h3 className="text-sm font-semibold text-gray-700 mb-2">Categoría</h3>
								<ul className="space-y-2">
									<li>
										<button className="text-sm text-gray-600 hover:text-blue-500">Automóviles</button>
									</li>
									<li>
										<button className="text-sm text-gray-600 hover:text-blue-500">Motos</button>
									</li>
									<li>
										<button className="text-sm text-gray-600 hover:text-blue-500">Camiones</button>
									</li>
								</ul>
							</div>
							<div className="mb-4">
								<h3 className="text-sm font-semibold text-gray-700 mb-2">Precio</h3>
								<div className="flex items-center space-x-2">
									<input
										type="number"
										placeholder="Mínimo"
										className="w-1/2 p-1 border rounded-md text-sm"
									/>
									<span>-</span>
									<input
										type="number"
										placeholder="Máximo"
										className="w-1/2 p-1 border rounded-md text-sm"
									/>
								</div>
							</div>
							<div className="mb-4">
								<h3 className="text-sm font-semibold text-gray-700 mb-2">Ubicación</h3>
								<select className="w-full p-1 border rounded-md text-sm">
									<option>Selecciona una ciudad</option>
									<option>Lima</option>
									<option>Arequipa</option>
									<option>Trujillo</option>
								</select>
							</div>
							<button className="w-full bg-blue-500 text-white py-2 rounded-md mt-2 hover:bg-blue-600">
								Aplicar filtros
							</button>
						</aside>
						<main className="flex-1">
							<ServiceCard data={servicesCategoryByIdData?.data || []} isLoading={isLoading}/>
						</main>
					</div>
				</>)}
			</div>
		</AppLayout>
	)
}
export default RutaPage