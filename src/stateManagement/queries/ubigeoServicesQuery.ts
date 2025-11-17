import { ApiResponseDto } from '@/types'
import { UbigeoServiceResponseDto } from '@stateManagement/models/ubigeoServices/ubigeoServices'

export const getAllUbigeoServicesByUbigeo = {
	query: (params: {
		idUbigeo?: string;
	}) => {
		const searchParams = new URLSearchParams()

		searchParams.append('pagination[pageSize]', '1000')

		if (params.idUbigeo?.trim()) {
			const ids = params.idUbigeo
				.split(',')
				.map(id => id.trim())
				.filter(id => id)

			ids.forEach(id => searchParams.append('filters[ubigeo][id][$in]', id))
		}

		return {
			url: `/ubigeo-services?${searchParams.toString()}&populate=*`,
			method: 'GET',
		}
	},

	//transformResponse: (response: ApiResponseDto<UbigeoServiceResponseDto[]>) => response
	transformResponse: (response: { data: ApiResponseDto<UbigeoServiceResponseDto[]> }) => response.data
}