export const APP_URL_MAP = {
  getLoginView: () => '/auth/login',
  getDashboardView: () => '/dashboard',
};

export const API_URL_MAP = {
  getLoginUrl: () => '/api/auth/login',
  getVerifyToken: () => '/api/auth/verify-token',
  getUserInfo: () => '/api/auth/user-info',

  // GOT API
  getCharacters: () => '/characters',
  getCharacterById: (id: string) => `/characters/${id}`,
  getBooks: () => '/books',
  getBookById: (id: string) => `/books/${id}`,
  getHouses: () => '/houses',
  getHouseById: (id: string) => `/houses/${id}`,
};
