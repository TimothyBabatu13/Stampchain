import { create } from 'zustand'

const mockCampaignData = {
    name: "Coffee Shop Loyalty Program",
    tokenSymbol: "COFFEE",
    tokensPerClaim: 10,
    description: "Earn loyalty tokens for every purchase at our coffee shop!",
}
interface ClaimStore {
    step: number,
    setStep: (value: number) => void,
    claimData: typeof mockCampaignData | null,
    setClaimData: (value: typeof mockCampaignData | null) => void,
    id: string | null,
    setId: (value: string) => void
}

export const useClaimStore = create<ClaimStore>((set) => ({
    step: 1,
    setStep: (value) => {
        set({step: value})
    },
    id: null,
    claimData: null,
    setClaimData: (value) => {
        set({claimData: value})
    },
    setId: (value) => {
        set({id: value})
    }
}))