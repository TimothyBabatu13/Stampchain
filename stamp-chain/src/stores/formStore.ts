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
  blockchain: string
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
    blockchain: 'ethereum',
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
        blockchain: 'ethereum',
      },
    }),
}))
