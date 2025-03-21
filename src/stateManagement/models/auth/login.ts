import { User } from '@/types'

export interface LoginRequestDto {
	email: string
	password: string
}

export interface LoginResponseDto {
	user: User
	token: string
}