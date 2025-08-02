
import { createClient } from "@/config/supabase/supabase-server";
import { ClaimTokenToAddress } from "@/validations/claim-token-validation";
import { NextRequest, NextResponse } from "next/server"

interface dataTpe {
    id: string,
    campaign_id: string,
    unique_code: string,
    used: boolean,
    claimed_at: null | Date,
    created_at: Date
}

export const POST = async (req: NextRequest) => {
    const body = await req.json();    
    const { success, data, error } = ClaimTokenToAddress.safeParse(body);

    if(!success){
        return NextResponse.json({
            success: false,
            data: null,
            error: error.errors
        })
    }

    const { token, wallet, walletAddress } = data
    const supabase = createClient();
    try {
        const {  error, data } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('unique_code', token)
        .maybeSingle()
        
        if(error) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            })
        }
        
        const result = data as dataTpe
        
        if(result.used) {
            return NextResponse.json({
                success: false,
                data: [],
                error: 'This code has been used or invalid'
            })
        }

        const {} = await supabase
        .from('')
        .select('*')

        //send token here
        
        return NextResponse.json({
            success: true,
            error: false,
            data: [{
                token,
                wallet,
                walletAddress
            }]
        })    
    } catch (error) {
        console.log(error)
    }

    
}