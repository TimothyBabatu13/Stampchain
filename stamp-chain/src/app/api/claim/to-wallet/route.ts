
import { ClaimTokenToAddress } from "@/validations/claim-token-validation";
import { NextRequest, NextResponse } from "next/server"

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

    const { token, wallet, walletAddress } = data

    return NextResponse.json({
        success: true,
        error: false,
        data: [{
            token,
            wallet,
            walletAddress
        }]
    })
}