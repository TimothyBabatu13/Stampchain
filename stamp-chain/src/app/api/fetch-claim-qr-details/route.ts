import { createClient } from "@/config/supabase/supabase-server";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const session = await getServerSession();
    if(!session){
        return NextResponse.json({
            success: false,
            error: "You have to log in to use this",
            data: null
        })
    }

    const body = await req.json();


    try {
        
        const supabase = createClient();
          
        const { data, error } = await supabase
        .from('token_mints')
        .select('id, mint_address, name, symbol, tokensperclaim, description')
        .eq('id', body)
        .single()
        
        if(error){
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            })
        }
        
        const dataToReturn = {
            name: data.name,
            tokenSymbol: data.symbol,
            tokensPerClaim: data.tokensperclaim as number,
            description: data.description,
        }
        
        return NextResponse.json({
            success: true,
            error: false,
            data: dataToReturn
        })
    } catch (error) {
        const err = error as Error
        return NextResponse.json({
            success: false,
            error: err.message,
            data: null
        })
    }
}