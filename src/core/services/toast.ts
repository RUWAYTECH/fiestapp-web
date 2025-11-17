import { ApiResponseError } from '@/types'
import { toast } from 'sonner'

export const dispatchToast = (message: string, type?: 'success' | 'error' | 'warning' | 'info') => {
	if (type) {
		toast[type](message)
	} else {
		toast(message)
	}
}

export const dispatchToastError = (error: string | string[] | ApiResponseError) => {
	if (Array.isArray(error)) {
		error.forEach((message) => dispatchToast(message, 'error'))
	} else if (typeof error === 'string') {
		dispatchToast(error, 'error')
	} else if (error?.data?.message) {
		dispatchToast(error.data.message, 'error')
	}
}

export const dispatchToastSuccess = (message: string) => dispatchToast(message, 'success')

export const toastService = {
	success: (message: string) => dispatchToast(message, 'success'),
	error: (message: string) => dispatchToast(message, 'error'),
	warning: (message: string) => dispatchToast(message, 'warning'),
	info: (message: string) => dispatchToast(message, 'info'),
	toastError: dispatchToastError,
	toastSuccess: dispatchToastSuccess,
}