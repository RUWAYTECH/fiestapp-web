import { severityStatusEnum } from '@constants/severity-status.enum'

export interface ApiResponseMessage {
	key: string
	value: string
}

export interface ApiResponseDto <T> {
	isValid: boolean
	severityCode: severityStatusEnum
	messages: ApiResponseMessage[]
	data: T
}

export interface ApiResponseError {
	data?: {
		error?: string
		message?: string
		statusCode?: number
	},
	status?: number
}

export interface User {
	userId: string
	name: string
	email: string
	picture: string
	phone?: string
}