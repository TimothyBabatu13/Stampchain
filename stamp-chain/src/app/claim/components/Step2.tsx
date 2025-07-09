import ConnectWallet from "@/components/connect-wallet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatAddress } from "@/lib/format-address"
import { useClaimStore } from "@/stores/claimStore"
import { useLoadingStore } from "@/stores/loadingStore"
import { useWalletStore } from "@/stores/walletStore"
import { CheckCircle, Coins, Loader2, Wallet } from "lucide-react"

const Step2 = () => {

    const { claimData, setStep} = useClaimStore();
    const { wallet: wallets, walletAddress } = useWalletStore();
    const { setIsLoading, loading: isLoading } = useLoadingStore();

    const walletConnected = wallets ? true : false
        
    const handleClaim = async () => {

      setIsLoading(true)
      try {  
        const api = await fetch('/api/claim/to-wallet', {
          method: 'POST',
          body: JSON.stringify({wallet: 'solana', walletAddress, token: "ooaoaso"})
        })
        const response = await api.json();
        console.log(response)
        console.log(setStep(3))
      } catch (error) {
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
       
    }

  return (
    <div className="space-y-6">
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

            <Card className="border-0 shadow-lg">
              {!walletConnected && <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>Connect your crypto wallet to receive your loyalty tokens</CardDescription>
              </CardHeader>}
              <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>Wallet connected: {formatAddress(walletAddress)}</AlertDescription>
                    </Alert>
                    <ConnectWallet className="w-full" />
                    <Button
                      onClick={handleClaim}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      disabled={isLoading || !wallets || !walletAddress}
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
              </CardContent>
            </Card>
          </div>
  )
}

export default Step2


// https://www.youtube.com/watch?v=vHFZFXtjKNE