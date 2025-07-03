import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useClaimStore } from "@/stores/claimStore"
import { useLoadingStore } from "@/stores/loadingStore"
import { useWalletStore } from "@/stores/walletStore"
import { WalletName } from "@solana/wallet-adapter-base"
import { useWallet } from "@solana/wallet-adapter-react"
import { CheckCircle, Coins, Loader2, Wallet } from "lucide-react"
import { useCallback, useState } from "react"

const Step2 = () => {
    
    const { claimData, setStep} = useClaimStore();
    const { wallet: wallets, walletAddress } = useWalletStore();
    const { wallet, wallets: useWalletWallet, connect, select } = useWallet()
    const { setIsLoading, loading: isLoading } = useLoadingStore();

    const [show, setShow] = useState(false)
    const walletConnected = wallets ? true : false
    
    const handleWalletConnect = async () => {
      setIsLoading(true)
      setShow(true)
      
    }
    const handleConnectWallet = useCallback((name: string)=>{
      const run = async () => {
          select(name as WalletName);
          await connect();
          setShow(false);
          setIsLoading(false)
      }
      run();
    }, [wallet, useWalletWallet]) 
        
    const handleClaim = async () => {
        setIsLoading(true)
        // Simulate claiming tokens
        setTimeout(() => {
            setStep(3)
            setIsLoading(false)
        }, 2000)
    }

  return (
    <div className="space-y-6">
      {
        show && <div className=" fixed h-[50vh] w-[80vw] bg-red-200 z-20">
          Showing ..
          {
            useWalletWallet.map(i => (
              <Button key={crypto.randomUUID()} onClick={()=>handleConnectWallet(i.adapter.name)}>
                {
                  i.adapter.name
                }
              </Button>
            ))
          }
        </div>
      }
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
              {!walletConnected && <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>Connect your crypto wallet to receive your loyalty tokens</CardDescription>
              </CardHeader>}
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
                          Connect Wallet
                        </>
                      )}
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


// https://www.youtube.com/watch?v=vHFZFXtjKNE