
import { createClient } from "@/config/supabase/supabase-server";
import { convertStringToSecretKey } from "@/util/convert-string-to-secretKey";
import { ClaimTokenToAddress } from "@/validations/claim-token-validation";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { 
    clusterApiUrl, 
    Connection, 
    // Keypair, 
    PublicKey 
} from "@solana/web3.js";
import { getServerSession } from "next-auth";
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
    const session = await getServerSession();
    const body = await req.json();    
    const { success, data, error } = ClaimTokenToAddress.safeParse(body);
    
    if(!success){
        return NextResponse.json({
            success: false,
            data: null,
            error: error.errors
        })
    }

    const { 
            tokenId, 
            // wallet, 
            walletAddress, 
            uniqueId 
        } = data
    
    const supabase = createClient();

    try {
        const { error, data } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('unique_code', uniqueId)
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
                data: null,
                error: 'This code has been used or invalid'
            })
        }

        const { data: SenderPublicKey, error: SenderError } = await supabase
        .from('users')
        .select('server_wallet, server_key')
        .eq('email',session?.user?.email)
        .maybeSingle()

        if(SenderError) {
            return NextResponse.json({
                success: false,
                data: null,
                error: SenderError.message
            })
        }

        const {data: tokenData, error: tokenError} = await supabase
        .from('token_mints')
        .select('mint_secret_key, mint_address, tokensperclaim')
        .eq('id', tokenId)
        .maybeSingle()

        if(tokenError){
            return NextResponse.json({
                success: false,
                data: null,
                error: 'There was an error fetching data from token mints'
            })
        }

        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')   
        const sender = convertStringToSecretKey(SenderPublicKey?.server_key);

        const recipient = new PublicKey(walletAddress);
        const tokenMint = new PublicKey(tokenData?.mint_address);
        console.log(tokenMint.toBase58());
        console.log(sender.publicKey.toBase58())
        console.log('transferring token...');
    
        const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection, sender, tokenMint, sender.publicKey
        )
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(connection, sender, tokenMint, recipient);
        const amount = Number(tokenData?.tokensperclaim) * 10 ** 9;
        
        await transfer(
            connection,
            sender,
            senderTokenAccount.address,
            recipientTokenAccount.address,
            sender.publicKey,
            amount
        )

        const {data: updateField, error: updateFieldError} = await supabase
        .from('qr_codes')
        .update({used: true, claimed_at: new Date().toISOString()})
        .eq('unique_code', uniqueId)
        .maybeSingle()

        console.log(updateField)
        if(updateFieldError){
            console.log(updateFieldError)
            return NextResponse.json({
                success: false,
                data: null,
                error: updateFieldError.message
            })
        }

        return NextResponse.json({
            success: true,
            error: false,
            data: 'This has been claimed'
        })    
    } catch (error) {
        console.log(error)
        const err = error as Error;
        return NextResponse.json({
            error: err.message,
            success:false,
            data: null
        })
    }
    
}