import { createPaymentService, getAllPaymentServices } from '@stateManagement/queries/payQuery'
import apiSlice from './apiSlice'

export const paymentApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllPaymentServices: builder.query(getAllPaymentServices),
		createPaymentService: builder.mutation(createPaymentService),
	})
})

export const {
	useGetAllPaymentServicesQuery,
	useCreatePaymentServiceMutation,

} = paymentApi