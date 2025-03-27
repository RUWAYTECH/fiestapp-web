export interface CreateServiceRequestDto {
	serviceId: string,
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
	serviceId: string,
	providerId: string,
	categoryId: string,
	name: string,
	description: string,
	priceMax: number,
	priceMin: number,
	score: number,
	tag: number

}