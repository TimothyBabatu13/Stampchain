'use client';

import { Button } from "@/components/ui/button"
import { useQrGeneratorStore } from "@/stores/qrGeneratorStore";
import { QrCode } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react";

interface ResponseType {
    success: boolean,
    data: string | null,
    error: boolean | string
}

const GenerateQR =  ({ id } : {
    id: string
}) => {
    const { setSelectedCampaign } = useQrGeneratorStore();
    
    useEffect(()=>{
        const fetchData = async () => {
            const api = await fetch('/api/fetch-qr-id', {
                method: "POST",
                body: JSON.stringify(id)
            });
            const res = await api.json() as ResponseType;
            if(res.success){
                setSelectedCampaign(res.data!)
            }
        }
        fetchData();
    }, [id])

  return (
    <Link href="/qr-generator">
        <Button
            size="lg"
            variant={'outline'}
        >
            <QrCode className="w-5 h-5 mr-2" />
            Generate QR Codes
        </Button>
    </Link>
  )
}

export default GenerateQR