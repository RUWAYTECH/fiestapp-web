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


export const AllSearchServiceCategoryUbigeo = {
	query: (params: {
		search?: string;
		idCategory?: string;
		idUbigeo?: string;
		idServices?: string;
		priceMin?: number;
		priceMax?: number;
		sortBy?: string;
	}) => {
		const searchParams = new URLSearchParams()

		searchParams.append('pagination[pageSize]', '1000')

		if (params.search?.trim()) {
			searchParams.append('filters[name][$containsi]', params.search.trim())
		}

		if (params.idCategory?.trim()) {
			const ids = params.idCategory
				.split(',')
				.map(id => id.trim())
				.filter(id => id)

			ids.forEach(id => searchParams.append('filters[category][id][$in]', id))
		}


		if (params.idServices?.trim() === 'none') {
			searchParams.append('filters[id][$in]', '')

		} else if (params.idServices?.trim()) {
			const ids = params.idServices
				.split(',')
				.map(id => id.trim())
				.filter(id => id)

			ids.forEach(id => searchParams.append('filters[id][$in]', id))

		}

		if (params.priceMin !== undefined && params.priceMax !== undefined) {
			searchParams.append('filters[priceMax][$gte]', params.priceMin.toString())
			searchParams.append('filters[priceMin][$lte]', params.priceMax.toString())
		} else if (params.priceMin !== undefined) {
			searchParams.append('filters[priceMax][$gte]', params.priceMin.toString())
		} else if (params.priceMax !== undefined) {
			searchParams.append('filters[priceMin][$lte]', params.priceMax.toString())
		}

		switch (params.sortBy) {
		case 'priceLow':
			searchParams.append('sort[0]', 'priceMin:asc')
			break
		case 'bestRating':
			searchParams.append('sort[0]', 'score:desc')
			break
		}

		return {
			url: `/services?${searchParams.toString()}&populate=*`,
			method: 'GET',
		}
	},

	transformResponse: (response: ServiceResponseDto[]) => response
}