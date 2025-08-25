import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/config/supabase/supabase-server"
import { Coins, TrendingUp, Users } from "lucide-react"
import { getServerSession } from "next-auth"


const fetchTokenDistributedCardData = async (id: string) => {
  const session = await getServerSession();
  if(!session) return null
  try {
    const supabase = await createClient();

    const fetchInitialSupply = async () => {
      const { data, error } = await supabase
        .from("token_mints")
        .select("initial_supply")
        .eq("creator_email", session!.user!.email!)
        .eq('id', id)
        .single()
      if (error) throw error;
      return data;
    };

    const fetchNumberOfUsedQRCodes = async () => {

      const { data, error } = await supabase
      .from("qr_codes")
      .select("used")
      .eq('campaign_id', id)

      if (error) throw error;
      if(data){
        const filter = data.filter(item => item.used)
        const result = filter.length
        return result
      }
      return 0
    }

    const [initialSupplyData, usedQRCodesData] = await Promise.allSettled([
      fetchInitialSupply(),
      fetchNumberOfUsedQRCodes()
    ]);

    if (initialSupplyData.status === "fulfilled" && usedQRCodesData.status === "fulfilled") {
      return {
        initialSupply: initialSupplyData.value,
        usedQRCodes: usedQRCodesData.value
      };
    }
  } catch {
    return null;
  }
  
};

const TokenDistributedCard = async ({ id }: { id: string }) => {
    
    const data = await fetchTokenDistributedCardData(id);
    if(!data) return(
      <div>There was an error fetching the data</div>
    )

    return(
        <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tokens Distributed</CardTitle>
                <Coins className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.usedQRCodes.toLocaleString()}</div>
              <p className="text-xs text-gray-600">of {data?.initialSupply.initial_supply.toLocaleString()} total supply</p>
              <Progress value={(data?.usedQRCodes as number / data?.initialSupply.initial_supply) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
    )
}

export const UniqueusersCard = ({ id }: { id: string }) => {
    console.log(id)
    return (
        <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
              <Users className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{''}</div>
              <p className="text-xs text-black flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% this week
              </p>
            </CardContent>
          </Card>

    )
}

export const TokenDetailsCard = ({ id }: {
    id: string
}) => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <TokenDistributedCard id={id} />
        </div>
    )
}