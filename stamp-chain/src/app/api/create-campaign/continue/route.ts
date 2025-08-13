import { clusterApiUrl, Connection, Transaction } from "@solana/web3.js"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { Buffer } from "buffer"
import { createClient } from "@/config/supabase/supabase-server"
import { continueCreateCampaign } from "@/validations/create-campaign-validation"

export const POST = async (req: NextRequest) => {

    const session = await getServerSession();

    if(!session){
        return NextResponse.json({
            success: false,
            message: "You have to be active"
        })
    }
    
    const result = await req.json();
    const { success, data, error } = continueCreateCampaign.safeParse(result);

    if(!success){
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }

    const { signedTx, mintPublicKey } = data;

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
  
    try {
        const tx = Transaction.from(Buffer.from(signedTx, 'base64'))
        const signature = await connection.sendRawTransaction(tx.serialize())
        await connection.confirmTransaction(signature)
        const supabase = createClient();
        
        const { data, error } = await supabase
        .from('token_mints')
        .select('id')
        .eq('mint_address', mintPublicKey)
        .single()

        if(error){
            return NextResponse.json({
                success: false,
                message: error.message 
            })
        }
        return NextResponse.json({
            success: true,
            txid: signature,
            explorer: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
            url: `/admin/campaign/success?id=${data.id}`
        })    
    } catch (error) {
        const err = error as Error
        return NextResponse.json({err: err.message,
            success: false
        })
    }
    
  
    
}