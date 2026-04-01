import { create } from 'zustand';
import { UserDataType } from '@/types/auth';

interface AuthState {
  user: UserDataType | null;
  loading: boolean;
  setUser: (user: UserDataType | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
