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

export const searchUbigeo = {
	query: (params: { search?: string }) => {
		return {
			url: endpoints.ubigeo.searchUbigeo.replaceAll(':search', params.search || ''),
			method: 'GET',
		}
	},
	transformResponse: (response: UbigeoResponseDto[]) => response
}