import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { LoginResponseDto } from '@stateManagement/models/auth/login'
import { RegisterRequestDto } from '@stateManagement/models/auth/register'

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

export const registerMutation = {
	query: (data: RegisterRequestDto) => {
		return {
			url: endpoints.auth.register,
			method: 'POST',
			data,
		}
	},
	transformResponse: (response: ApiResponseDto<LoginResponseDto>) => response
}