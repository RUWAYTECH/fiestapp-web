import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { CategoryResponseDto, CreateCategoryRequestDto } from '@stateManagement/models/category/create'

export const getAllCategory = {
	query: () => {
		return {
			url: endpoints.category.getAllCategory,
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<CategoryResponseDto[]>) => response
}

export const createCategory = {
	query: (data: CreateCategoryRequestDto) => {
		return {
			url: endpoints.category.createCategory,
			method: 'POST',
			data,
		}
	},
	transformResponse: (response: ApiResponseDto<CategoryResponseDto>) => response
}