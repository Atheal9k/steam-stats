import { create } from "zustand";

interface LoadingStateStore {
  isLoading: boolean;
  setLoading: (loadingState: boolean) => void;
}

export const useLoading = create<LoadingStateStore>((set) => ({
  isLoading: false,
  setLoading: (loadingState: boolean) =>
    set(() => ({ isLoading: loadingState })),
}));
