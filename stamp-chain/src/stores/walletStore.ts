import { create } from 'zustand';

type walletValues = 'solana' | 'ethereum' | 'polygon' | 'base' | null 
interface walletStoreProvider {
    wallet: walletValues,
    setWallet: (fields: walletValues) => void,
    connectedWallets: Array<walletValues>,
    setConnectedWallets: (wallet: walletValues) => void,
    walletAddress: string,
    setWalletAddress: (value: string) => void
}

export const useWalletStore = create<walletStoreProvider>((set) => ({
    wallet: null,
    setWallet: (wallet) => set({wallet: wallet}),
    connectedWallets: [],
    setConnectedWallets: (wallet) => {
        set((prevWallets) => ({
            connectedWallets: [...prevWallets.connectedWallets, wallet],
        }))
    },
    walletAddress: '',
    setWalletAddress: (value) => {
        set({
            walletAddress: value
        })
    }
}))