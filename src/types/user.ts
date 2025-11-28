import { UserRoleEnum } from '@/core/constants/user-role';

export interface User {
	id: string;
	name: string;
	email: string;
	picture: string;
	role: UserRoleEnum;
}

export interface Provider {
	id: string;
	name: string;
	description: string;
	picture: string;
	address: string;
	email: string;
	website: string;
	phone: string;
	facebook?: string;
	instagram?: string;
}

export interface UserProvider extends User {
	provider: Provider;
}
