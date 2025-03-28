import { createServices, getAllServices } from '@stateManagement/queries/serviceQuery'
import apiSlice from './apiSlice'

export const serviceApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllServices: builder.query(getAllServices),
		createServices: builder.mutation(createServices),
	})
})

export const {
	useGetAllServicesQuery,
	useCreateServicesMutation,

} = serviceApi