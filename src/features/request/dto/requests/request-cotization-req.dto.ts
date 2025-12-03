import { RequestCommonDto } from '../request-common.dto';

export interface RequestCotizationReqDto extends RequestCommonDto {
	items: {
		id: string;
		quantity: number;
	}[];
}
