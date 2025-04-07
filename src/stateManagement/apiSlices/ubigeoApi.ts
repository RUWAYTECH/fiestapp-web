import { getAllUbigeo } from '@stateManagement/queries/ubigeoQuery'
import apiSlice from './apiSlice'

export const ubigeoApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllUbigeo: builder.query(getAllUbigeo),
	})
})

export const {
	useGetAllUbigeoQuery,
} = ubigeoApi