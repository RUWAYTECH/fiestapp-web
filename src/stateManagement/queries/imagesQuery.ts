import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'

export const uploadImage = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	query: (data:any) => {
		return {
			url: endpoints.images.uploadImage,
			method: 'POST',
			data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	transformResponse: (response: ApiResponseDto<any>) => response
}