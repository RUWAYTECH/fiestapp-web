import { createServices, getAllServices, getServiceById, getServiceByProviderDocumentId,allServiceCategoryById, AllSearchServiceCategoryUbigeo } from '@stateManagement/queries/serviceQuery'
import apiSlice from './apiSlice'

export const serviceApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllServices: builder.query(getAllServices),
		createServices: builder.mutation(createServices),
		getServiceById: builder.query(getServiceById),
		getServiceByProviderDocumentId: builder.query(getServiceByProviderDocumentId),
		allServiceCategoryById: builder.query(allServiceCategoryById),
		AllSearchServiceCategoryUbigeo: builder.query(AllSearchServiceCategoryUbigeo),
	})
})

export const {
	useGetAllServicesQuery,
	useCreateServicesMutation,
	useGetServiceByIdQuery,
	useGetServiceByProviderDocumentIdQuery,
	useAllServiceCategoryByIdQuery,
	useLazyAllSearchServiceCategoryUbigeoQuery,

} = serviceApi