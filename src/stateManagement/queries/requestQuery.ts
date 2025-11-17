import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { RequestServiceRequestDto, RequestServiceResponseDto } from '@stateManagement/models/request/request-service'

export const createRequestService = {
	query: (data: RequestServiceRequestDto) => {
		return {
			url: endpoints.request.createRequest,
			method: 'POST',
			data: { data }
		}
	},
	transformResponse: (response: ApiResponseDto<null>) => response
}

export const getMyRequestService = {
	query: () => {
		return {
			url: endpoints.request.getMyRequest,
			method: 'GET'
		}
	},
	transformResponse: (response: ApiResponseDto<{ data: RequestServiceResponseDto[] }>) => response,
}

export const getRequestServicesResponseProvider = {
	query: () => {
		return {
			url: endpoints.request.getRequestServicesResponseProvider,
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<{ data: RequestServiceResponseDto[] }>) => response
}