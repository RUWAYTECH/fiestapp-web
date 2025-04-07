import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { CreateServiceRequestDto, ServiceResponseDto } from '@stateManagement/models/service/create'

export const getAllServices = {
	query: () => {
		return {
			url: endpoints.service.getAllService,
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<ServiceResponseDto[]>) => response
}

//realizaremos una consulta por serviceId
export const getServiceById = {
	query: (id: string) => {
		return {
			url: endpoints.service.getServiceById.replace(':id', id),
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<ServiceResponseDto>) => response
}

export const createServices = {
	query: (data: CreateServiceRequestDto) => {
		return {
			url: endpoints.service.createService,
			method: 'POST',
			data,
		}
	},
	transformResponse: (response: ApiResponseDto<ServiceResponseDto>) => response
}

export const getServiceByProviderDocumentId = {
	query: (params: {documentId: string, documentServiceId: string}) => {
		return {
			url: endpoints.service.getServiceByUserId.replace(':documentId', params.documentId).replace(':serviceDocumentId', params.documentServiceId),
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<ServiceResponseDto[]>) => response
}
export const allServiceCategoryById = {
	query: (id: string) => {
		return {
			url: endpoints.service.getServiceCategoryById.replace(':id', id),
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<ServiceResponseDto[]>) => response
}