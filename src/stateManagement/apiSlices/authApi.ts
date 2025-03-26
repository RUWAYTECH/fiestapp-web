import apiSlice from './apiSlice'
import { loginMutation, registerMutation } from '@stateManagement/queries/authQuery'

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation(loginMutation),
		register: builder.mutation(registerMutation),
	})
})

export const { useLoginMutation, useRegisterMutation } = authApi