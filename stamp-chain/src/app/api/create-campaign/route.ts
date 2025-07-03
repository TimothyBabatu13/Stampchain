import { LaunchToken } from "@/util/lauchToken";
import { userIsActive } from "@/util/server";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { blockchain } = body
    const isActive = await userIsActive();

    if(!isActive){
        return NextResponse.json({status: 201, message: 'Login to create campaign'});
    }

    const getResponse = LaunchToken({network: blockchain});
    console.log(getResponse)
    return NextResponse.json({message: getResponse})
}