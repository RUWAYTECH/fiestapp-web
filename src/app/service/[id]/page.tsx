'use client'
import AppLayout from '@components/containers/layout/layout'
import ShowByServiceId from '../components/show-by-serviceid'
import { usePathname } from 'next/navigation'
import { useGetServiceByIdQuery } from '@stateManagement/apiSlices/serviceApi'

const RutaPage: React.FC = () => {
	const pathname = usePathname()
	const id = pathname.split('/').pop()
	const { data: servicesByIdData } = useGetServiceByIdQuery(id ?? '', {
		skip: !id,
	})
	return (
		<AppLayout>
			<div className='container mx-auto p-4'>
				{servicesByIdData &&
					<ShowByServiceId service={servicesByIdData} />}
			</div>
		</AppLayout>
	)
}
export default RutaPage