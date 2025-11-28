import { HttpClient } from '@/core/config/axios-config';
import { ep } from '@/core/constants/endpoints';
import { ApiResponse, PaginatedApiResponse } from '@/types/api-response.dto';
import { ServiceGetAllReqDto } from '../dto/requests/service-get-all-req.dto';
import { ServiceResDto } from '../dto/responses/service-res.dto';

export class ServiceService {
	static async getAll(query?: ServiceGetAllReqDto) {
		try {
			const res = await HttpClient.get<PaginatedApiResponse<ServiceResDto[]>>(ep.service.getAll, { params: query });
			return res;
		} catch {
			return null;
		}
	}

	static async getById(id: string) {
		try {
			const res = await HttpClient.get<ApiResponse<ServiceResDto>>(ep.service.getById.replace(':id', id));
			return res;
		} catch {
			return null;
		}
	}

	static async toogleFavorite(id: string) {
		const res = await HttpClient.post<ApiResponse<null>>(ep.service.toggleFavorite.replace(':id', id), {});
		return res;
	}

	static async getFavorites(token: string) {
		try {
			const res = await HttpClient.get<PaginatedApiResponse<ServiceResDto[]>>(ep.service.getFavorites, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return res;
		} catch {
			return null;
		}
	}
}
