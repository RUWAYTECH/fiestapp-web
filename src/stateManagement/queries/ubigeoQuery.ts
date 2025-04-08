import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { UbigeoResponseDto } from '@stateManagement/models/ubigeo/ubigeo'

export const getAllUbigeo = {
	query: () => {
		return {
			url: endpoints.ubigeo.getAllUbigeo,
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<UbigeoResponseDto[]>) => response
}