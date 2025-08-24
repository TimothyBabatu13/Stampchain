import { Badge } from "@/components/ui/badge";
import { createClient } from "@/config/supabase/supabase-server"
import { getServerSession } from "next-auth";

const fetchCampaignData = async (id: string) => {
    const session = await getServerSession();
    if(!session){
        return null;
    }
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("token_mints")
            .select("id, name, description, symbol")
            .eq("creator_email", session!.user!.email!)
            .eq('id', id)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error fetching campaign data:", error);
        return null;
    }
}

const CampaignDataText = async ({ id }: { id: string }) => {
    const campaignData = await fetchCampaignData(id);

    if (!campaignData) {
        return <div>Error fetching campaign data</div>;
    }

    return (
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {campaignData.symbol.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{campaignData.name}</h1>
                  <div className="flex items-center gap-3">
                    <Badge className='bg-green-100 text-green-800'>
                      Active
                    </Badge>
                    <Badge variant="outline">{campaignData.symbol}</Badge>
                    <Badge variant="outline" className="capitalize">
                      solana
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">{campaignData.description ? campaignData.description : "No description available"}</p>
            </div>

    )
}

const CampaignDetails = ({ id }: { id: string }) => {
  return (
    <CampaignDataText id={id} />
  )
}

export default CampaignDetails