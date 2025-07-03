'use client';
import { useClaimStore } from "@/stores/claimStore"
import { useWalletStore } from "@/stores/walletStore";

export const Steps = () => {
    const step = useClaimStore(s => s.step)
    const { wallet } = useWalletStore();
    
    return(
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {step === 1 && "Enter Claim Token"}
              {step === 2 && wallet ? "Claim to your wallet" : "Connect Your Wallet"}
              {step === 3 && "Claim Successful!"}
            </h1>
            <p className="text-gray-600">
              {step === 1 && "Scan the QR code or enter your claim token to get started"}
              {step === 2 && wallet ? "Claim your loyalty tokens to your wallet" : "Connect your wallet to receive your loyalty tokens"}
              {step === 3 && "Your tokens have been successfully claimed!"}
            </p>
          </div>
          </div>
    )
}