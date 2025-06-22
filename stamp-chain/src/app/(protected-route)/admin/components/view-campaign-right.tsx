'use client';

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Download, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
interface ComponentProp {
    id: string,
    name: string,
    status: 'active' | 'completed',
    totalSupply: number,
    claimed: number,
    qrCodes: number,
    createdAt: string
}
export const GenerateQrCodes  = ({  } : ComponentProp) => {

    const navigate = useRouter()
    const handleGenerateQrCodes = () => {
        navigate.push(`/qr-generator`)
    }
    
    const handlePrefetch = () => {
        console.log('prefetching...')
        navigate.prefetch('/qr-generator');
    }
  return (
    <DropdownMenuItem
        onClick={handleGenerateQrCodes}
        onMouseEnter={handlePrefetch}
    >
        <QrCode className="w-4 h-4 mr-2" />
        Generate QR Codes
  </DropdownMenuItem>
  )
}

export const ExportData = () => {
    return(
        <DropdownMenuItem>
            <Download className="w-4 h-4 mr-2" />
            Export Data
        </DropdownMenuItem>
    )
}