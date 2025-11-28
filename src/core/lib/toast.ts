import { toast } from 'sonner';
import { ApiResponse, ApiResponseMessage, ResponseMessageEnum } from '@/types/api-response.dto';

export const dispatchToast = {
	error: (message: string) => {
		toast.error(message);
	},
	success: (message: string) => {
		toast.success(message);
	},
	info: (message: string) => {
		toast.info(message);
	},
	warning: (message: string) => {
		toast.warning(message);
	},
	default: (message: string) => {
		toast(message);
	},
	messages: (messages: (string | ApiResponseMessage)[]) => {
		messages.forEach(m => {
			if (typeof m === 'string') {
				dispatchToast.error(m);
			} else {
				dispatchToast.apiMessage(m);
			}
		});
	},
	apiMessage: (message: ApiResponseMessage) => {
		switch (message.type) {
			case ResponseMessageEnum.ERROR:
				dispatchToast.error(message.message);
				break;
			case ResponseMessageEnum.WARNING:
				dispatchToast.warning(message.message);
				break;
			case ResponseMessageEnum.INFO:
				dispatchToast.info(message.message);
				break;
			case ResponseMessageEnum.SUCCESS:
				dispatchToast.success(message.message);
				break;
			default:
				dispatchToast.default(message.message);
		}
	},
	apiMessages: (messages: ApiResponseMessage[]) => {
		if (!messages || Array.isArray(messages) === false || messages.length === 0) return;

		messages.forEach(m => dispatchToast.apiMessage(m));
	},
	apiRes: <T = unknown>(res: ApiResponse<T>) => {
		dispatchToast.apiMessages(res.messages);
	}
};
