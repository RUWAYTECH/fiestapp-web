import { User } from '@/types/user';

export interface AuthResDto {
	token: string;
	user: User;
}
