'use client'

interface RequestDetailPageProps {
	params: Promise<{
		requestId: string
	}>
}

const RequestDetailPage = async ({ params }: RequestDetailPageProps) => {
	const { requestId } = await params

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Detalle de Solicitud</h1>
			<p className='text-gray-600 mb-4'>ID de solicitud: {requestId}</p>

			{/* TODO: Add request detail components here */}
			<div className='bg-white rounded-lg shadow p-6'>
				<p>Contenido del detalle de la solicitud será implementado aquí.</p>
			</div>
		</div>
	)
}

export default RequestDetailPage