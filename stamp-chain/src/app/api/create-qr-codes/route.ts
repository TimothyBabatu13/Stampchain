import { campaingsType } from "@/stores/qrGeneratorStore";
import { NextRequest, NextResponse } from "next/server";

interface bodyType {
    qrCount: string;
    campaign: campaingsType;
}


const generateRandomUID = () => crypto.randomUUID();

const generateCodes = (num: number) => {
    const arr : Array<string> = [];
    for(let i = 0; i < num; i++) {
        arr.push(generateRandomUID());
    }
    return arr;
}

const generateId = (id: string) => `qr-${Date.now()}-${id}`
const generateURL = (id: string) => `https://example.com/claim?token=abc123def456-${id}`;  

export const POST = async (req: NextRequest) => {
    const body: bodyType = await req.json();

    if(!body.qrCount || !body.campaign.id || !body.campaign.name || !body.campaign.tokenSymbol){
        return NextResponse.json({status: '201', response: 'Please provide qr counts'})
    }

    const { qrCount, campaign } = body;

    const arr = generateCodes(Number(qrCount));
    const result = arr.map((item) => ({
       id: item,
       url: generateURL(item),
       token: generateId(item) 
    }))

    console.log(`Campaign created for this info`, campaign.name, campaign.tokenSymbol, campaign.id)
    return NextResponse.json({status: '200', response: result});
}