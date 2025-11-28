import { UserProvider } from '@/types/user';
import { ServiceCommonDto } from '../service-common.dto';

export interface ServiceResDto extends ServiceCommonDto {
	id: string;
	score: number;
	provider: UserProvider;
	images: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ServiceListResDto extends ServiceResDto {}
