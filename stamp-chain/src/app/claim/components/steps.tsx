'use client';
import { useClaimStore } from "@/stores/claimStore"
import { useWalletStore } from "@/stores/walletStore";

export const Steps = () => {
    const step = useClaimStore(s => s.step)
    const { wallet } = useWalletStore();
    
    const renderText = (step: number, sub?: boolean) => {
      if(step === 1){
        return sub ? "Enter Claim Token" : "Scan the QR code or enter your claim token to get started"
      }
      if(step === 2) {
        if(sub){
          return  wallet ? "Claim to your wallet" : "Connect Your Wallet" 
        }
        return wallet ? "Claim your loyalty tokens to your wallet" : "Connect your wallet to receive your loyalty tokens"
      }
      return sub ? "Claim Successful" : "Your tokens have been successfully claimed!"
    }
    renderText(step)
    return(
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? "bg-black" : "bg-gray-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? "bg-black" : "bg-gray-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {
                renderText(step, true)
              }
            </h1>
            <p className="text-gray-600">
              {
                renderText(step)
              }
            </p>
          </div>
          </div>
    )
}