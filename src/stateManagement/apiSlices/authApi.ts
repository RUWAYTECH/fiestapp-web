import apiSlice from './apiSlice'
import { loginMutation } from '@stateManagement/queries/authQuery'

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation(loginMutation)
	})
})

export const { useLoginMutation } = authApi