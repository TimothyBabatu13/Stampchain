import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {  Eye, MoreHorizontal, Plus,  } from "lucide-react"
import Link from "next/link"
import EmptyCampaing from "./empty/empty-campaign"
import { ExportData, GenerateQrCodes } from "./view-campaign-right";
import { createClient } from "@/config/supabase/supabase-server"
import { getServerSession } from "next-auth"

export type TokenMint = {
  id: string;
  mint_address: string;
  creator_email: string;
  name: string;
  symbol: string;
  description: string;
  initial_supply: number | string;
  decimals: number | string;
  created_at: string;
  maxclaimsperwallet: string | number;
  tokensperclaim: string | number;
};

  const fetchData = async (email: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('token_mints')
    .select(`
    id,
    mint_address,
    name,
    symbol,
    description,
    initial_supply,
    decimals,
    created_at,
    maxclaimsperwallet,
    tokensperclaim`)
    .eq('creator_email',email)

    console.log(error)
    return data as Array<TokenMint>;

  }
  
const Campaign = async () => {
  const session = await getServerSession()
  const data = await fetchData(session?.user!.email!);
  
  const changeToNumber = (val: string | number) => {
    if(typeof val === 'number') return val;
    return Number(val);
  }
  const campaigns = data.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    status: "completed",
    totalSupply: changeToNumber(campaign.initial_supply),
    claimed: 500,
    qrCodes: 5,
    createdAt: campaign.created_at
  }))
  const isEmpty = campaigns.length < 1;

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