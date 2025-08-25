'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TabsContent } from "@/components/ui/tabs";
import { Activity, Clock, Coins, Eye } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

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

const campaign = getCampaignData(id)
     const dailyClaimsData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    date: new Date(2024, 0, i + 1).toLocaleDateString(),
    claims: Math.floor(Math.random() * 20) + 5,
    users: Math.floor(Math.random() * 15) + 3,
  }))

  const hourlyActivityData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    activity: Math.floor(Math.random() * 30) + 5,
  }))



  const recentActivity = [
    { id: 1, type: "claim", user: "0x1234...5678", tokens: 10, timestamp: "2 minutes ago" },
    { id: 2, type: "claim", user: "0xabcd...efgh", tokens: 10, timestamp: "5 minutes ago" },
    { id: 3, type: "qr_scan", user: "0x9876...5432", tokens: 0, timestamp: "8 minutes ago" },
    { id: 4, type: "claim", user: "0xfedc...ba98", tokens: 10, timestamp: "12 minutes ago" },
    { id: 5, type: "claim", user: "0x1111...2222", tokens: 10, timestamp: "15 minutes ago" },
  ]

  const chartConfig = {
    claims: { label: "Claims", color: "hsl(var(--chart-1))" },
    users: { label: "Users", color: "hsl(var(--chart-2))" },
    activity: { label: "Activity", color: "hsl(var(--chart-3))" },
  }

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  return (
    <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Campaign Progress */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Daily Claims Activity
                    </CardTitle>
                    <CardDescription>Token claims over the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] !w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart width={undefined} height={undefined} data={dailyClaimsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                                type="monotone"
                                dataKey="claims"
                                stroke="var(--color-claims)"
                                fill="var(--color-claims)"
                                fillOpacity={0.6}
                            />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Hourly Activity Pattern
                    </CardTitle>
                    <CardDescription>User activity throughout the day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourlyActivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="activity" fill="var(--color-activity)" radius={4} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Campaign Details */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Created</span>
                        <span className="text-sm font-medium">{formatDate(campaign.createdAt).split(",")[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Updated</span>
                        <span className="text-sm font-medium">{formatDate(campaign.updatedAt).split(",")[0]}</span>
                      </div>
                      {campaign.enableExpiration && campaign.expirationDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Expires</span>
                          <span className="text-sm font-medium">
                            {formatDate(campaign.expirationDate).split(",")[0]}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tokens per Claim</span>
                        <span className="text-sm font-medium">{campaign.tokensPerClaim}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Max Claims/Wallet</span>
                        <span className="text-sm font-medium">{campaign.maxClaimsPerWallet}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
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
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{campaign.avgTokensPerUser}</div>
                        <div className="text-xs text-gray-600">Avg/User</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-lg font-bold text-orange-600">{campaign.retentionRate}%</div>
                        <div className="text-xs text-gray-600">Retention</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            {activity.type === "claim" ? (
                              <Coins className="w-4 h-4 text-green-600" />
                            ) : (
                              <Eye className="w-4 h-4 text-blue-600" />
                            )}
                            <div>
                              <div className="text-sm font-medium">
                                {activity.type === "claim" ? "Token Claim" : "QR Scan"}
                              </div>
                              <div className="text-xs text-gray-600">{activity.user}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            {activity.tokens > 0 && (
                              <div className="text-sm font-medium text-green-600">+{activity.tokens}</div>
                            )}
                            <div className="text-xs text-gray-500">{activity.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
  )
}

export default Overview