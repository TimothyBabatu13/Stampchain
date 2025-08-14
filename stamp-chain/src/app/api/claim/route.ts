import { createClient } from "@/config/supabase/supabase-server";
import { ClaimTokenValidation } from "@/validations/claim-token-validation";
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
    const validatedBody = ClaimTokenValidation.safeParse(body);
    
    if(validatedBody.error){
        return NextResponse.json({
            success: false,
            data: null,
            error: validatedBody.error.message
        })
    }

    const { token } = validatedBody.data;
    
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
        
        return NextResponse.json({
            success: true,
            data: result.campaign_id,
            error: false
        })
    } catch (error) {
        const err = error as Error
        return NextResponse.json({
            success: false,
            data: null,
            error: err.message
        })
    }
    
}