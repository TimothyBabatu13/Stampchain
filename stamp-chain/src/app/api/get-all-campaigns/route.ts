import { createClient } from "@/config/supabase/supabase-server";
import { campaingsType } from "@/stores/qrGeneratorStore";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async () => {
    const session = await getServerSession();
    if(!session) {
        return NextResponse.json({
            success: false,
            error: 'You are not authorized to this. Please log in',
            data: []
        })
    }
    const email = session.user?.email;
    const supabase = createClient();
    try {

        const { data, error } = await supabase
        .from('token_mints')
        .select(`id, name, symbol`)
        .eq('creator_email', email)
        
        if(error){
            return NextResponse.json({
                success: false,
                error: error.message,
                data: []
            })
        }

        const returnedData = data.map(datum => ({
            id: datum.id, 
            name: datum.name, 
            tokenSymbol: datum.symbol 
        }))

        return NextResponse.json({
            success: true,
            error: false,
            data: returnedData as Array<campaingsType>
        })
        
    } catch (error) {
        const err = error as Error
        return NextResponse.json({
            success: false,
            error: err.message,
            data: []
        })
    }
}