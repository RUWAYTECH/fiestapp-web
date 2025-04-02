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
	fileImage?: [{
		id?:number,
		name?:string,
		documentId?:string,
		formats?:{
			thumbnail?:{
				name?:string,
				url?:string,
			}
		}
	}],

}