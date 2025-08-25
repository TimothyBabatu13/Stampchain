'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Copy, Edit, Globe, Settings as LucideSettings, Shield } from "lucide-react";
import { useState } from "react";

const getCampaignData = (id: string) => {
  const campaigns = {
    "1": {
      id: "1",
      name: "Coffee Shop Loyalty Program",
      description:
        "Reward loyal customers with tokens for every purchase. Tokens can be redeemed for free drinks, discounts, and exclusive merchandise.",
      status: "active",
      tokenSymbol: "COFFEE",
      totalSupply: 10000,
      tokensDistributed: 2340,
      tokensRemaining: 7660,
      tokensPerClaim: 10,
      maxClaimsPerWallet: 5,
      uniqueUsers: 156,
      totalClaims: 234,
      qrCodesGenerated: 50,
      qrCodesUsed: 34,
      conversionRate: 68,
      retentionRate: 72,
      blockchain: "solana",
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:45:00Z",
      expirationDate: "2024-12-31T23:59:59Z",
      enableExpiration: true,
      revenue: 4200,
      avgTokensPerUser: 15,
      peakClaimDay: "2024-01-18",
      topLocation: "San Francisco, CA",
      primaryDevice: "Mobile (78%)",
    },
    "2": {
      id: "2",
      name: "YouTube Subscriber Rewards",
      description:
        "Exclusive tokens for YouTube subscribers and community members. Claim tokens by scanning QR codes in video descriptions.",
      status: "active",
      tokenSymbol: "YT",
      totalSupply: 5000,
      tokensDistributed: 1200,
      tokensRemaining: 3800,
      tokensPerClaim: 5,
      maxClaimsPerWallet: 3,
      uniqueUsers: 89,
      totalClaims: 240,
      qrCodesGenerated: 10,
      qrCodesUsed: 8,
      conversionRate: 82,
      retentionRate: 65,
      blockchain: "polygon",
      contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-01-19T16:20:00Z",
      expirationDate: null,
      enableExpiration: false,
      revenue: 2800,
      avgTokensPerUser: 13.5,
      peakClaimDay: "2024-01-16",
      topLocation: "Los Angeles, CA",
      primaryDevice: "Desktop (65%)",
    },
  }

  return campaigns[id as keyof typeof campaigns] || campaigns["1"]
}

const Settings = ({ id } : {
    id: string
}) => {

    const [copiedAddress, setCopiedAddress] = useState(false)
    
      const campaign = getCampaignData(id)
    
    
      const copyContractAddress = () => {
        navigator.clipboard.writeText(campaign.contractAddress)
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 2000)
      }
    
      const getStatusColor = (status: string) => {
        switch (status) {
          case "active":
            return "bg-green-100 text-green-800"
          case "paused":
            return "bg-yellow-100 text-yellow-800"
          case "completed":
            return "bg-blue-100 text-blue-800"
          case "expired":
            return "bg-red-100 text-red-800"
          default:
            return "bg-gray-100 text-gray-800"
        }
      }

  return (
    <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Campaign Configuration */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LucideSettings className="w-5 h-5" />
                    Campaign Configuration
                  </CardTitle>
                  <CardDescription>Basic campaign settings and parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Campaign Status</span>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Token Symbol</span>
                      <span className="text-sm text-gray-600">{campaign.tokenSymbol}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Supply</span>
                      <span className="text-sm text-gray-600">{campaign.totalSupply.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tokens per Claim</span>
                      <span className="text-sm text-gray-600">{campaign.tokensPerClaim}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Max Claims per Wallet</span>
                      <span className="text-sm text-gray-600">{campaign.maxClaimsPerWallet}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Blockchain</span>
                      <Badge variant="outline" className="capitalize">
                        {campaign.blockchain}
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Configuration
                  </Button>
                </CardContent>
              </Card>

              {/* Security & Blockchain */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security & Blockchain
                  </CardTitle>
                  <CardDescription>Smart contract and security information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium block mb-1">Contract Address</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono flex-1 truncate">
                          {campaign.contractAddress}
                        </code>
                        <Button size="sm" variant="outline" onClick={copyContractAddress}>
                          {copiedAddress ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Network</span>
                      <Badge variant="outline" className="capitalize">
                        {campaign.blockchain}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Token Standard</span>
                      <span className="text-sm text-gray-600">ERC-20</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      View on Block Explorer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Danger Zone */}
            <Card className="border-0 shadow-lg border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>These actions cannot be undone. Please proceed with caution.</AlertDescription>
                </Alert>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    Pause Campaign
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                    End Campaign
                  </Button>
                  <Button variant="destructive">Delete Campaign</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  )
}

export default Settings