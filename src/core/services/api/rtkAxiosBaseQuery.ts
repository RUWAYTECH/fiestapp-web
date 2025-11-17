import { AxiosError } from 'axios'
import { instanceAxios } from './instanceAxios'

const rtkAxiosBaseQuery = (configs = { baseUrl: '' }) => async ({ url = '', method = 'GET', ...restParams }) => {
	try {
		const { data: dataResult } = await instanceAxios.request({
			url: configs.baseUrl + url,
			method,
			...restParams,
		})

		return { data: dataResult }
	} catch (axiosError) {
		const err = axiosError as AxiosError<{ error?: { message?: string; name?: string }, data: unknown }>

		return {
			error: {
				status: err?.response?.status || 500,
				data: {
					message: err?.response?.data?.error?.message || err?.message,
					name: err?.response?.data?.error?.name || 'UnknownError',
				}
			}
		}
	}
}

export default rtkAxiosBaseQuery