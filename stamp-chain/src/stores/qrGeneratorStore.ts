import { create } from 'zustand'

export interface campaingsType {
  id: string,
  name: string,
  tokenSymbol: string
}
interface qrCodeType {
  id: string; 
  url: string; 
  token: string
}

type FormStore = {
  campaign: Array<campaingsType>,
  selectedCampaign: string,
  setSelectedCampaign: (id: string) => void,
  setCampaign: (data: Array<campaingsType>) => void,
  qrCount: string, 
  setQrCount: (value: string) => void,
  qrCodes: Array<qrCodeType>, 
  setQrCodes: (data: Array<qrCodeType>) => void
}

export const useQrGeneratorStore = create<FormStore>((set) => ({
  campaign: [],
  selectedCampaign: '',
  setSelectedCampaign: (id) => {
    set({
      selectedCampaign: id
    })
  },
  qrCount: "10",
  setQrCount: (value) => {
    set({qrCount: value})
  },
  qrCodes: [],
  setQrCodes: (value) => {
    set(({
      qrCodes: value
    }))
  },
  setCampaign: (values) => {
    set({
      campaign: values
    })
  }
}))