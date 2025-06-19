import { create } from 'zustand';

type walletValues = 'solana' | 'ethereum' | 'polygon' | 'base' | null 
interface walletStoreProvider {
    wallet: walletValues,
    setWallet: (fields: walletValues) => void
}

export const useFormStore = create<walletStoreProvider>((set) => ({
    wallet: null,
    setWallet: (wallet) => set({wallet: wallet})
}))