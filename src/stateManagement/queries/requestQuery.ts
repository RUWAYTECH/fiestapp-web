import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { RequestServiceRequestDto } from '@stateManagement/models/request/request-service'
import { ServiceResponseDto } from '@stateManagement/models/service/create'

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
	transformResponse: (response: ApiResponseDto<{ data: ServiceResponseDto[] }>) => response,
}