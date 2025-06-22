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

const campaigns : Array<campaingsType> = [
  { id: "1", name: "Coffee Shop Loyalty", tokenSymbol: "COFFEE" },
  { id: "2", name: "YouTube Subscriber Rewards", tokenSymbol: "YT" },
  { id: "3", name: "Conference Attendance", tokenSymbol: "CONF" },
]

type FormStore = {
  campaign: Array<campaingsType>,
  selectedCampaign: string,
  setSelectedCampaign: (id: string) => void,
  setCampaign: (data: campaingsType) => void,
  qrCount: string, 
  setQrCount: (value: string) => void,
  qrCodes: Array<qrCodeType>, 
  setQrCodes: (data: Array<qrCodeType>) => void
}

export const useQrGeneratorStore = create<FormStore>((set) => ({
  campaign: campaigns,
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
    set((prev) => ({
      campaign: [...prev.campaign, values]
    }))
  }
}))