import { TokenResponse } from '@/modals/auth.modals';

const AUTH_TOKEN_LOCAL_NAME = 'authToken';

export default (() => {
  const isTokenExist = () =>
    !!window.localStorage.getItem(AUTH_TOKEN_LOCAL_NAME);

  const saveAuthToken = (authInfo: TokenResponse) => {
    window.localStorage.setItem(
      AUTH_TOKEN_LOCAL_NAME,
      JSON.stringify(authInfo),
    );
  };
  const removeAuthToken = () => {
    window.localStorage.removeItem(AUTH_TOKEN_LOCAL_NAME);
  };

  const getStoredToken = () => {
    if (isTokenExist()) {
      return JSON.parse(
        window.localStorage.getItem(AUTH_TOKEN_LOCAL_NAME) as string,
      );
    }

    return null;
  };

  return {
    saveAuthToken,
    removeAuthToken,
    getStoredToken,
  };
})();
