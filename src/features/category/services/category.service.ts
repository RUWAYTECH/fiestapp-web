import { HttpClient } from '@/core/config/axios-config';
import { CategoryGetAllReqDto } from '../dto/requests/category-get-all-req.dto';
import { ep } from '@/core/constants/endpoints';
import { PaginatedApiResponse } from '@/types/api-response.dto';
import { CategoryResDto } from '../dto/responses/category-res.dto';

export class CategoryService {
	static async getAll(query?: CategoryGetAllReqDto) {
		try {
			const res = await HttpClient.get<PaginatedApiResponse<CategoryResDto[]>>(ep.category.getAll, { params: query });
			return res;
		} catch {
			return null;
		}
	}
}
