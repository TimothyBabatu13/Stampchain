import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
} from "lucide-react"
import { CopyToClipboardButton, SolanaIcon, ViewOnExplorer, WalletAddressCard, WalletBalanceCard } from "./settings-client-component"

const userWallets = [
    {
      id: 1,
      name: "Solana Wallet",
      network: "solana",
      isConnected: true,
    },
    // {
    //   id: 2,
    //   name: "Base Wallet",
    //   network: "base",
    //   isConnected: false,
    // },
  ]

interface walletType {
  id: number;
    name: string;
    network: 'base' | 'solana';
    isConnected: boolean;
}

const WalletCard = (wallet: walletType) => {
  
  return(
    <div key={wallet.id} className="p-4 border rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SolanaIcon />
          <div>
            <div className="text-sm md:text-base font-medium">{wallet.name}</div>
            <div className="text-sm text-gray-600">{wallet.network}</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Badge variant={wallet.isConnected ? "secondary" : "outline"}>
            {wallet.isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Address:</span>
          <div className="flex items-center gap-2">
            <WalletAddressCard />
            <CopyToClipboardButton />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Balance:</span>
          <WalletBalanceCard wallet={wallet.network} />
        </div>
      </div>
      <div className=" pt-2 border-t">
        <ViewOnExplorer />
      </div>
    </div>
  )
}

const SettingsPage = () => {

  return (
    <div className="">
      <div className="container mx-auto px-2 py-8 pt-0 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wallet & Token Management</h1>
          <p className="text-gray-600">Manage your connected wallets and view your token holdings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connected Wallets */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg w-full">
              <CardHeader>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5" />
                      Connected Wallets
                    </CardTitle>
                    <CardDescription>Manage your cryptocurrency wallets</CardDescription>
                  </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {userWallets.map((wallet) => (
                  <WalletCard  
                    id={wallet.id} 
                    isConnected 
                    name={wallet.name}
                    network={wallet.network as 'solana' | 'base'}
                    key={crypto.randomUUID()}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage