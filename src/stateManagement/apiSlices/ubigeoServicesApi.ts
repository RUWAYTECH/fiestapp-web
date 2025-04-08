import { getAllUbigeoServicesByUbigeo } from '@stateManagement/queries/ubigeoServicesQuery'
import apiSlice from './apiSlice'

export const ubigeoServiceApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({

		getAllUbigeoServicesByUbigeo: builder.query(getAllUbigeoServicesByUbigeo),
	})
})

export const {
	useGetAllUbigeoServicesByUbigeoQuery,
	useLazyGetAllUbigeoServicesByUbigeoQuery,

} = ubigeoServiceApi