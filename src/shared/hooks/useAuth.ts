import { useEffect } from 'react';
import {
  TokenUtils,
  redirectTo,
  APP_URL_MAP,
  LocalStorageUtils,
} from '@/shared/utils';

import { AuthClientService } from '@/services';
import { useAppStore } from '@/shared/store';

type UseAuthParams = {
  redirectOnSuccessUrl?: string;
};

export const useAuth = ({ redirectOnSuccessUrl }: UseAuthParams = {}) => {
  const setUser = useAppStore((s) => s.setUser);
  const user = useAppStore((s) => s.user);

  useEffect(() => {
    (async () => {
      const isTokenValid = await TokenUtils.verifyToken();
      if (!isTokenValid) {
        LocalStorageUtils.removeAuthToken();
        return redirectTo(APP_URL_MAP.getLoginView());
      }

      const resp = await AuthClientService.getUserInfo();
      if (!resp) {
        LocalStorageUtils.removeAuthToken();
        return redirectTo(APP_URL_MAP.getLoginView());
      }
      const { user: userResp } = resp.data;
      return setUser(userResp);
    })();
  }, []);

  useEffect(() => {
    if (user && redirectOnSuccessUrl) {
      redirectTo(redirectOnSuccessUrl);
    }
  }, [user, redirectOnSuccessUrl]);

  return {
    user,
  };
};
