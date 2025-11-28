import { Provider, User } from '@/types/user';
import { RequestCommonDto } from '../request-common.dto';
import { RequestStatus } from '../../constants/request-status';
import { RequestPaymentDto } from '../request-payment.dto';
import { RequestItemDto } from '../request-item.dto';

export interface RequestResDto extends RequestCommonDto {
	id: string;
	user: User;
	provider: Provider;
	status: RequestStatus;
	priceFinal: number | null;
	createdAt: Date;
	payment: RequestPaymentDto | null;
}

export interface RequestWithItemsResDto extends RequestResDto {
	items: RequestItemDto[];
}
