import axios from 'axios';
import { TokenUtils, redirectTo, LocalStorageUtils } from '@/shared/utils';
import { APP_URL_MAP } from '../../shared/utils/map';

export const http = axios.create();

export const secureHttp = axios.create();
export const httpGOT = axios.create({
  baseURL: import.meta.env.VITE_GOT_URL || '',
});

const controller = new AbortController();

secureHttp.interceptors.request.use(async (config) => {
  const isTokenValid = TokenUtils.verifyToken();
  const newConfig = {
    ...config,
    signal: controller.signal,
  };

  if (!isTokenValid) {
    controller.abort();
    redirectTo(APP_URL_MAP.getLoginView());
    return newConfig;
  }

  return {
    ...config,
    headers: {
      Authorization: LocalStorageUtils.getStoredToken().authToken,
    },
  };
});
