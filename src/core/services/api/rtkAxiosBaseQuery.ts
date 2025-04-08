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
			code: err?.code,
			data: err?.response?.data?.data,
			error: {
				status: err?.response?.status,
				data: {
					message: err?.response?.data?.error?.message,
					name: err?.response?.data?.error?.name,
				}
			},
			status: err?.response?.status
		}
	}
}

export default rtkAxiosBaseQuery