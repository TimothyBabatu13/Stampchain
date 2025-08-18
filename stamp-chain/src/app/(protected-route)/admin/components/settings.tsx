"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wallet,
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Sparkles,
  Coins,
  TrendingUp,
  Activity,
  RefreshCw,
  ExternalLink,
  Shield,
} from "lucide-react"


const SettingsPage = () => {
  const [showPrivateKeys, setShowPrivateKeys] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const userWallets = [
    {
      id: 1,
      name: "Primary Wallet",
      address: "0x1234567890abcdef1234567890abcdef12345678",
      privateKey: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      network: "Ethereum",
      isConnected: true,
      balance: "2.45 ETH",
      lastUsed: "2 hours ago",
    },
    {
      id: 2,
      name: "Secondary Wallet",
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      privateKey: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      network: "Polygon",
      isConnected: false,
      balance: "156.78 MATIC",
      lastUsed: "1 day ago",
    },
  ]

  // Mock token holdings
  const tokenHoldings = [
    {
      id: 1,
      symbol: "COFFEE",
      name: "Coffee Shop Loyalty Token",
      balance: 150,
      value: "$45.00",
      change: "+12.5%",
      trend: "up",
      campaign: "Coffee Shop Loyalty",
      contractAddress: "0x1111222233334444555566667777888899990000",
      network: "Ethereum",
    },
    {
      id: 2,
      symbol: "YT",
      name: "YouTube Subscriber Rewards",
      balance: 75,
      value: "$22.50",
      change: "+8.3%",
      trend: "up",
      campaign: "YouTube Subscriber Rewards",
      contractAddress: "0xaaabbbbccccddddeeeeffffgggghhhhiiiijjjj",
      network: "Polygon",
    },
    {
      id: 3,
      symbol: "CONF",
      name: "Conference Attendance Token",
      balance: 25,
      value: "$12.50",
      change: "0%",
      trend: "neutral",
      campaign: "Conference Attendance Tokens",
      contractAddress: "0x9999888877776666555544443333222211110000",
      network: "Ethereum",
    },
    {
      id: 4,
      symbol: "SOCIAL",
      name: "Social Media Engagement Token",
      balance: 200,
      value: "$60.00",
      change: "+15.2%",
      trend: "up",
      campaign: "Social Campaign",
      contractAddress: "0xddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmm",
      network: "Base",
    },
  ]

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(type)
    setTimeout(() => setCopiedAddress(""), 2000)
  }

  const refreshBalances = async () => {
    setIsRefreshing(true)
    // Simulate API call to refresh balances
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-600" />
    if (trend === "down") return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />
    return <Activity className="w-3 h-3 text-gray-600" />
  }

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-green-600"
    if (trend === "down") return "text-red-600"
    return "text-gray-600"
  }

  const totalPortfolioValue = tokenHoldings.reduce((sum, token) => {
    return sum + Number.parseFloat(token.value.replace("$", ""))
  }, 0)

  return (
    <div className="">

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wallet & Token Management</h1>
          <p className="text-gray-600">Manage your connected wallets and view your token holdings</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <Coins className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPortfolioValue.toFixed(2)}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.3% this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Wallets</CardTitle>
              <Wallet className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userWallets.length}</div>
              <p className="text-xs text-gray-600">{userWallets.filter((w) => w.isConnected).length} active</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Token Types</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokenHoldings.length}</div>
              <p className="text-xs text-gray-600">Loyalty tokens</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
              <Sparkles className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokenHoldings.reduce((sum, token) => sum + token.balance, 0)}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +25 this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connected Wallets */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5" />
                      Connected Wallets
                    </CardTitle>
                    <CardDescription>Manage your cryptocurrency wallets</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {userWallets.map((wallet) => (
                  <div key={wallet.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {wallet.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{wallet.name}</div>
                          <div className="text-sm text-gray-600">{wallet.network}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={wallet.isConnected ? "secondary" : "outline"}>
                          {wallet.isConnected ? "Connected" : "Disconnected"}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Address:</span>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(wallet.address, `address-${wallet.id}`)}
                          >
                            {copiedAddress === `address-${wallet.id}` ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Balance:</span>
                        <span className="text-sm font-medium">{wallet.balance}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Used:</span>
                        <span className="text-sm text-gray-600">{wallet.lastUsed}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Private Key:</span>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                            {showPrivateKeys ? wallet.privateKey.slice(0, 10) + "..." : "••••••••••"}
                          </code>
                          <Button size="sm" variant="outline" onClick={() => setShowPrivateKeys(!showPrivateKeys)}>
                            {showPrivateKeys ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                          {showPrivateKeys && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(wallet.privateKey, `key-${wallet.id}`)}
                            >
                              {copiedAddress === `key-${wallet.id}` ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View on Explorer
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Security Notice:</strong> Never share your private keys with anyone. LaaS will never ask for
                your private keys. Keep them secure and backed up safely.
              </AlertDescription>
            </Alert>
          </div>

          {/* Token Holdings */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="w-5 h-5" />
                      Token Holdings
                    </CardTitle>
                    <CardDescription>Your loyalty token portfolio</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" onClick={refreshBalances} disabled={isRefreshing}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {tokenHoldings.map((token) => (
                  <div key={token.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {token.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-sm text-gray-600">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{token.balance.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{token.value}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Campaign:</span>
                        <div className="font-medium">{token.campaign}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Network:</span>
                        <div className="font-medium">{token.network}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">24h Change:</span>
                        <div className={`flex items-center gap-1 text-sm ${getTrendColor(token.trend)}`}>
                          {getTrendIcon(token.trend)}
                          {token.change}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(token.contractAddress, `contract-${token.id}`)}
                        >
                          {copiedAddress === `contract-${token.id}` ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>Contract:</span>
                        <code className="bg-gray-100 px-1 rounded">
                          {token.contractAddress.slice(0, 6)}...{token.contractAddress.slice(-4)}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Token to Wallet
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync All Balances
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Transaction History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage