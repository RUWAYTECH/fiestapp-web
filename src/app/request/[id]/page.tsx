'use client'

interface RequestPageProps {
	params: Promise<{
		id: string
	}>
}

const RequestPage = async ({ params }: RequestPageProps) => {
	const { id } = await params

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Solicitud</h1>
			<p className='text-gray-600 mb-4'>ID: {id}</p>

			{/* TODO: Add request components here */}
			<div className='bg-white rounded-lg shadow p-6'>
				<p>Contenido de la solicitud será implementado aquí.</p>
			</div>
		</div>
	)
}

export default RequestPage