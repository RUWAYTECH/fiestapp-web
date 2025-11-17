import { ProviderResponseDto } from '../provider/provider'
import { ServiceResponseDto } from '../service/create'

export interface RequestServiceDetailRequestDto {
	comment: string
	quantity: number
	priceFinal: number
	service: string | number
}

export interface RequestServiceRequestDto {
	message: string
	totalPrice: number
	registerDate: string | Date
	entityStatus: string
	provider: string | number
	numberInvite: number
	approximateBudget: number
	requestServiceDetail: RequestServiceDetailRequestDto[]
}

export interface RequestServiceDetailResponseDto {
	id: number
	documentId: string
	quantity: number
	priceFinal: number
	comment: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	locale: null
	service: ServiceResponseDto
}

export interface RequestServiceResponseDto {
	id: number
	documentId: string
	message: string
	totalPrice: number
	registerDate: string
	entityStatus: 'Solicitado' | 'Aceptado' | 'Rechazado' | 'Finalizado'
	createdAt: string
	updatedAt: string
	publishedAt: string
	numberInvite: number
	approximateBudget: number
	provider: ProviderResponseDto
	requestServiceDetails: RequestServiceDetailResponseDto[]
}