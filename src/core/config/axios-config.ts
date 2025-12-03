import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { configEnv } from '../config';
import { ResponseMessageEnum, type ApiResponse } from '@/types/api-response.dto';

const api = axios.create({
	baseURL: configEnv.apiUrl,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const setToken = (token: string) => {
	if (token) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete api.defaults.headers.common['Authorization'];
	}
};

api.interceptors.response.use(
	res => res,
	(err: AxiosError<ApiResponse<null>>) => {
		let errorData = err.response?.data;

		if (!errorData) {
			errorData = {
				data: null,
				messages: [{ message: 'An unknown error occurred', type: ResponseMessageEnum.ERROR }]
			};
		}

		return Promise.reject(errorData);
	}
);

export class HttpClient {
	static async get<TResponse>(url: string, options?: AxiosRequestConfig<Record<string, unknown>>): Promise<TResponse> {
		const params = new URLSearchParams();

		if (options?.params) {
			Object.entries(options.params).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach(item => {
						if (item !== null && item !== undefined && item !== '') {
							params.append(key, item);
						}
					});
				} else if (value !== null && value !== undefined && value !== '') {
					params.append(key, value as string);
				}
			});
		}

		const response = await api.get<TResponse>(url, { ...options, params });
		return response.data;
	}

	static async post<TResponse, TRequest = unknown>(
		url: string,
		data: TRequest,
		options?: AxiosRequestConfig<Record<string, unknown>>
	): Promise<TResponse> {
		const response = await api.post<TResponse>(url, data, options);
		return response.data;
	}

	static async put<TResponse, TRequest = unknown>(
		url: string,
		data: TRequest,
		options?: AxiosRequestConfig<Record<string, unknown>>
	): Promise<TResponse> {
		const response = await api.put<TResponse>(url, data, options);
		return response.data;
	}

	static async patch<TResponse, TRequest = unknown>(
		url: string,
		data: TRequest,
		options?: AxiosRequestConfig<Record<string, unknown>>
	): Promise<TResponse> {
		const response = await api.patch<TResponse>(url, data, options);
		return response.data;
	}

	static async delete<TResponse>(
		url: string,
		options?: AxiosRequestConfig<Record<string, unknown>>
	): Promise<TResponse> {
		const response = await api.delete<TResponse>(url, options);
		return response.data;
	}
}
