import { create } from 'zustand'

type FormValues = {
  name: string
  description: string
  tokenSymbol: string
  totalSupply: string
  tokensPerClaim: string
  maxClaimsPerWallet: string
  expirationDate: string
  enableExpiration: boolean
  blockchain: string,
  file: File | null
}

type FormStore = {
  form: FormValues
  setForm: (fields: Partial<FormValues>) => void
  reset: () => void
}

export const useFormStore = create<FormStore>((set) => ({
  form: {
    name: '',
    description: '',
    tokenSymbol: '',
    totalSupply: '',
    tokensPerClaim: '',
    maxClaimsPerWallet: '',
    expirationDate: '',
    enableExpiration: false,
    blockchain: 'solana',
    file: null
  },
  setForm: (fields) =>
    set((state) => ({
      form: { ...state.form, ...fields },
    })),
  reset: () =>
    set({
      form: {
        name: '',
        description: '',
        tokenSymbol: '',
        totalSupply: '',
        tokensPerClaim: '',
        maxClaimsPerWallet: '',
        expirationDate: '',
        enableExpiration: false,
        blockchain: 'solana',
        file: null
      },
    }),
}))