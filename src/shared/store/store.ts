import create from 'zustand';
import { IUser } from '@/modals/auth.modals';

type UserWithoutPassword = Omit<IUser, 'password'>;

export type AppStoreState = {
  user: UserWithoutPassword | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: UserWithoutPassword | null) => void;
};

export const useAppStore = create<AppStoreState>((set) => ({
  user: null,
  setUser: (user: UserWithoutPassword | null) => set({ user }),
}));
