import { createRequestService, getMyRequestService, getRequestServicesResponseProvider } from '@stateManagement/queries/requestQuery'
import apiSlice from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createRequest: builder.mutation(createRequestService),
		getMyRequestService: builder.query(getMyRequestService),
		getRequestServicesResponseProvider: builder.query(getRequestServicesResponseProvider),
	})
})

export const {
	useCreateRequestMutation,
	useGetMyRequestServiceQuery,
	useGetRequestServicesResponseProviderQuery,
} = authApi