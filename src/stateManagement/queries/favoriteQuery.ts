import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { FavoriteRequestDto, FavoriteResponseDto } from '@stateManagement/models/favorite/favorite'
import { ServiceResponseDto } from '@stateManagement/models/service/create'

export const allFavorite = {
	query: () => {
		return {
			url: endpoints.favorite.allFavorite,
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<FavoriteResponseDto[]>) => response
}

export const getFavoriteByserviceId = {
	query: (params: { serviceId: string, userId: string }) => {
		return {
			url: endpoints.favorite.getFavoriteByserviceId.replace(':userId', params.userId).replace(':serviceId', params.serviceId),
			method: 'GET',
		}
	},
	//transformResponse: (response: ApiResponseDto<FavoriteResponseDto[]>) => response
	transformResponse: (response: ApiResponseDto<{ data: FavoriteResponseDto[] }>) => response
}

export const addFavorite = {
	query: (params: FavoriteRequestDto) => {
		return {
			url: endpoints.favorite.addFavorite,
			method: 'POST',
			data: {
				data: {
					userId: params.userId,
					service: params.service
				}
			}
		}
	},
	transformResponse: (response: FavoriteResponseDto[]) => response
}

export const deleteFavorite = {
	query: (params: { favoriteId: number }) => {
		return {
			url: endpoints.favorite.deleteFavorite.replace(':favoriteId', `${params.favoriteId}`),
			method: 'DELETE',
		}
	},
	transformResponse: (response: FavoriteResponseDto[]) => response
}

export const getMyFavorite = {
	query: () => {
		return {
			url: endpoints.favorite.getMyFavorite,
			method: 'GET',
		}
	},
	transformResponse: (response: ApiResponseDto<{ data: ServiceResponseDto[] }>) => response
}