import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { UserDataType } from '@/types/auth';

interface AuthState {
  user: UserDataType | null;
  loading: boolean;
  setUser: (user: UserDataType | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    loading: true,
    setUser: (user) =>
      set((state) => {
        state.user = user as any;
      }),
    setLoading: (loading) =>
      set((state) => {
        state.loading = loading;
      }),
  })),
);
