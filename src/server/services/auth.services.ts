import dayjs from 'dayjs';

import { Low } from 'lowdb';
import { nanoid } from 'nanoid';
import { TokenResponse, IUser, LoginParams } from '../../modals/auth.modals';
import { IDbModal } from '../db/lowdb';

const TOKEN_SPLIT_WORD = 'USER_ID:';

export class AuthService {
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
      authToken: `${nanoid(10)}${TOKEN_SPLIT_WORD}${matchedUser.id}`,
      expiresOn: dayjs().add(1, 'hour').unix(),
    };
  }

  public async isTokenValid(token: string): Promise<boolean> {
    return !!this.findUserByToken(token);
  }

  public async findUserByToken(token: string) {
    const [, userId] = token.split(TOKEN_SPLIT_WORD);

    const matchedUser = await this.findUserById(Number(userId));

    if (!matchedUser) return null;

    return matchedUser;
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

  public async findUserById(id: number): Promise<IUser | null> {
    await this.db.read();

    const { data } = this.db;

    if (!data || !data.users) {
      return null;
    }

    const matchedUser = data.users.find((user) => user.id === id);
    if (!matchedUser) {
      return null;
    }
    return matchedUser;
  }
}
