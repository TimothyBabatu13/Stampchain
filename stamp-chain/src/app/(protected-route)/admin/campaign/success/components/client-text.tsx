import { createClient } from "@/config/supabase/supabase-server";
import { formatNumber } from "@/lib/format-number";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


type TokenMint = {
  id: string;
  initial_supply: number | string;
  maxclaimsperwallet: string | number;
  mint_address: string;
  symbol: string;
  tokensperclaim: string | number;
};

const fetchData = async (mintPublicKey:string, creator_email: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
      .from('token_mints')
      .select('id, mint_address, symbol, initial_supply, maxclaimsperwallet, tokensperclaim')
      .eq('mint_address', mintPublicKey)
      .eq('creator_email', creator_email)
      .single()

    if(error){
      return {
        success: false
      } 
    }
    return data
}

export const TotalSupply = async ({ id } : {
  id: string
}) => {

  
  const session = await getServerSession();
  
  if(!session){
    return redirect('/login');
  }
  
  const data = await fetchData(id, session.user!.email!) as TokenMint

  const tokenSupply = () => {
    const { initial_supply } = data;
    if(typeof initial_supply === 'string'){
      return formatNumber(Number(initial_supply));
    }
    return formatNumber(initial_supply)
  }
    const symbol = data.symbol
  return (
    <div className="text-2xl font-bold text-blue-600 mb-1">{tokenSupply()} {symbol}</div>
  )
}

export const TokenClaim = async ({ id } : {
  id: string
}) => {
  
  const session = await getServerSession();
  
  if(!session){
    return redirect('/login');
  }
  
  const data = await fetchData(id, session.user!.email!) as TokenMint
  const tokenClaim = () => {
    const { tokensperclaim } = data;
    if(typeof tokensperclaim === 'string') {
      return formatNumber(Number(tokensperclaim));
    }
    return formatNumber(tokensperclaim)
  }

    return(
        <div className="text-2xl font-bold text-purple-600 mb-1">{tokenClaim()} per claim</div>
    )
}