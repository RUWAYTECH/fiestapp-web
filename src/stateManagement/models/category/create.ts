import { FileImageResponseDto } from "./fileImage"

export interface CreateCategoryRequestDto {
	id: string,
	serviceId: string,
	imageId: string,
	name: string,
	description: string
}
export interface CategoryResponseDto {
	id: string,
	serviceId: string,
	documentId: string,
	name: string,
	description: string
	categoryImage: FileImageResponseDto[]
}