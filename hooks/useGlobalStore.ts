import { create } from 'zustand';

interface GlobalState {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: any;
    setUser: (value: any) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    user: null,
    setUser: (value) => set({ user: value }),
    isLoading: true,
    setIsLoading: (value) => set({ isLoading: value }),
}));

export default useGlobalStore;
