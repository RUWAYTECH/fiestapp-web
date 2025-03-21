import { config } from '@config/config'
import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

const instanceAxios = axios.create({
	baseURL: config.apiUrl,
	headers: { 'Content-Type': 'application/json' },
})

instanceAxios.interceptors.request.use(async (config) => {
	const session = await getSession()
	const token = session?.accessToken

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

instanceAxios.interceptors.response.use(
	response => response,
	error => {
		const originalRequest = error.config

		if (error.response.status === 401 && originalRequest.url != '/auth/login') {
			signOut({ redirect: false})
			window.location.href = '/'
		}

		return Promise.reject(error)
	}
)

export { instanceAxios }