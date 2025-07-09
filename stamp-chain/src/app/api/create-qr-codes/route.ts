import { createClient } from "@/config/supabase/supabase-server";
import { generateURL } from "@/util/generate-url";
import { CreateQRCodesValidation } from "@/validations/create-qr-codes-validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: NextRequest) => {
    
    
    const session = await getServerSession();

    if(!session) {
        return NextResponse.json({
            success: false,
            error: `You have no access to this. Please log in`,
            data: null
        })
    }

    const body = await req.json();
    const validatedBody =  CreateQRCodesValidation.safeParse(body);
    
    if(!validatedBody.success){
        return NextResponse.json({
            success: false,
            data: null,
            error: validatedBody.error.message
        })
    }

    const { data: { campaign, qrCount } } = validatedBody;

    const supabase = createClient();
    try {
        const { data, error } = await supabase
        .from('token_mints')
        .select(`id`)
        .eq('id', campaign)
        .maybeSingle();

        if(error){
            console.log(error)
            return NextResponse.json({
                success: false,
                error: error.message,
                data: null
            })
        }
        
        const codes = Array.from({ length: Number(qrCount) }, () => {
            const unique_code = uuidv4();
            return {
              campaign_id: data?.id,
              unique_code,
              used: false
            };
          });
        
          const { error: insertError } = await supabase
          .from("qr_codes")
          .insert(codes);
          
          if (insertError) {
            return NextResponse.json({
                success: false,
                error: "Failed to insert QR codes",data: null,
            });
        }

          return NextResponse.json({
            success: true,
            data: codes.map(code => ({
              unique_code: code.unique_code,
              claim_url: generateURL(code.unique_code),
            })),
            error: false,
          });
        
    } catch (error) {
        const err = error as Error
        return NextResponse.json({
            success: false,
            error: err.message,
            data: null
        })
    }
}