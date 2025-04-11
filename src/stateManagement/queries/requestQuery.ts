import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { RequestServiceRequestDto } from '@stateManagement/models/request/request-service'

export const createRequestService = {
	query: (data: RequestServiceRequestDto) => {
		return {
			url: endpoints.request.createRequest,
			method: 'POST',
			data
		}
	},
	transformResponse: (response: ApiResponseDto<null>) => response
}