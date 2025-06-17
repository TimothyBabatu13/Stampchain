"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, Users, QrCode, Coins, Activity, Eye, Download, MoreHorizontal, Target } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminDashboard() {
  const campaigns = [
    {
      id: 1,
      name: "Coffee Shop Loyalty",
      status: "active",
      totalSupply: 10000,
      claimed: 2340,
      qrCodes: 50,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "YouTube Subscriber Rewards",
      status: "active",
      totalSupply: 5000,
      claimed: 1200,
      qrCodes: 10,
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Conference Attendance Tokens",
      status: "completed",
      totalSupply: 500,
      claimed: 500,
      qrCodes: 5,
      createdAt: "2024-01-05",
    },
  ]

  const stats = [
    {
      title: "Total Campaigns",
      value: "12",
      change: "+2 this month",
      icon: Target,
      trend: "up",
    },
    {
      title: "Tokens Distributed",
      value: "45.2K",
      change: "+12% from last month",
      icon: Coins,
      trend: "up",
    },
    {
      title: "Active Users",
      value: "3,240",
      change: "+8% from last month",
      icon: Users,
      trend: "up",
    },
    {
      title: "QR Scans",
      value: "8,921",
      change: "+23% from last month",
      icon: QrCode,
      trend: "up",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your Campaigns</h2>
                <p className="text-gray-600">Manage your loyalty campaigns and track performance</p>
              </div>
              <Link href="/admin/campaign/new">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          {campaign.name}
                          <Badge
                            variant="secondary"
                            className={
                              campaign.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Created on {new Date(campaign.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="w-4 h-4 mr-2" />
                            Generate QR Codes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{campaign.claimed.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Tokens Claimed</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {campaign.totalSupply.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Supply</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{campaign.qrCodes}</div>
                        <div className="text-sm text-gray-600">QR Codes</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Campaign Progress</span>
                        <span>{Math.round((campaign.claimed / campaign.totalSupply) * 100)}%</span>
                      </div>
                      <Progress value={(campaign.claimed / campaign.totalSupply) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Analytics Overview</h2>
              <p className="text-gray-600">Track your campaign performance and user engagement</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Token Distribution Trends</CardTitle>
                  <CardDescription>Daily token claims over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>Analytics chart would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Campaign performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2" />
                      <p>Engagement metrics would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
              <p className="text-gray-600">Manage your account preferences and security settings</p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>Account settings panel will be available in the next update</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <Activity className="w-8 h-8 mx-auto mb-2" />
                    <p>Settings panel coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
