import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useClaimStore } from "@/stores/claimStore"
import { useLoadingStore } from "@/stores/loadingStore"
import { useWalletStore } from "@/stores/walletStore"
import { CheckCircle, Coins, Loader2, Wallet } from "lucide-react"
import { useState } from "react"

const Step2 = () => {
    
    const { claimData, setStep} = useClaimStore();
    const { wallet: wallets, walletAddress, setWallet, setWalletAddress } = useWalletStore();
    const { setIsLoading, loading: isLoading } = useLoadingStore();
    const [error, setError] = useState("")
    
    const walletConnected = wallets ? true : false

    const handleWalletConnect = async () => {
        setIsLoading(true)
        console.log(error)
        setError("")
        // Simulate wallet connection
        setTimeout(() => {
            setWallet('solana');
            setWalletAddress("0x1234...5678")
            setIsLoading(false)
        }, 1500)
    }
        
    const handleClaim = async () => {
        setIsLoading(true)
        setError("")
        // Simulate claiming tokens
        setTimeout(() => {
            setStep(3)
            setIsLoading(false)
        }, 2000)
    }

  return (
    <div className="space-y-6">
            {/* Campaign Info */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Coins className="w-6 h-6" />
                  {claimData?.name}
                </CardTitle>
                <CardDescription>{claimData?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {claimData?.tokensPerClaim} {claimData?.tokenSymbol}
                  </div>
                  <div className="text-sm text-gray-600">Available to claim</div>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Connection */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>Connect your crypto wallet to receive your loyalty tokens</CardDescription>
              </CardHeader>
              <CardContent>
                {!walletConnected ? (
                  <div className="space-y-3">
                    <Button
                      onClick={handleWalletConnect}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect MetaMask
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Phantom (Coming Soon)
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>Wallet connected: {walletAddress}</AlertDescription>
                    </Alert>
                    <Button
                      onClick={handleClaim}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Claiming Tokens...
                        </>
                      ) : (
                        <>
                          Claim {claimData?.tokensPerClaim} {claimData?.tokenSymbol}
                          <Coins className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
  )
}

export default Step2