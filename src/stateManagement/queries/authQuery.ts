import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { LoginResponseDto } from '@stateManagement/models/auth/login'

export const loginMutation = {
	query: (data: { email: string, password: string }) => {
		return {
			url: endpoints.auth.login,
			method: 'POST',
			data,
		}
	},
	transformResponse: (response: ApiResponseDto<LoginResponseDto>) => response
}