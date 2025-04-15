'use client'

import ServiceCard from '@components/containers/service-card/service-card'
import { useGetMyFavoriteQuery } from '@stateManagement/apiSlices/favoriteApi'

const MyFavoritePage = () => {
	const { data, isLoading } = useGetMyFavoriteQuery(undefined)

	return (
		<div>
			<ServiceCard
				data={data?.data || []}
				isLoading={isLoading}
			/>
		</div>
	)
}

export default MyFavoritePage