import { create } from 'zustand'


interface ClaimStore {
    created_at: string,
    setCreatedAt: (value: string) => void,
    tokenperclaim: string,
    setTokenPerClaim: (value: string) => void,
    maxClaim: string,
    setMaxClaim: (value: string) => void,
}

export const useTokenUtility = create<ClaimStore>((set) => ({
    created_at: '',
    setCreatedAt: (value) => {
        set({created_at: value})
    },
    tokenperclaim: '',
    setTokenPerClaim: (value) => {
        set({tokenperclaim: value})
    },
    maxClaim: '',
    setMaxClaim: (value) => {
        set({maxClaim: value})
    },
}))
