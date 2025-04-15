'use client'

import ServiceCard from '@components/containers/service-card/service-card'
import { useGetMyRequestServiceQuery } from '@stateManagement/apiSlices/requestSlice'

const MyRequestPage = () => {
	const { data, isLoading } = useGetMyRequestServiceQuery(undefined)

	return (
		<div>
			<ServiceCard
				data={data?.data || []}
				isLoading={isLoading}
			/>
		</div>
	)
}

export default MyRequestPage