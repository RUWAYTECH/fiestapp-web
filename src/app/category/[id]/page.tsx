import AppLayout from '@components/containers/layout/layout'
import ShowByServiceId from '../components/show-by-serviceid'

const RutaPage = async () => {

	return (
		<AppLayout>
			<div className='max-w-full mx-auto p-4' >
				<ShowByServiceId service={{
					id: 1,
					title: 'Salón de Fiestas',
					description: 'Espacios para eventos.',
					image: 'https://cdn0.matrimonio.com.pe/vendor/8263/3_2/640/jpg/4_11_108263-157332288041700.jpeg',
					rating: 3,
					priceMin: 500,
					priceMax: 1500,
					address: 'Av. Central 123, Ciudad'
				}}/>
			</div>
		</AppLayout>
	)
}
export default RutaPage