import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/config/supabase/supabase-server"
import { calculateActiveUsersMonthlyChange, calculateMonthlyChange, calculateTokensDistributedChange } from "@/util/stats.utility";
import { Coins, QrCode, Target, TrendingDown, TrendingUp, Users } from "lucide-react"
import { getServerSession } from "next-auth";

const fetchCampaignData = async () => {
  const session = await getServerSession();
  const supabase = createClient();
  const { data, error } = await supabase
  .rpc('get_campaigns_per_month', {
    user_email: session?.user?.email
  })
  console.log(error)
  const campaignTotalChange = calculateActiveUsersMonthlyChange(data!);
  //total campaign
  return campaignTotalChange;
}

const fetchTokensDistributed = async () => {
  const session = await getServerSession()
  const supabase = createClient();
  const { error, data } = await supabase
  .rpc('get_monthly_claim_stats', {
    user_email: session?.user?.email,
  });
  console.log(error)
  const tokensTotalChange = calculateTokensDistributedChange(data);
  //active users
  return tokensTotalChange
}

const fetchActiveUsers = async () => {
  const session = await getServerSession();
  const supabase = createClient();
  const { error, data } = await supabase
  .rpc('get_monthly_claim_stats', {
    user_email: session?.user?.email
  })
  console.log(error)
  const tokensTotalChange = calculateMonthlyChange(data);
  //total tokens distributed
  return tokensTotalChange
}

// const fetchQrScans = async () => {
//   const session = await getServerSession();
//   const supabase = createClient();
//   const { error, data } = await supabase.rpc('get_monthly_qr_scans_for_users', {
//     user_emai: session?.user?.email
//   })
//   console.log(data)
//   const qrCount = calculateQrScanChange(data);
//   return qrCount
// }

  const fetchAllData = async () => {
    const result = await Promise.all([fetchCampaignData(), fetchActiveUsers(), fetchTokensDistributed()]);
    // const [ totalCampaigns, tokensDistributed, activeUsers ] = result;
    console.log(result)
    // const totalCampaign = totalCampaigns[totalCampaigns.length - 1] as never as {month: string, total_campaigns:number, token_direction: 'increase' | 'decrease', change?: number};
    // const tokenDistributed = tokensDistributed[tokensDistributed.length -1];
    // const activeUser = activeUsers[activeUsers.length -1];

    // console.log(totalCampaigns, tokensDistributed, activeUsers)

    // const getSign = (value: 'increase' | 'decrease') => {
    //   if(value === 'increase') return '+'
    //   return '-'
    // }
    // const stats = [
    //   {
    //     title: "Total Campaigns",
    //     value: totalCampaign.total_campaigns,
    //     change: `${getSign(totalCampaign.token_direction)}${totalCampaign.change ? `${totalCampaign.change}%` : `${totalCampaign.total_campaigns}%`} from this month`,
    //     icon: Target,
    //     trend: getSign(totalCampaign.token_direction) === '+' ? "up" : "down",
    //   },
    //   {
    //     title: "Tokens Distributed",
    //     value: `${tokenDistributed.total_tokens_distributed} "45.2K"`,
    //     change: `${getSign(tokenDistributed.direction as 'increase' | 'decrease')}${tokenDistributed.change}% from last month"`,
    //     icon: Coins,
    //     trend: getSign(totalCampaign.token_direction) === '+' ? "up" : "down",
    //   },
    //   {
    //     title: "Active Users",
    //     value: `${activeUser.active_users}`,
    //     change: `${getSign(activeUser.direction as 'increase' | 'decrease')}${activeUser.change}% from last month`,
    //     icon: Users,
    //     trend: getSign(totalCampaign.token_direction) === '+' ? "up" : "down",
    //   },
    //   {
    //     title: "QR Scans",
    //     value: "8,921",
    //     change: "+23% from last month",
    //     icon: QrCode,
    //     trend: "up",
    //   },
    // ]
    
    const emptyStats = [
      {
        title: "Total Campaigns",
        value: '',
        change: ``,
        icon: Target,
        trend:  "up",
      },
      {
        title: "Tokens Distributed",
        value: ``,
        change: ``,
        icon: Coins,
        trend: "down",
      },
      {
        title: "Active Users",
        value: ``,
        change: ``,
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
    return emptyStats
  }

const Stats = async () => {
  
  const stats = await fetchAllData();

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