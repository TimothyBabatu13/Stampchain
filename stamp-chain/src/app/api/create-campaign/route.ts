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
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'

import { createCampaign } from "@/validations/create-campaign-validation";
import { createClient } from '@/config/supabase/supabase-server';
import { getServerSession } from 'next-auth';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({
      success: false,
      data: 'You have to active'
    })
  }
  const body = await req.json();
  const validationResult = createCampaign.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json({success: false, error:validationResult.error})
  }

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
  const mintAuthority = Keypair.generate();
  const superbase = createClient();
  
  const { name, decimals, tokenSymbol, totalSupply, walletAddress, description, maxClaimsPerWallet, tokensPerClaim,  } = validationResult.data

  try {

    const userPubkey = new PublicKey(walletAddress);

    const ata = await getAssociatedTokenAddress(
      mintAuthority.publicKey,
      userPubkey
    )

    
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const createAccountIx = SystemProgram.createAccount({
      fromPubkey: userPubkey,
      newAccountPubkey: mintAuthority.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID
    });
  
    const initMintIx = createInitializeMintInstruction(
      mintAuthority.publicKey,
      Number(decimals),
      userPubkey, 
      userPubkey,
      TOKEN_PROGRAM_ID
    );
  

    const createAtaIx = createAssociatedTokenAccountInstruction(
      userPubkey,
      ata,
      userPubkey,
      mintAuthority.publicKey
    );

    const mintToIx = createMintToInstruction(
      mintAuthority.publicKey,
      ata,
      userPubkey,
      Number(totalSupply) * (10 ** Number(decimals)),
      [],
      TOKEN_PROGRAM_ID
    );
    
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
    const tx = new Transaction({
      feePayer: userPubkey,blockhash,
      lastValidBlockHeight
    }).add(createAccountIx, initMintIx, createAtaIx, mintToIx);

  // Backend signs with mint key
    tx.partialSign(mintAuthority);
    
    const { data, error } = await superbase.from('token_mints').insert({
      mint_address: mintAuthority.publicKey.toBase58(),
      mint_secret_key: Array.from(mintAuthority.secretKey),
      creator_email: session.user?.email,
      decimals: decimals,
      name: name,
      description,
      symbol: tokenSymbol,
      initial_supply: totalSupply,
      maxClaimsPerWallet,
      tokensPerClaim
    })
    

    if (error) {
      console.log(error)
    }
    console.log(data)
    return NextResponse.json({
      success: true,
      unsignedTx: tx.serialize({
        requireAllSignatures: false,
      }).toString('base64'),
      mintPublicKey: mintAuthority.publicKey.toBase58(),
      data
    })
  } catch (error) {
    const err = error as Error
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


