'use client'
import AppLayout from '@components/containers/layout/layout'
import ShowByServiceId from '../components/show-by-serviceid'
import { usePathname } from 'next/navigation'
import { useGetServiceByIdQuery } from '@stateManagement/apiSlices/serviceApi'

const RutaPage: React.FC = () => {
	const pathname = usePathname()
	const id = pathname.split('/').pop()
	const { data: servicesByIdData, isLoading } = useGetServiceByIdQuery(id ?? '', {
		skip: !id,
	})
	return (
		<AppLayout>
			<div className='container mx-auto p-4'>
				{servicesByIdData &&
					<ShowByServiceId service={{
						title: 'Smartphone XYZ Pro',
						description: 'Un smartphone de última generación con una pantalla increíble y una batería de larga duración.',
						rating: 4,
						priceMin: 2999,
						priceMax: 3599,
						address: 'Av. Tecnológica 123, Ciudad Tech',
						images: [
							'https://cdn0.matrimonio.com.pe/vendor/8263/3_2/640/jpg/4_11_108263-157332288041700.jpeg',
							'https://cdn0.matrimonio.com.pe/vendor/8263/3_2/640/jpg/espaciosalon_11_108263.jpeg',
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5Ugu6vTKJmrR6iL7HFRkNb6_-M2Ym-qLTQ&s'
						]
					}} />}
			</div>
		</AppLayout>
	)
}
export default RutaPage