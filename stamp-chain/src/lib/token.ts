// lib/tokens.ts
import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Signer,
  } from '@solana/web3.js'
  import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
  } from '@solana/spl-token'
  
  export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
  
  export async function createSPLToken({ decimals = 9, MINT_AUTHORITY }: { decimals?: number, MINT_AUTHORITY: Signer }) {
    const mint = await createMint(
      connection,
      MINT_AUTHORITY,
      MINT_AUTHORITY.publicKey,
      null,
      decimals
    )
  
    return mint
  }
  
  export async function mintToWallet({
    mint,
    recipient,
    amount,
    MINT_AUTHORITY
  }: {
    mint: PublicKey
    recipient: PublicKey
    amount: number,
    MINT_AUTHORITY: Signer
  }) {
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      MINT_AUTHORITY,
      mint,
      recipient
    )
  
    const signature = await mintTo(
      connection,
      MINT_AUTHORITY,
      mint,
      recipientTokenAccount.address,
      MINT_AUTHORITY,
      amount
    )
  
    return signature
  }
  
  export async function transferToken({
    mint,
    recipient,
    amount,
    MINT_AUTHORITY
  }: {
    mint: PublicKey
    recipient: PublicKey
    amount: number,
    MINT_AUTHORITY: Signer
  }) {
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      MINT_AUTHORITY,
      mint,
      MINT_AUTHORITY.publicKey
    )
  
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      MINT_AUTHORITY,
      mint,
      recipient
    )
  
    const sig = await transfer(
      connection,
      MINT_AUTHORITY,
      senderTokenAccount.address,
      recipientTokenAccount.address,
      MINT_AUTHORITY,
      amount
    )
  
    return sig
  }
  