import { allServiceCategoryById, createServices, getAllServices, getServiceById } from '@stateManagement/queries/serviceQuery'
import apiSlice from './apiSlice'

export const serviceApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllServices: builder.query(getAllServices),
		createServices: builder.mutation(createServices),
		getServiceById: builder.query(getServiceById),
		allServiceCategoryById: builder.query(allServiceCategoryById),
	})
})

export const {
	useGetAllServicesQuery,
	useCreateServicesMutation,
	useGetServiceByIdQuery,
	useAllServiceCategoryByIdQuery,

} = serviceApi