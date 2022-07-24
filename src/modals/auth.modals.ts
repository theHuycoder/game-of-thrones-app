export type TokenResponse = {
  authToken: string;
  expiresOn: number;
};

export type TokenVerifiedResult = {
  isValid: boolean;
};

export type LoginParams = {
  email: string;
  password: string;
};

export interface IUser {
  id: string;
  email: string;
  password: string;
}
