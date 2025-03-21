export interface ApiResponseDto <T> {
	type: string
	messages: string[]
	data: T
}

export interface User {
	userId: string
	name: string
	email: string
	picture: string
	phone?: string
}