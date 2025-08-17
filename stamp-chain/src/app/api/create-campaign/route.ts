import { NextRequest, NextResponse } from 'next/server'
import {
  Connection,
  Keypair,
  // PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
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
import { convertStringToSecretKey } from '@/util/convert-string-to-secretKey';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({
      success: false,
      data: 'Please login to proceed'
    })
  }
  const body = await req.json();
  const validationResult = createCampaign.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json({success: false, error:validationResult.error, validationError: true})
  }

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
  const mintAuthority = Keypair.generate();
  const superbase = createClient();
  
  const { name, 
    decimals, 
    tokenSymbol, 
    totalSupply, 
    // walletAddress,
    description,
    maxClaimsPerWallet, 
    tokensPerClaim,  
    } = validationResult.data

  try {

    const {data: getServerWalletData, error: getServerWalletError} = await superbase
    .from('users')
    .select('server_wallet, server_key')
    .eq('email', session.user?.email)
    .maybeSingle()

    
    console.log(getServerWalletData)

    if(getServerWalletError){
      console.log(getServerWalletError.message)
    }
    const keypair = convertStringToSecretKey(getServerWalletData?.server_key)
    // const userPubkey = new PublicKey(walletAddress);

    const rentLamports = await getMinimumBalanceForRentExemptMint(connection);

    const createMintAccountIx = SystemProgram.createAccount({
      fromPubkey: keypair.publicKey, // payer
      newAccountPubkey: mintAuthority.publicKey,   // the mint account
      space: MINT_SIZE,
      lamports: rentLamports,
      programId: TOKEN_PROGRAM_ID,
    });


    const initializeMintIx = createInitializeMintInstruction(
      mintAuthority.publicKey,
      Number(decimals),
      keypair.publicKey, // mint authority
      keypair.publicKey  // freeze authority (you can make this null if desired)
    );

     const serverAta = await getAssociatedTokenAddress(
      mintAuthority.publicKey,
      keypair.publicKey
    );

     const createServerAtaIx = createAssociatedTokenAccountInstruction(
      keypair.publicKey, // payer
      serverAta,              // ATA address
      keypair.publicKey, // owner
      mintAuthority.publicKey          // mint
    );

    const supplyBig = BigInt(String(totalSupply));
    const amountInBaseUnits = supplyBig * BigInt(10) ** BigInt(Number(decimals));

    const mintToIx = createMintToInstruction(
      mintAuthority.publicKey,
      serverAta,
      keypair.publicKey,        // mint authority
      Number(amountInBaseUnits),     // SPL helpers accept number; safe if <= Number.MAX_SAFE_INTEGER
      []                             
    );

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    const tx = new Transaction({
      feePayer: keypair.publicKey,
      blockhash,
      lastValidBlockHeight,
    }).add(createMintAccountIx, initializeMintIx, createServerAtaIx, mintToIx);

    const signature = await sendAndConfirmTransaction(connection, tx, [
      keypair, // pays fees & is mint authority
      mintAuthority,         // signs because we created the mint account
    ]);

    
  //   const ata = await getAssociatedTokenAddress(
  //     mintAuthority.publicKey,
  //     userPubkey
  //   )

  //   const lamports = await getMinimumBalanceForRentExemptMint(connection);

  //   const createAccountIx = SystemProgram.createAccount({
  //     fromPubkey: userPubkey,
  //     newAccountPubkey: mintAuthority.publicKey,
  //     space: MINT_SIZE,
  //     lamports,
  //     programId: TOKEN_PROGRAM_ID
  //   });
  
  //   const initMintIx = createInitializeMintInstruction(
  //     mintAuthority.publicKey,
  //     Number(decimals),
  //     userPubkey, 
  //     userPubkey,
  //     TOKEN_PROGRAM_ID
  //   );
  

  //   const createAtaIx = createAssociatedTokenAccountInstruction(
  //     userPubkey,
  //     ata,
  //     userPubkey,
  //     mintAuthority.publicKey
  //   );

  //   const mintToIx = createMintToInstruction(
  //     mintAuthority.publicKey,
  //     ata,
  //     userPubkey,
  //     Number(totalSupply) * (10 ** Number(decimals)),
  //     [],
  //     TOKEN_PROGRAM_ID
  //   );
    
  //   const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
  //   const tx = new Transaction({
  //     feePayer: userPubkey,blockhash,
  //     lastValidBlockHeight
  //   }).add(createAccountIx, initMintIx, createAtaIx, mintToIx);

  // // Backend signs with mint key
  //   tx.partialSign(mintAuthority);

    const { data, error } = await superbase.from('token_mints').insert({
      mint_address: mintAuthority.publicKey.toBase58(),
      mint_secret_key: Array.from(mintAuthority.secretKey),
      creator_email: session.user?.email,
      decimals: decimals,
      name: name,
      description,
      symbol: tokenSymbol,
      initial_supply: totalSupply,
      maxclaimsperwallet: maxClaimsPerWallet,
      tokensperclaim: tokensPerClaim
    })
    

    if (error) {
      console.log(error)
    }
    
    return NextResponse.json({
      success: true,
      error: false,
      txid: signature,
      explorer: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
      // https://solscan.io/
      // url: `/admin/campaign/success?id=${data.id}`,
      unsignedTx: tx.serialize({
        requireAllSignatures: false,
      }).toString('base64'),
      mintPublicKey: mintAuthority.publicKey.toBase58(),
      data
    })
  } catch (error) {
    const err = error as Error
    return NextResponse.json({ error: err.message, success: false, validationError: false })
  }
}




