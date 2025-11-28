import { HttpClient } from '@/core/config/axios-config';
import { ep } from '@/core/constants/endpoints';
import { PaginatedApiResponse } from '@/types/api-response.dto';
import { UbigeoResDto } from '../dto/ubigeo-res.dto';
import { UbigeoGetAllReqDto } from '../dto/ubigei-get-all-req.dto';

export class UbigeoService {
	static async getAll(query?: UbigeoGetAllReqDto) {
		try {
			const res = await HttpClient.get<PaginatedApiResponse<UbigeoResDto[]>>(ep.ubigeo.getAll, { params: query });
			return res;
		} catch {
			return null;
		}
	}
}
