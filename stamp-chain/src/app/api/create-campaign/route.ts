import { NextRequest, NextResponse } from 'next/server'
import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  getMint,
  getMetadataPointerState,
  TYPE_SIZE,
  LENGTH_SIZE,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import {
  createInitializeInstruction,
  createUpdateFieldInstruction,
  pack,
  TokenMetadata,
} from "@solana/spl-token-metadata";

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

    
    if(getServerWalletError){
      console.log(getServerWalletError.message)
      return NextResponse.json({ error: getServerWalletError.message, success: false, validationError: false })
    }
    const keypair = convertStringToSecretKey(getServerWalletData?.server_key)
    // const userPubkey = new PublicKey(walletAddress);

    const metaData: TokenMetadata = {
      updateAuthority: keypair.publicKey,
      mint: mintAuthority.publicKey,
      name: name,
      symbol: tokenSymbol,
      uri: "https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/DeveloperPortal/metadata.json",
      additionalMetadata: [["description", "Only Possible On Solana"]],
    };
    
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    const metadataLen = pack(metaData).length;
    
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    
    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataExtension + metadataLen,
    );




const createAccountInstruction = SystemProgram.createAccount({
  fromPubkey: keypair.publicKey,
  newAccountPubkey: mintAuthority.publicKey,
  space: mintLen, 
  lamports, 
  programId: TOKEN_2022_PROGRAM_ID, 
});


const initializeMetadataPointerInstruction =
  createInitializeMetadataPointerInstruction(
    mintAuthority.publicKey, 
    keypair.publicKey, 
    mintAuthority.publicKey,
    TOKEN_2022_PROGRAM_ID,
  );

  
const initializeMintInstruction = createInitializeMintInstruction(
  mintAuthority.publicKey,
  Number(decimals), 
  mintAuthority.publicKey,
  null, 
  TOKEN_2022_PROGRAM_ID,
);

// Instruction to initialize Metadata Account data
const initializeMetadataInstruction = createInitializeInstruction({
  programId: TOKEN_2022_PROGRAM_ID, 
  metadata: mintAuthority.publicKey,
  updateAuthority: keypair.publicKey,
  mint: mintAuthority.publicKey, 
  mintAuthority: mintAuthority.publicKey,
  name: metaData.name,
  symbol: metaData.symbol,
  uri: metaData.uri,
});



const updateFieldInstruction = createUpdateFieldInstruction({
  programId: TOKEN_2022_PROGRAM_ID, 
  metadata: mintAuthority.publicKey,
  updateAuthority: keypair.publicKey,
  field: metaData.additionalMetadata[0][0],
  value: metaData.additionalMetadata[0][1],
});


const transaction = new Transaction().add(
  createAccountInstruction,
  initializeMetadataPointerInstruction,
  initializeMintInstruction,
  initializeMetadataInstruction,
  updateFieldInstruction,
);

// Send transaction
const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [keypair, mintAuthority], 
);

console.log('transaction went through', transactionSignature)

const mintInfo = await getMint(
  connection,
  mintAuthority.publicKey,
  "confirmed",
  TOKEN_2022_PROGRAM_ID,
);


const metadataPointer = getMetadataPointerState(mintInfo);
console.log("\nMetadata Pointer:", JSON.stringify(metadataPointer, null, 2));


const serverAta = await getAssociatedTokenAddress(
  mintAuthority.publicKey,
  keypair.publicKey,
  false,
  TOKEN_2022_PROGRAM_ID
);

const createServerAtaIx = createAssociatedTokenAccountInstruction(
  keypair.publicKey, 
  serverAta,
  keypair.publicKey, 
  mintAuthority.publicKey,
  TOKEN_2022_PROGRAM_ID
);

const supplyBig = BigInt(String(totalSupply));
const amountInBaseUnits = supplyBig * BigInt(10) ** BigInt(Number(decimals));

const mintToIx = createMintToInstruction(
  mintAuthority.publicKey,
  serverAta,
  mintAuthority.publicKey,
  Number(amountInBaseUnits),
  [],
  TOKEN_2022_PROGRAM_ID
);

const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

const tx2 = new Transaction({
  feePayer: keypair.publicKey,
  blockhash,
  lastValidBlockHeight,
}).add(createServerAtaIx, mintToIx);

const signature = await sendAndConfirmTransaction(connection, tx2, [
  keypair, mintAuthority
]);

console.log(signature, 'This works well apparently')

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
.select('id')
.maybeSingle()


if (error) {
  return NextResponse.json({ error: error.message, success: false, validationError: false })
}
    
    
    return NextResponse.json({
      success: true,
      error: false,
      explorer: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
      url: `/admin/campaign/success?id=${data?.id}`
    })
  } catch (error) {
    const err = error as Error
    console.log(err)
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