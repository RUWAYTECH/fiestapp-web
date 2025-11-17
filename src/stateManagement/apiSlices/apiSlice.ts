import rtkAxiosBaseQuery from '@/core/services/api/rtkAxiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: rtkAxiosBaseQuery(),
	tagTypes: [
		'User'
	],
	endpoints: () => ({
	})
})

export const { middleware, reducer, reducerPath } = apiSlice

export default apiSlice