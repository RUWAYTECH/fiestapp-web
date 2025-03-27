export interface CreateCategoryRequestDto {
	categoryId: string,
	serviceId: string,
	imageId: string,
	name: string,
	description: string
}
export interface CategoryResponseDto {
	categoryId: string,
	serviceId: string,
	imageId: string,
	name: string,
	description: string
}