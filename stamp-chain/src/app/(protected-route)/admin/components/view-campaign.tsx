import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {  Eye, MoreHorizontal, Plus,  } from "lucide-react"
import Link from "next/link"
import EmptyCampaing from "./empty/empty-campaign"
import { ExportData, GenerateQrCodes } from "./view-campaign-right";

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
    {
      id: 4,
      name: "Conference Attendance Tokens",
      status: "completed",
      totalSupply: 500,
      claimed: 500,
      qrCodes: 0,
      createdAt: "2024-01-05",
    },
  ]

  
const Campaign = () => {

    const isEmpty = false

  return (
    <>
        {
            isEmpty ? <EmptyCampaing /> : (
                <div className="space-y-6">

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
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/campaign/${campaign.id}`} className="">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <GenerateQrCodes 
                            claimed={campaign.claimed}
                            createdAt={campaign.createdAt}
                            id={campaign.id.toString()}
                            name={campaign.name}
                            qrCodes={campaign.qrCodes}
                            status={campaign.status as 'active' | 'completed'}
                            totalSupply={campaign.totalSupply}  
                          />
                          <ExportData />
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
                        <div className="text-sm text-gray-600">{campaign.qrCodes ? "QR Codes": "QR Code"}</div>
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
          </div>
        )
      }
    </>
  )
}

export default Campaign