export type LoginResponse = {
  authToken: string;
  expiresOn: number;
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
