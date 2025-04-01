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
	categoryId: string,
	name: string,
	description: string,
	priceMax: number,
	priceMin: number,
	score: number,
	tag: number

}