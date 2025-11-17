import { ApiResponseDto } from '@/types'
import { endpoints } from '@constants/endpoints'
import { CreatePaymentReqDto, PaymentResDto } from '@stateManagement/models/payment/payment'

export const getAllPaymentServices = {
	query: () => {
		return {
			url: endpoints.payment.getAllPayment,
			method: 'GET',
		}
	},
	transformResponse: (response: { data: ApiResponseDto<PaymentResDto[]> }) => response.data
}

export const createPaymentService = {
	query: (data: CreatePaymentReqDto) => {
		return {
			url: endpoints.payment.createPayment,
			method: 'POST',
			data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	},
	transformResponse: (response: ApiResponseDto<PaymentResDto>) => response
}