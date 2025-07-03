import { NextRequest, NextResponse } from 'next/server'
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from '@solana/web3.js'
import {
    createAssociatedTokenAccountInstruction,
    createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { createCampaign } from "@/validations/create-campaign-validation";
import { createClient } from '@/config/supabase/supabase-server';
import { getServerSession } from 'next-auth';



export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const mintAuthority = Keypair.generate();
    const superbase = createClient();
    const session = await getServerSession();

    if(!session){
        return NextResponse.json({
            success: false,
            data: 'You have to active'
        })
    }
    const validationResult = createCampaign.safeParse(body);

    if(!validationResult.success){
        return NextResponse.json(validationResult.error)
    }

    const { name, decimals, tokenSymbol, totalSupply, walletAddress, description } = validationResult.data
    
    try {

        const userPubkey = new PublicKey(walletAddress);
        
        const ata = await getAssociatedTokenAddress(
            mintAuthority.publicKey,
            userPubkey
        )

        const tx = new Transaction()
        const lamports = await connection.getMinimumBalanceForRentExemption(82)
        tx.add(
            SystemProgram.createAccount({
              fromPubkey: userPubkey,
              newAccountPubkey: mintAuthority.publicKey,
              space: 82,
              lamports,
              programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMintInstruction(
              mintAuthority.publicKey,
              Number(decimals),
              userPubkey,
              null
            ),
            createAssociatedTokenAccountInstruction(
              userPubkey,
              ata,
              userPubkey,
              mintAuthority.publicKey
            )
          )

          if (Number(totalSupply) > 0) {
            tx.add(
              createMintToInstruction(
                mintAuthority.publicKey,
                ata,
                userPubkey,
                BigInt(totalSupply)
              )
            )
          }

          tx.feePayer = userPubkey;

          tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
          tx.partialSign(mintAuthority)
          const { data, error } = await superbase.from('token_mints').insert({
            mint_address: mintAuthority.publicKey.toBase58(),
            mint_secret_key: Array.from(mintAuthority.secretKey),
            creator_email: session.user?.email,
            decimals: decimals,
            name: name,
            description,
            symbol: tokenSymbol,
            initial_supply: totalSupply
          })

          if(error){
            console.log(error)
          }
          console.log(data)
          return NextResponse.json({
            unsignedTx: tx.serialize({
              requireAllSignatures: false,
              verifySignatures: false
            }).toString('base64'),
            mintPublicKey: mintAuthority.publicKey.toBase58(),
            data
          })
    } catch (error) {
        const err = error as Error
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}