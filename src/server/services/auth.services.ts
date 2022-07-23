import dayjs from 'dayjs';

import { Low } from 'lowdb';
import { nanoid } from 'nanoid';
import { LoginResponse, IUser, LoginParams } from '../../modals/auth.modals';
import { IDbModal } from '../db/lowdb';

interface IAuthService {
  handleLogin: (params: LoginParams) => Promise<LoginResponse | null>;
}

export class AuthService implements IAuthService {
  private db: Low<IDbModal>;

  constructor(db: Low<IDbModal>) {
    this.db = db;
  }

  public async handleLogin({ email, password }: LoginParams) {
    const matchedUser = await this.findUserByEmail(email);
    if (!matchedUser) {
      return null;
    }

    if (matchedUser.password !== password) {
      return null;
    }
    return {
      authToken: `${nanoid(10)}USER_ID:${matchedUser.id}`,
      expiresOn: dayjs().add(1, 'hour').unix(),
    };
  }

  private async findUserByEmail(email: string): Promise<IUser | null> {
    await this.db.read();

    const { data } = this.db;

    if (!data || !data.users) {
      return null;
    }

    const matchedUser = data.users.find((user) => user.email === email);
    if (!matchedUser) {
      return null;
    }
    return matchedUser;
  }
}
