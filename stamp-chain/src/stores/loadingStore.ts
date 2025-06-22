import { create } from "zustand"

interface useLoadingStoreType {
    loading: boolean,
    setIsLoading: (value: boolean) => void
}

export const useLoadingStore = create<useLoadingStoreType>((set) => ({
    loading: false,
    setIsLoading: (value) => {
        set({loading: value})
    }
}))