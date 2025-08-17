import ConnectWallet from "@/components/connect-wallet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatAddress } from "@/lib/format-address"
import { useClaimStore } from "@/stores/claimStore"
import { useLoadingStore } from "@/stores/loadingStore"
import { useWalletStore } from "@/stores/walletStore"
import { CheckCircle, Coins, Loader2, Wallet } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"

interface Data  {
  name: string,
  tokenSymbol: string,
  tokensPerClaim: number,
  description: string,
}

interface Response {
  success: boolean,
  error: false | string,
  data: Data
}



const Step2 = () => {

    const { claimData, setClaimData, id, uniqueId} = useClaimStore();
    const { wallet: wallets, walletAddress } = useWalletStore();
    const { setIsLoading, loading: isLoading } = useLoadingStore();

    const walletConnected = wallets ? true : false
    
    useEffect(()=>{
      const fetchData = async () => {
        const api = await fetch('api/fetch-claim-qr-details',{
          method: "POST",
          body: JSON.stringify(id)
        });
        const res = await api.json() as Response;
        if(!res.success && typeof res.error === 'string'){
          toast.error(res.error);
          return
        }
        setClaimData(res.data)
      }
      fetchData();
    }, [])
    const handleClaim = async () => {
      console.log(uniqueId)
      setIsLoading(true)
      try {  
        const api = await fetch('/api/claim/to-wallet', {
          method: 'POST',
          body: JSON.stringify({wallet: 'solana', walletAddress, tokenId: id!, uniqueId: uniqueId!})
        })
        const response = await api.json() as {success: boolean, error: boolean | string, data: null | string;}
        
        if(!response.success && typeof response.error === 'string' ){
          toast.error(response.error);
          return;
        }

        console.log(response.data)

        console.log(response)
        // console.log(setStep(3))
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
                  {
                    claimData ? claimData.name : <Skeleton className="w-[50px] h-2 bg-black"/>  
                  }
                  
                </CardTitle>
                <CardDescription>
                  {claimData ? claimData.description : <Skeleton className="w-[50px] h-2 bg-black mx-auto"/>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-1">
                    
                    {claimData ? (<>
                      {claimData.tokensPerClaim}
                      {claimData?.tokenSymbol}
                    </>) : (<div className="flex items-center justify-center gap-2">
                      <Skeleton className="w-[50px] h-2 bg-black"/>
                      <Skeleton className="w-[50px] h-2 bg-black"/>
                    </div>)}
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
                      className="w-full"
                      variant={'default'}
                      disabled={isLoading || !wallets || !walletAddress || !claimData}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Claiming Tokens...
                        </>
                      ) : (
                        <>
                          Claim {
                            claimData ? <>{claimData?.tokensPerClaim} {claimData?.tokenSymbol}</> : <Skeleton className="h-2 w-[50px] bg-black"/>
                          }
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