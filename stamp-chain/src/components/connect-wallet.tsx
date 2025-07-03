"use client"

import { ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface WalletItem {
  name: string
  icon: string
  installed: boolean
  installUrl?: string
}

const walletList: WalletItem[] = [
    {
      name: "Phantom",
      icon: "👻",
      installed: true,
      installUrl: "https://phantom.app/",
    //   connectFunction: connectPhantom,
    },
    {
      name: "MetaMask",
      icon: "🦊",
      installed: true,
      installUrl: "https://metamask.io/",
    //   connectFunction: connectMetaMask,
    },
    {
      name: "Coinbase Wallet",
      icon: "🔵",
      installed: true,
      installUrl: "https://www.coinbase.com/wallet",
    //   connectFunction: connectCoinbase,
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      installed: true, // WalletConnect is always available
    //   connectFunction: connectWalletConnect,
    },
    {
      name: "Trust Wallet",
      icon: "🛡️",
      installed: true,
      installUrl: "https://trustwallet.com/",
    },
  ]

const WalletModal =() => {
  const wallets = walletList
  const connecting = null
  const connected = null

  

  
  const handleClickWallet = () => {

  }
  

  return (
    <Dialog>
        <DialogTrigger asChild >    
            <Button>
                Connect Wallet
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>

        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Choose a wallet to connect to this application</p>

          <div className="space-y-2">
            {wallets.map((wallet) => (
              <Button
                key={wallet.name}
                variant="outline"
                className="w-full justify-between h-auto p-4 hover:bg-muted/50 bg-transparent"
                onClick={() => handleClickWallet()}
                disabled={connecting === wallet.name || connected === wallet.name}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{wallet.icon}</span>
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
    return(
        <WalletModal/>
    )
}

export default ConnectWallet