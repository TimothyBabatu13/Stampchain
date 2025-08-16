import { createClient } from "@/config/supabase/supabase-server";
import { Keypair } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server"

interface requestType {
    email: string
}

export const POST = async (req: NextRequest) => {

    const body = await req.json() as requestType;
    const email = body.email;
    const supabase = createClient();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: existingUser, error: _selectError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

    if(existingUser){
        return NextResponse.json({success: true, url: '/admin'})
    }

    const mintAuthority = Keypair.generate();
    
    const server_wallet = mintAuthority.publicKey.toString();
    const server_key = mintAuthority.secretKey;
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: _newUser, error: insertError } = await supabase
    .from('users')
    .insert([{ email, server_wallet, server_key }])
    .select()
    .single()

    if (insertError) {
        return NextResponse.json({success: false, error: insertError.message })
    }

    return NextResponse.json({success: true, url: '/admin'})
}