import { AuthProviderEnum } from '@/core/constants/auth-provider';

export interface SignInReqDto {
	email: string;
	password: string;
}

export interface SignUpReqDto {
	name: string;
	email: string;
	password: string;
}

export interface SignInWithOauthProviderReqDto {
	provider: AuthProviderEnum;
	token: string;
}
