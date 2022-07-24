import { http, secureHttp } from './https';
import {
  LoginParams,
  TokenResponse,
  TokenVerifiedResult,
  IUser,
} from '@/modals/auth.modals';
import { API_URL_MAP } from '../../shared/utils/map';

export default {
  postLogin: async (body: LoginParams) =>
    http.post<TokenResponse>(API_URL_MAP.getLoginUrl(), body),
  getVerifyToken: async (token: string) =>
    http.get<TokenVerifiedResult>(API_URL_MAP.getVerifyToken(), {
      headers: {
        Authorization: token,
      },
    }),
  getUserInfo: async () =>
    secureHttp.get<{ user: Omit<IUser, 'password'> }>(
      API_URL_MAP.getUserInfo(),
    ),
};
