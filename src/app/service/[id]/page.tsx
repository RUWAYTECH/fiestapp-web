'use client'
import AppLayout from '@components/containers/layout/layout'
import ShowByServiceId from '../components/show-by-serviceid'
import { useParams, usePathname } from 'next/navigation'
import { useGetServiceByIdQuery } from '@stateManagement/apiSlices/serviceApi'
import { useEffect, useRef } from 'react'

const RutaPage = () => {
	const { id } = useParams<{ id: string }>()
	const pathname = usePathname()
	const previousPath = useRef<string>('')

	const { data: servicesByIdData } = useGetServiceByIdQuery(id ?? '', {
		skip: !id,
	})

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			console.log('App is changing to: ', url)
		}

		if (previousPath.current !== pathname) {
			handleRouteChange(pathname)
			previousPath.current = pathname
		}
	}, [pathname])

	return (
		<AppLayout>
			<div className='container mx-auto p-4'>
				{servicesByIdData &&
					<ShowByServiceId service={servicesByIdData.data} />}
			</div>
		</AppLayout>
	)
}
export default RutaPage