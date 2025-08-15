
import { createClient } from "@/config/supabase/supabase-server";
import { ClaimTokenToAddress } from "@/validations/claim-token-validation";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
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
    const { success, data, error } = ClaimTokenToAddress.safeParse(body);
    
    if(!success){
        return NextResponse.json({
            success: false,
            data: null,
            error: error.errors
        })
    }

    const { tokenId, wallet, walletAddress, uniqueId } = data
 
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
                data: [],
                error: 'This code has been used or invalid'
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
                data: [],
                error: 'There was an error fetching data from token mints'
            })
        }

        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const secretKey = Uint8Array.from(tokenData?.mint_secret_key)
        const sender = Keypair.fromSecretKey(secretKey);
        
        const recipient = new PublicKey(walletAddress);
        const tokenMint = new PublicKey(tokenData?.mint_address);
        
        console.log('transferring token...');
        const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection, sender, tokenMint, sender.publicKey
        )
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(connection, sender, tokenMint, recipient);
        const amount = Number(tokenData?.tokensperclaim) * 10 ** 9;
        
        const signnature = await transfer(
            connection,
            sender,
            senderTokenAccount.address,
            recipientTokenAccount.address,
            sender.publicKey,
            amount
        )

        console.log(`transfer succesful,`+ signnature)

        return NextResponse.json({
            success: true,
            error: false,
            data: [{
                tokenId,
                wallet,
                walletAddress,
                signnature
            }]
        })    
    } catch (error) {
        console.log(error)
    }

    
}