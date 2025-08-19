import { createClient } from "@/config/supabase/supabase-server";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await getServerSession();
    if(!session){
        return NextResponse.json({
            success: false,
            error: 'You have to log in to use this service',
            data: null
        })
    }

    const email = session.user?.email as string;
    try {
        const supabase = createClient();
        const { data, error } = await supabase
        .from('users')
        .select('server_wallet')
        .eq('email', email)
        .maybeSingle()

        if(error){
            return NextResponse.json({
                error: error.message,
                data: null,
                success: false
            })
        }

        return NextResponse.json({
            error: false,
            data,
            success: true
        })
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({
            error: err.message,
            data: null,
            success: false
        })
    }
}