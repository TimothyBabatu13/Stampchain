'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Activity } from "lucide-react";
import AreaGraph from "./area-graph";
import { CreatedAt } from "./client-components";
import { useTokenUtility } from "@/stores/token-utility";

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

const Overview = ({id} : {
    id: string
}) => {

  const { maxClaim, tokenperclaim } = useTokenUtility()
  
  const campaign = getCampaignData(id)

  return (
    <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Daily Claims Activity
                    </CardTitle>
                    <CardDescription>Token claims over the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <AreaGraph id={id}/>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
              
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Created</span>
                        <CreatedAt id={id} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tokens per Claim</span>
                        <span className="text-sm font-medium">{tokenperclaim}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Max Claims/Wallet</span>
                        <span className="text-sm font-medium">{maxClaim}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

            
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{campaign.qrCodesGenerated}</div>
                        <div className="text-xs text-gray-600">QR Codes</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{campaign.totalClaims}</div>
                        <div className="text-xs text-gray-600">Total Claims</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
  )
}

export default Overview