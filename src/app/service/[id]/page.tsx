'use client'
import AppLayout from '@components/containers/layout/layout'
import ShowByServiceId from '../components/show-by-serviceid'
import { useParams } from 'next/navigation'
import { useGetServiceByIdQuery } from '@stateManagement/apiSlices/serviceApi'

const RutaPage = () => {
	const { id } = useParams<{ id: string }>()

	const { data: servicesByIdData } = useGetServiceByIdQuery(id ?? '', {
		skip: !id,
	})

	return (
		<AppLayout>
			<div className='container mx-auto p-4'>
				{servicesByIdData &&
					<ShowByServiceId service={servicesByIdData.data} />}
			</div>
		</AppLayout>
	)
}

export const runtime = 'edge'
export default RutaPage