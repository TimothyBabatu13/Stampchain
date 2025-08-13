import { createClient } from "@/config/supabase/supabase-server";
import { formatNumber } from "@/lib/format-number";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientRenderedSonner from "../../../components/client-rendered-sonner";

type TokenMint = {
  id: string;
  initial_supply: number | string;
  maxclaimsperwallet: string | number;
  mint_address: string;
  symbol: string;
  tokensperclaim: string | number;
}; 

interface fetchDataType {
  data: null | TokenMint,
  success: boolean,
  error: boolean | string
}

const fetchData = async (mintPublicKey:string, creator_email: string): Promise<fetchDataType> => {
  try {
    const supabase = createClient();
  
    const { data, error } = await supabase
    .from('token_mints')
    .select('id, mint_address, symbol, initial_supply, maxclaimsperwallet, tokensperclaim')
    .eq('creator_email', creator_email)
    .eq('id', mintPublicKey)
    .single()
    
    if(error){
      return {
        success: false,
        data: null,
        error: error.message
      } 
    }
    return { data: data, success: true, error: false} 
  } catch (error) {
    const err = error as Error;
    return{
      success: false,
      error: err.message,
      data: null
    }
  }
}

export const TotalSupply = async ({ id } : {
  id: string
}) => {

  const session = await getServerSession();
  
  if(!session){
    return redirect('/login');
  }

  let errorMessage = '';
  let errorOccured = false

  const { data, error, success } = await fetchData(id, session.user!.email!)

  if(!success && typeof error === 'string'){
    errorMessage = error;
    errorOccured = true
  }

  const tokenSupply = () => {
    
    const initial_supply = data?.initial_supply
    if(typeof initial_supply === 'string'){
      return formatNumber(Number(initial_supply));
    }
    if(typeof initial_supply === 'number'){
      return formatNumber(initial_supply)
    }
    return ''
  }
    const symbol = data?.symbol
  return (
    <>
      <div className="text-2xl font-bold text-black mb-1">{tokenSupply()} {symbol}</div>
      <ClientRenderedSonner errorMessage={errorMessage} isVisible={errorOccured}/>
    </>
  )
}

export const TokenClaim = async ({ id } : {
  id: string
}) => {
  
  const session = await getServerSession();
  
  if(!session){
    return redirect('/login');
  }
  
  let errorMessage = '';
  let errorOccured = false

  const { data, error, success } = await fetchData(id, session.user!.email!)

  if(!success && typeof error === 'string'){
    errorMessage = error;
    errorOccured = true
  }

  const tokenClaim = () => {
    const tokensperclaim = data?.tokensperclaim;
    if(typeof tokensperclaim === 'string') {
      return formatNumber(Number(tokensperclaim));
    }
    if(typeof tokensperclaim === 'number'){
      return formatNumber(tokensperclaim)
    }
    return ''
  }

    return(
      <>
      <div className="text-2xl font-bold text-black mb-1">{tokenClaim()} per claim</div>
      <ClientRenderedSonner errorMessage={errorMessage} isVisible={errorOccured}/>
      </>
    )
}