import { createCategory, getAllCategory } from '@stateManagement/queries/categoryQuery'
import apiSlice from './apiSlice'

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllCategory: builder.query(getAllCategory),
		createCategory: builder.mutation(createCategory),
		Lastcategory: builder.query(getAllCategory),
	})
})

export const {
	useGetAllCategoryQuery,
	useCreateCategoryMutation,
	useLastcategoryQuery

} = categoryApi