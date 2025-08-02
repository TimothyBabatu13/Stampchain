import { createClient } from "@/config/supabase/supabase-server";
import { generateURL } from "@/util/generate-url";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface dataTpe {
    id: string,
    campaign_id: string,
    unique_code: string,
    used: boolean,
    claimed_at: null | Date,
    created_at: Date
}

export const POST = async (req: NextRequest) => {
    const session = await getServerSession();

    if(!session) {
        return NextResponse.json({
            success: false,
            error: 'You have to log in',
            data: null
        })
    }

    const body = await req.json();
    const { id } = body
    
    const supabase = createClient();
    try {
        const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('campaign_id', id)

        if(error){
            console.log(error)
            return NextResponse.json({
                success: false,
                error: error.message,
                data: null
            })
        }

        const result = data as never as dataTpe[];
        const mapp = result.map(it => ({
            id: it.unique_code,
            url: generateURL(it.unique_code),
            token: it.unique_code

        }))

        return NextResponse.json({
            success: true,
            error: false,
            data: mapp
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