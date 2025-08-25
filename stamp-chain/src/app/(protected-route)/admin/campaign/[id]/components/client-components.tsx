'use client';

import { Button } from "@/components/ui/button";
import { useQrGeneratorStore } from "@/stores/qrGeneratorStore";
import { useTokenUtility } from "@/stores/token-utility";
import { QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export const GenerateQRCode = ({ id } : {
    id: string
}) => {

    const navigate = useRouter();
        const { setSelectedCampaign } = useQrGeneratorStore();
        const handleGenerateQrCodes = () => {
            navigate.push(`/qr-generator`);
            setSelectedCampaign(id)
        }
        
        const handlePrefetch = () => {
            navigate.prefetch('/qr-generator');
        }
  return (
    <Link 
        href={`/qr-generator`}
        prefetch={false}
        onMouseEnter={handlePrefetch}
    >
        <Button onClick={handleGenerateQrCodes} variant="outline" className="px-3 my-4"><QrCode className="w-4 h-4 mr-2" />
        Generate QR Codes
        </Button>
    </Link>
  )
}

export const CreatedAt = ({ id } : {
    id: string
}) => {

    const { created_at, setCreatedAt, setMaxClaim, setTokenPerClaim } = useTokenUtility()
    useEffect(()=>{
        const fetchCreatedAt = async () => {
            const campaign = await fetch(`/api/get/created-at`,{
                method: "POST",
                 headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const result = await campaign.json();
            console.log(result)
            setCreatedAt(result.created_at)
            setMaxClaim(result.maxClaim)
            setTokenPerClaim(result.tokenperclaim)

        };
        fetchCreatedAt();
    }, [id])
    return <span className="text-sm font-medium">
        {created_at}
    </span>
}