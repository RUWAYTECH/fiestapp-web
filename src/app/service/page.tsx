import { Suspense } from 'react'
import ServicesPageClient from './components/services-page-client'

const ServicesPage = () => {
	return (
		<Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
			<ServicesPageClient />
		</Suspense>
	)
}

export default ServicesPage