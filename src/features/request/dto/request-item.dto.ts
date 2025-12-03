import { ServiceResDto } from '@/features/service/dto/responses/service-res.dto';

export interface RequestItemDto {
	id: string;
	quantity: number;
	price: number;
	total: number;
	comment: string;
	service: ServiceResDto & { images: { url: string }[] };
}
