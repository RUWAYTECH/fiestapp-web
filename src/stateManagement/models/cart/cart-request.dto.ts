export interface CartItemRequestDto {
	id: string,
	providerId: string,
	categoryId: string,
	name: string,
	description: string,
	priceMax: number,
	priceMin: number,
	score: number,
	tag: number,
    quantity: number,

}
export interface CartRequestDto {
	id: string,
	message: string,
	total_price: number,
	service: CartItemRequestDto,
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