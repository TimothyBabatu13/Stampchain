import { clusterApiUrl, Connection, Transaction } from "@solana/web3.js"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { Buffer } from "buffer"
export const POST = async (req: NextRequest) => {

    const session = await getServerSession();
    console.log(session)
    if(!session){
        return NextResponse.json({
            success: false,
            message: "You have to be active"
        })
    }
    
    const { signedTx } = await req.json()

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
  
    

    try {
        const serializedTx = Buffer.from(signedTx, "base64")
        const tx = Transaction.from(serializedTx)
        const txid = await connection.sendRawTransaction(tx.serialize())
        await connection.confirmTransaction(txid, "confirmed")
        return NextResponse.json({
            success: true,
            txid,
            explorer: `https://explorer.solana.com/tx/${txid}?cluster=devnet`,
        })    
    } catch (error) {
        const err = error as Error
        return NextResponse.json(err.message)
    }
    
  
    
}