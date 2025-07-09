import { createClient } from "@/config/supabase/supabase-server";
import { ClaimTokenValidation } from "@/validations/claim-token-validation";
import { NextRequest, NextResponse } from "next/server"

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
        const {  error } = await supabase
        .from('')
        .select('*')
        .eq('token', token)
        
        if(error) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            })
        }

        
        return NextResponse.json({
            success: true,
            data: [],
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