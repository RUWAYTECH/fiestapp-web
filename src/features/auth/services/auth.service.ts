import { HttpClient } from '@/core/config/axios-config';
import { ApiResponse } from '@/types/api-response.dto';
import { SignInReqDto, SignInWithOauthProviderReqDto, SignUpReqDto } from '../dto/auth-req.dto';
import { AuthResDto } from '../dto/auth-res.dto';
import { ep } from '@/core/constants/endpoints';

export class AuthService {
	static async login(data: SignInReqDto) {
		const res = await HttpClient.post<ApiResponse<AuthResDto>>(ep.auth.login, data);
		return res;
	}

	static async register(data: SignUpReqDto) {
		const res = await HttpClient.post<ApiResponse<AuthResDto>>(ep.auth.register, data);

		return res;
	}

	static async signInWithOauthProvider(data: SignInWithOauthProviderReqDto) {
		const res = await HttpClient.post<ApiResponse<AuthResDto>>(ep.auth.oauthSignIn, data);
		return res;
	}
}
