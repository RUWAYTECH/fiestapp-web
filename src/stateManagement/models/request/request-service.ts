export interface RequestServiceDetailRequestDto {
	comment: string
	quantity: number
	priceFinal: number
	service: string | number
}

export interface RequestServiceRequestDto {
	message: string
	totalPrice: number
	registerDate: string
	entityStatus: string
	provider: string | number
	numberInvite: number
	approximateBudget: number
	requestServiceDetail: RequestServiceDetailRequestDto[]
}