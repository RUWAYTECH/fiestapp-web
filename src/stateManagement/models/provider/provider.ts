export interface ProviderResponseDto {
	id: number
	documentId: string
	name: string
	description: string | null
	address: string
	email: string
	isActive: boolean
	createdAt: string
	updatedAt: string
	publishedAt: string
}