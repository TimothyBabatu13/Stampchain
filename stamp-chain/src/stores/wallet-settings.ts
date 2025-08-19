import { create } from 'zustand'


interface WalletBalance {
    solBalance: null | number,
    baseBalance: null | number,
    setSolBalance: (value: number) => void,
    setBaseBalance: (value: number) => void,
    solWalletAddress: null | string,
    baseWalletAddress: null | string,
    setSolWalletAddress: (value: string) => void
    setBaseWalletAddress: (value: string) => void
}

export const useWalletSettings = create<WalletBalance>((set) => ({
    solBalance: null,
    baseBalance: null,
    setSolBalance: (value) => {
        set({solBalance: value})
    },
    setBaseBalance: (value) => {
        set({baseBalance: value})
    },
    solWalletAddress: null,
    baseWalletAddress: null,
    setSolWalletAddress: (value) => {
        set({solWalletAddress: value})
    },
    setBaseWalletAddress: (value) => {
        set({baseWalletAddress: value})
    }
}))