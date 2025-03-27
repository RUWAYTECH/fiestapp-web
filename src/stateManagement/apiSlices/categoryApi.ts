import { createCategory, getAllCategory } from '@stateManagement/queries/categoryQuery'
import apiSlice from './apiSlice'

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllCategory: builder.query(getAllCategory),
		createCategory: builder.mutation(createCategory),
	})
})

export const {
	useGetAllCategoryQuery,
	useCreateCategoryMutation,

} = categoryApi