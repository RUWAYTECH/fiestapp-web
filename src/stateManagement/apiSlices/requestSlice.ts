import { createRequestService, getMyRequestService } from '@stateManagement/queries/requestQuery'
import apiSlice from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createRequest: builder.mutation(createRequestService),
		getMyRequestService: builder.query(getMyRequestService),
	})
})

export const { useCreateRequestMutation, useGetMyRequestServiceQuery } = authApi