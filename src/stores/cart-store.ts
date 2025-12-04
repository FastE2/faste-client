import { create } from 'zustand';

interface CartState {
  totalCartItem: number;
  setTotalCartItem: (count: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  totalCartItem: 0,
  setTotalCartItem: (count) => set({ totalCartItem: count }),
}));
