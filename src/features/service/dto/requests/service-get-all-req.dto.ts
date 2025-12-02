import { GetAllReqDto } from '@/types/get-all-req.dto';

export interface ServiceGetAllReqDto extends GetAllReqDto {
	categoryId?: string[];
	providerId?: string[];
	ubigeoId?: string[];
	status?: boolean;
	sortBy?: 'PRICE' | 'RATING' | 'CREATED_AT';
}
