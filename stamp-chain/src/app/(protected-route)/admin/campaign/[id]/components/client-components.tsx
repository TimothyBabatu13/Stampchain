'use client';

import { Button } from "@/components/ui/button";
import { useQrGeneratorStore } from "@/stores/qrGeneratorStore";
import { QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const GenerateQRCode = ({ id } : {
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

export default GenerateQRCode