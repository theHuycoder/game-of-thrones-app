import dayjs from 'dayjs';
import { AuthClientService } from '@/services';
import { LocalStorageUtils } from '.';

export default (() => {
  const isTokenExpires = (expiresOn: number) => dayjs().unix() > expiresOn;

  const verifyToken = async () => {
    const localToken = LocalStorageUtils.getStoredToken();

    if (!localToken) {
      return false;
    }

    const { expiresOn } = localToken;
    if (isTokenExpires(expiresOn)) {
      return false;
    }

    const resp = await AuthClientService.getVerifyToken(localToken.authToken);

    if (!resp) {
      return false;
    }

    const { isValid } = resp.data;

    return isValid;
  };

  return {
    isTokenExpires,
    verifyToken,
  };
})();
