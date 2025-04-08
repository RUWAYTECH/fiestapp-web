//import { severityStatusEnum } from '@constants/severity-status.enum'

export interface ApiResponseMessage {
	key: string
	value: string
}

/* export interface ApiResponseDto <T> {
	isValid: boolean
	severityCode: severityStatusEnum
	messages: ApiResponseMessage[]
	data: T
} */
export type ApiResponseDto<T> = T

export interface ApiResponseError {
	code?: string | number
	data?: {
		error?: string
		message?: string
		name?: string
		status?: number
	},
	status?: number
}

export interface User {
	id: number
	username: string
	email: string
}