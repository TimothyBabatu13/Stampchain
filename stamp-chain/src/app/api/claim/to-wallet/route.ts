
import { createClient } from "@/config/supabase/supabase-server";
import { convertStringToSecretKey } from "@/util/convert-string-to-secretKey";
import { ClaimTokenToAddress } from "@/validations/claim-token-validation";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { 
    clusterApiUrl, 
    Connection, 
    Keypair, 
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

const isQRCodeValid = async (uniqueId: string): Promise<{
    success: boolean,
    errorMessage: string | null
}> => {
    try {
        const supabase = createClient();
        const { error, data } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('unique_code', uniqueId)
        .maybeSingle()
        
        if(error){
            return ({
                success: false,
                errorMessage: error.message
            })
        }
        const result = data as dataTpe
        if(result.used){
            return {
                success: false,
                errorMessage: 'This code has been used or invalid'
            }
        }
        return {
            success: true,
            errorMessage: null
        }
        
    } catch (error) {
        const err = error as Error
        return {
            success: false,
            errorMessage: err.message
        }
    }
}

const getServerWallets = async (email: string) : Promise<{
    success: boolean,
    errorMessage: string | null,
    data: Keypair | null
}> => {
    try {
        const supabase = createClient();
        const { data: SenderPublicKey, error: SenderError } = await supabase
        .from('users')
        .select('server_wallet, server_key')
        .eq('email', email)
        .maybeSingle()

        if(SenderError){
            return {
                success: false,
                errorMessage: SenderError.message,
                data: null
            }
        }
        
        const sender = convertStringToSecretKey(SenderPublicKey?.server_key);
        return {
            success: true,
            data: sender,
            errorMessage: null
        }
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            data: null,
            errorMessage: err.message
        }
    }
}

const fetchTokenMintData = async (tokenId: string): Promise<{
    success: boolean,
    errorMessage: string | null,
    data: null | {
    mint_secret_key: string,
    mint_address: string,
    tokensperclaim: string
}}> => {
    try {
        const supabase = createClient();
        const { data: tokenData, error: tokenError} = await supabase
        .from('token_mints')
        .select('mint_secret_key, mint_address, tokensperclaim')
        .eq('id', tokenId)
        .maybeSingle()

        if(tokenError){
            return {
                success: false,
                errorMessage: tokenError.message,
                data: null
            }
        }

        return {
            success: true,
            errorMessage: null,
            data:tokenData
        }
    } catch (error) {
        const err = error as Error
        return {
            success: false,
            errorMessage: err.message,
            data:null
        }
    }
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

    const [qrCodes, serverWallet, tokenData] = await Promise.allSettled([isQRCodeValid(uniqueId), getServerWallets(session!.user!.email!), fetchTokenMintData(tokenId)]);

    if(qrCodes.status === 'rejected') {
        const reason = qrCodes.reason as string;
        return NextResponse.json({
            success: false,
            data: null,
            error: reason
        })
    }
    if(serverWallet.status === 'rejected'){
        const reason = serverWallet.reason as string;
        return NextResponse.json({
            success: false,
            data: null,
            error: reason
        })
    }
    if(tokenData.status === 'rejected'){
        const reason = tokenData.reason as string;
        return NextResponse.json({
            success: false,
            data: null,
            error: reason
        })
    }

    if(qrCodes.status === 'fulfilled' && !qrCodes.value.success){
        const reason = qrCodes.value.errorMessage as string;
        console.log(reason)
        return NextResponse.json({
            success: false,
            data: null,
            error:reason
        });
    }
    if(serverWallet.status === 'fulfilled' && !serverWallet.value.success){
        const reason = serverWallet.value.errorMessage as string;
        return NextResponse.json({
            success: false,
            data: null,
            error: reason
        })
    }
    if(tokenData.status === 'fulfilled' && !tokenData.value.success){
        const reason = tokenData.value.errorMessage as string;
        console.log(reason)
        return NextResponse.json({
            success: false,
            data: null,
            error:reason
        });
    }

    
    try {
        
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')   
        const sender = serverWallet.value.data!;

        const recipient = new PublicKey(walletAddress);
        const tokenMint = new PublicKey(tokenData.value.data!.mint_address!);
     
        const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection, sender, tokenMint, sender.publicKey
        )
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(connection, sender, tokenMint, recipient);
        const amount = Number(tokenData.value.data?.tokensperclaim) * 10 ** 9;
        
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