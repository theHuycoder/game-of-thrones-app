import { http } from './https';
import { LoginParams, LoginResponse } from '../../modals/auth.modals';

export default {
  postLogin: async (body: LoginParams) =>
    http.post<LoginResponse>('/api/auth/login', body),
};
