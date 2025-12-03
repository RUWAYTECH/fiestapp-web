import { CategoryCommonDto } from '../category-common.dto';

export interface CategoryResDto extends CategoryCommonDto {
	id: string;
	image: string;
}
