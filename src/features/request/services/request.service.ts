import { HttpClient } from '@/core/config/axios-config';
import { ep } from '@/core/constants/endpoints';
import { ApiResponse, PaginatedApiResponse } from '@/types/api-response.dto';
import { RequestCotizationReqDto } from '../dto/requests/request-cotization-req.dto';
import { RequestGetAllReqDto } from '../dto/requests/request-get-all-req.dto';
import { RequestResDto, RequestWithItemsResDto } from '../dto/responses/request-res.dto';
import { RequestPayCotizationReqDto } from '../dto/requests/request-pay-cotization-req.dto';

export class RequestService {
	static async getAll(token: string, query?: RequestGetAllReqDto) {
		try {
			const res = await HttpClient.get<PaginatedApiResponse<RequestResDto[]>>(ep.request.getAll, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: query
			});

			return res;
		} catch {
			return null;
		}
	}

	static async getById(id: string, token: string) {
		try {
			const res = await HttpClient.get<ApiResponse<RequestWithItemsResDto>>(ep.request.getById.replace(':id', id), {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			return res;
		} catch {
			return null;
		}
	}

	static async cotization(data: RequestCotizationReqDto, token: string) {
		const res = await HttpClient.post<ApiResponse<null>>(ep.request.cotization, data, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		return res;
	}

	static async payCotization(id: string, data: RequestPayCotizationReqDto, token: string) {
		const res = await HttpClient.post<ApiResponse<null>>(ep.request.payCotization.replace(':id', id), data, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		return res;
	}
}
