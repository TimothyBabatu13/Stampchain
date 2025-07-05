"use client"

import { ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useWalletStore } from "@/stores/walletStore"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { WalletName } from "@solana/wallet-adapter-base"

interface WalletItem {
  name: string
  icon: string
  installed: boolean
  installUrl?: string
}

const WalletModal =() => {
 
  const connecting = null
  const connected = null

  const { wallets: providerWallets, connect, select, connected: providerConnected } = useWallet();
  const [stateWallet, setStateWallet] = useState<Array<WalletItem>>([]);
  useEffect(() =>{
    const wallets = providerWallets.map(wallet => (
      {
        name: wallet.adapter.name,
        icon: wallet.adapter.icon,
        installed: wallet.readyState.toString() === "Installed",
        installUrl: wallet.adapter.url 
      }
    )) as Array<WalletItem>
    setStateWallet(wallets);
  }, [providerWallets, providerConnected])
  
  const handleClickWallet = async (name: string) => {
    
    try {
      select(name as WalletName);
      
      await connect()  
    } catch (error) {
      console.log(error)
    }
    
  }


  return (
    <Dialog>
        <DialogTrigger asChild >    
            <Button>
                Connect Wallet
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogTitle>
              </DialogTitle>
              <DialogHeader>
              </DialogHeader>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Choose a wallet to connect to this application</p>
                <div className="space-y-2">
                  {stateWallet.map((wallet) => (
                    <Button
                      key={wallet.name}
                      variant="outline"
                      className="w-full justify-between h-auto p-4 hover:bg-muted/50 bg-transparent"
                      onClick={() => handleClickWallet(wallet.name)}
                      disabled={connecting === wallet.name || connected === wallet.name}
                    >
                      <div className="flex items-center gap-3">
                        <img className="size-[32px]" src={wallet.icon} alt={`${wallet.name} wallet`} />
                        <div className="text-left">
                          <div className="font-medium">{wallet.name}</div>
                          {!wallet.installed && wallet.installUrl && (
                            <div className="text-xs text-muted-foreground">Click to install</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {connected === wallet.name ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Connected</span>
                          </div>
                          ) : connecting === wallet.name ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <span className="text-sm">Connecting...</span>
                          </div>
                          ) : wallet.installed ? (
                          <Badge variant="secondary" className="text-xs">
                            Installed
                          </Badge>
                          ) : (
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </Button>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    By connecting a wallet, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )
}


const ConnectWallet = () => {
  const { wallet } = useWalletStore();
  
  if(wallet) return null
    return(
        <WalletModal/>
    )
}

export default ConnectWallet