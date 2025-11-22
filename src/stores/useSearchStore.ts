import { create } from 'zustand';

interface SearchState {
  searchText: string; // từ khóa search
  setSearchText: (k: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchText: '',
  setSearchText: (k) => set({ searchText: k }),
}));
