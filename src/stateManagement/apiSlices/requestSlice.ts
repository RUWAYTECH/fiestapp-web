import { createRequestService } from '@stateManagement/queries/requestQuery'
import apiSlice from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createRequest: builder.mutation(createRequestService)
	})
})

export const { useCreateRequestMutation } = authApi