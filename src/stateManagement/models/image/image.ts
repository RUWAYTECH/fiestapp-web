export interface CreateImageRequestDto {
	url: string,
	name: string,
	serviceId: string
    providerId: string
    categoryId: string
}
export interface ImageResponseDto {
    imageId: string,
    url: string,
    name: string,
    serviceId: string,
    providerId: string,
    categoryId: string
}