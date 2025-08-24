'use client';

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertCircle, CheckCircle, Clock, Coins, Copy, Edit, Eye, Globe, MapPin, Pause, Play, QrCode, Settings, Shield, Smartphone, Target, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

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

export function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [copiedAddress, setCopiedAddress] = useState(false)

  const campaign = getCampaignData(params.id)

  // Sample chart data
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

  const deviceData = [
    { device: "Mobile", percentage: 78, users: 122, fill: "#3B82F6" },
    { device: "Desktop", percentage: 18, users: 28, fill: "#8B5CF6" },
    { device: "Tablet", percentage: 4, users: 6, fill: "#10B981" },
  ]

  const locationData = [
    { location: "San Francisco", users: 45, percentage: 29 },
    { location: "Los Angeles", users: 32, percentage: 21 },
    { location: "New York", users: 28, percentage: 18 },
    { location: "Chicago", users: 22, percentage: 14 },
    { location: "Seattle", users: 18, percentage: 12 },
    { location: "Others", users: 11, percentage: 7 },
  ]

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
    <div className="min-h-screen">

      <div className="">
        {/* Campaign Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                {campaign.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {campaign.status === "active" ? "Pause Campaign" : "Resume Campaign"}
              </Button>
              <Link href={`/qr-generator?campaign=${campaign.id}`}>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Codes
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tokens Distributed</CardTitle>
              <Coins className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaign.tokensDistributed.toLocaleString()}</div>
              <p className="text-xs text-gray-600">of {campaign.totalSupply.toLocaleString()} total supply</p>
              <Progress value={(campaign.tokensDistributed / campaign.totalSupply) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaign.uniqueUsers}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% this week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Zap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaign.conversionRate}%</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Above average
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
              <Target className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${campaign.revenue.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +18% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
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
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyClaimsData}>
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device Usage */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Device Usage
                  </CardTitle>
                  <CardDescription>User engagement by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ device, percentage }) => `${device} ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="users"
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Top Locations
                  </CardTitle>
                  <CardDescription>User distribution by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locationData.map((location, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{location.location}</span>
                          <span className="text-gray-600">
                            {location.users} users ({location.percentage}%)
                          </span>
                        </div>
                        <Progress value={location.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Insights */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key metrics and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">High Conversion</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Your {campaign.conversionRate}% conversion rate is above average
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Growing Audience</span>
                    </div>
                    <p className="text-sm text-blue-700">User base growing by 12% weekly</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-900">Mobile First</span>
                    </div>
                    <p className="text-sm text-purple-700">78% of users access via mobile</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-orange-900">Peak Hours</span>
                    </div>
                    <p className="text-sm text-orange-700">Most active 2-4 PM and 7-9 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage campaign participants and their activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* User Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{campaign.uniqueUsers}</div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{Math.round(campaign.uniqueUsers * 0.72)}</div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{campaign.avgTokensPerUser}</div>
                      <div className="text-sm text-gray-600">Avg Tokens/User</div>
                    </div>
                  </div>

                  {/* User Activity Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h4 className="font-medium">Recent User Activity</h4>
                    </div>
                    <div className="divide-y">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {String.fromCharCode(65 + i)}
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                0x{Math.random().toString(16).substr(2, 8)}...{Math.random().toString(16).substr(2, 4)}
                              </div>
                              <div className="text-xs text-gray-600">
                                {Math.floor(Math.random() * 50) + 10} tokens claimed
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{Math.floor(Math.random() * 5) + 1} claims</div>
                            <div className="text-xs text-gray-600">{Math.floor(Math.random() * 30) + 1} days ago</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Campaign Configuration */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
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
        </Tabs>
      </div>
    </div>
  )
}
