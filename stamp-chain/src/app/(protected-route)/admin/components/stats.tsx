'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, QrCode, Target, TrendingDown, TrendingUp, Users } from "lucide-react"
// import { Wallet } from '@coinbase/onchainkit/wallet';
const stats = [
    {
      title: "Total Campaigns",
      value: "12",
      change: "-2 this month",
      icon: Target,
      trend: "down",
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


const Stats = () => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {
                  stat.trend === 'up' ? (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </p>
                  ) : (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {stat.change}
                    </p>
                  )
                }
              </CardContent>
            </Card>
          ))}
          {/* <Wallet /> */}
        </div>
  )
}

export default Stats