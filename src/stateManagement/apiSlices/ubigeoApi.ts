import { getAllUbigeo, searchUbigeo } from '@stateManagement/queries/ubigeoQuery'
import apiSlice from './apiSlice'

export const ubigeoApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllUbigeo: builder.query(getAllUbigeo),
		searchUbigeo: builder.query(searchUbigeo),
	})
})

export const {
	useGetAllUbigeoQuery,
	useLazySearchUbigeoQuery
} = ubigeoApi