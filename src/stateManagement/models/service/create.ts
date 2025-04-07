export interface CreateServiceRequestDto {
	id: string,
	providerId: string,
	categoryId: string,
	name: string,
	description: string,
	priceMax: number,
	priceMin: number,
	score: number,
	tag: number

}
export interface ServiceResponseDto {
	id: string,
	providerId: string,
	documentId: string,
	categoryId: string,
	name: string,
	description: string,
	address?: string,
	priceMax: number,
	priceMin: number,
	score: number,
	tag: number,
	provider?: {
		id: string,
		name: string,
		documentId: string,
		description: string,
		address: string,
		email: string,
		createdAt: string,
		updatedAt: string,
	},
	fileImage?: [{
		id?:number,
		name?:string,
		documentId?:string,
		url?: string,
	}],

}