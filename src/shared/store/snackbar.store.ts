/* eslint-disable no-unused-vars */
import create from 'zustand';

type SnackbarState = {
  message: string;
  showSnackbar: boolean;
  onSnackbar: (message: string) => void;
  offSnackbar: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: '',
  showSnackbar: false,
  onSnackbar: (message: string) => set({ message, showSnackbar: true }),
  offSnackbar: () => set({ showSnackbar: false, message: '' }),
}));
