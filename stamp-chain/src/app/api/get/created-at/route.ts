import { createClient } from "@/config/supabase/supabase-server";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const session = await getServerSession();

    if(!session) return NextResponse.json({res: 'Unauthorized'});

    const { id } = await req.json();

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
        .from('token_mints')
        .select('created_at, tokensperclaim, maxclaimsperwallet')
        .eq('id', id)
        .eq('creator_email', session!.user!.email)
        .single();

        console.log(error)
        if(error) return NextResponse.json({res: 'Error fetching created_at'});
        
        const date = new Date(data.created_at);
        
        const formatted = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
        });
        return NextResponse.json({ created_at: formatted, tokenperclaim: data.tokensperclaim, maxClaim: data.maxclaimsperwallet });
    } catch (err) {
        console.log(err)
        return NextResponse.json({res: 'Error fetching created_at'});
    }
}