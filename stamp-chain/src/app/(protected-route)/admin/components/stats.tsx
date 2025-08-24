import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/config/supabase/supabase-server"
import { Coins, LucideIcon, Target, TrendingDown, TrendingUp, } from "lucide-react"
import { getServerSession } from "next-auth";

interface campaignObject {
  title: string, 
  value: string | number, 
  change: string, 
  icon: LucideIcon, 
  trend: 'up' | 'down'
}

const calculatePercentageChange = (oldVlaue: number, newValue: number) => {
  if(oldVlaue === 0 && newValue > 0){
    return{
      increase: true,
      value: 100,
      totalCampaign: newValue
    }
  }
  if(oldVlaue === 0 && newValue === 0) {
    return {
      increase: false,
      value: 0,
      totalCampaign: newValue
    }
  }

  const percentage = ((newValue - oldVlaue) / oldVlaue) * 100;
  return {
    increase: percentage > 0 ? true : false,
    value: Math.abs(percentage),
    totalCampaign: newValue
  }

}

const fetchCampaignData = async () => {
  const session = await getServerSession();
  const supabase = createClient();
  try {
    const { data, error } = await supabase
    .rpc('get_token_mints_monthly_counts', {
      creator_email: session?.user?.email
    })
    .select('this_month_count, last_month_count')
    .maybeSingle()
    
    if(error) return []
    const arr = [] as ReturnType<typeof calculatePercentageChange>[];
    const campaignChange = calculatePercentageChange(data?.last_month_count, data?.this_month_count);
    arr.push(campaignChange);
    return arr;
  } catch {
    return []
  }
}

const fetchTokensDistributedForEachMonth = async () => {
  const session = await getServerSession();
  const supabase = createClient();
  try {
    const { data, error } = await supabase
    .rpc('get_qr_codes_monthly_counts', {
      creator_email: session?.user?.email
    })
    .select('this_month_count, last_month_count')
    .maybeSingle()

    if(error) return []

    const arr = [] as ReturnType<typeof calculatePercentageChange>[];
    const campaignChange = calculatePercentageChange(data?.last_month_count, data?.this_month_count);
    arr.push(campaignChange);
    return arr;
  } catch {
    return []
  }
  
}
  const fetchAllData = async () => {
    const result = await Promise.all([fetchCampaignData(), fetchTokensDistributedForEachMonth()]);
    const [ totalCampaigns, tokensDistributed ] = result;
    let totalCampaignObject: campaignObject
    let tokensDistributedObject: campaignObject

    if(!totalCampaigns.length){
      totalCampaignObject = {
        title: 'Total Campaigns',
        value: '0',
        change: '0',
        icon: Target,
        trend: 'down'
      }  
    }
    else{
      const totalCampaign = totalCampaigns[0]

      totalCampaignObject = {
        title: "Total Campaigns",
        value: totalCampaign.totalCampaign,
        change: `${totalCampaign.value}% from this month`,
        icon: Target,
        trend: totalCampaign.increase ? "up" : "down",
      }
    }
    
    if(!tokensDistributed.length){
      tokensDistributedObject ={
        title: "Tokens Distributed",
        value: `0`,
        change: `0`,
        icon: Coins,
        trend: 'down',
      }    
    }
    else {
      const tokenDistributed = tokensDistributed[0];
      
      tokensDistributedObject = {
        title: "Tokens Distributed",
        value: `${tokenDistributed.value}`,
        change: `${tokenDistributed.value}% from last month"`,
        icon: Coins,
        trend: tokenDistributed.increase ? "up" : "down",
      }    
    }

    const stats = [totalCampaignObject, tokensDistributedObject]
    
    return stats
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


// drop function if exists public.get_qr_codes_monthly_counts(creator_email text);

// create or replace function public.get_qr_codes_monthly_counts(creator_email text)
// returns table (
//   this_month_count bigint,
//   last_month_count bigint
// )
// language plpgsql
// stable
// as $$
// begin
//   return query
//     select
//       count(*) filter (
//         where qr.used = true
//         and date_trunc('month', qr.claimed_at) = date_trunc('month', now())
//       ) as this_month_count,
//       count(*) filter (
//         where qr.used = true
//         and date_trunc('month', qr.claimed_at) = date_trunc('month', now() - interval '1 month')
//       ) as last_month_count
//     from qr_codes qr
//     join token_mints tm on qr.campaign_id = tm.id
//     where tm.creator_email = get_qr_codes_monthly_counts.creator_email;
// end;
// $$;