// const createThings = () => {
//  const POST = async (req: NextRequest) => {
//   const session = await getServerSession();
//   if (!session) {
//     return NextResponse.json({
//       success: false,
//       data: 'Please login to proceed'
//     });
//   }

//   const body = await req.json();
//   const validationResult = createCampaign.safeParse(body);

//   if (!validationResult.success) {
//     return NextResponse.json({ success: false, error: validationResult.error, validationError: true });
//   }

//   const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
//   const supabase = createClient();
//   const { name, decimals, tokenSymbol, totalSupply, description, maxClaimsPerWallet, tokensPerClaim } = validationResult.data;

//   try {
//     const userEmail = session.user?.email;

//     // Check if the user already has a wallet (mint authority)
//     const { data: userWallets, error: fetchWalletError } = await supabase
//       .from('user_wallets')
//       .select('mint_secret_key')
//       .eq('email', userEmail)
//       .single();

//     let mintAuthority: Keypair;

//     if (fetchWalletError || !userWallets) {
//       // Generate a new wallet for the user
//       mintAuthority = Keypair.generate();

//       // Save the wallet to DB
//       const { error: saveError } = await supabase.from('user_wallets').insert({
//         email: userEmail,
//         mint_secret_key: Array.from(mintAuthority.secretKey),
//       });

//       if (saveError) throw new Error("Failed to save user wallet");
//     } else {
//       // Restore existing wallet
//       mintAuthority = Keypair.fromSecretKey(new Uint8Array(userWallets.mint_secret_key));
//     }

//     const mintPubkey = mintAuthority.publicKey;
//     const ata = await getAssociatedTokenAddress(mintPubkey, mintPubkey);

//     const lamports = await getMinimumBalanceForRentExemptMint(connection);

//     const createAccountIx = SystemProgram.createAccount({
//       fromPubkey: mintPubkey,
//       newAccountPubkey: mintPubkey,
//       space: MINT_SIZE,
//       lamports,
//       programId: TOKEN_PROGRAM_ID
//     });

//     const initMintIx = createInitializeMintInstruction(
//       mintPubkey,
//       Number(decimals),
//       mintPubkey,
//       mintPubkey,
//       TOKEN_PROGRAM_ID
//     );

//     const createAtaIx = createAssociatedTokenAccountInstruction(
//       mintPubkey,
//       ata,
//       mintPubkey,
//       mintPubkey
//     );

//     const mintToIx = createMintToInstruction(
//       mintPubkey,
//       ata,
//       mintPubkey,
//       Number(totalSupply) * 10 ** Number(decimals),
//       [],
//       TOKEN_PROGRAM_ID
//     );

//     const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

//     const tx = new Transaction({
//       feePayer: mintPubkey,
//       blockhash,
//       lastValidBlockHeight
//     }).add(createAccountIx, initMintIx, createAtaIx, mintToIx);

//     // Backend signs with mintAuthority
//     tx.sign(mintAuthority);

//     const { error: insertError, data } = await supabase.from('token_mints').insert({
//       mint_address: mintPubkey.toBase58(),
//       creator_email: userEmail,
//       decimals,
//       name,
//       description,
//       symbol: tokenSymbol,
//       initial_supply: totalSupply,
//       maxClaimsPerWallet,
//       tokensPerClaim
//     });

//     if (insertError) throw new Error("Failed to save token info");

//     return NextResponse.json({
//       success: true,
//       validationError: false,
//       mintPublicKey: mintPubkey.toBase58(),
//       tx: tx.serialize().toString("base64"),
//       data
//     });

//   } catch (error) {
//     const err = error as Error;
//     return NextResponse.json({ error: err.message, success: false, validationError: false });
//   }
// }
// console.log(createThings)
// }